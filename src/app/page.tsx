"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { employeeManagement } from "@/services/employees/employee.management";
import type { IEmployee, IPaginationMeta } from "@/types/employee.interface";
import { Card, CardContent } from "@/components/ui/card";
import AddEmployeeDialog from "@/components/modules/AddEmployeeDialog";
import UpdateEmployeeDialog from "@/components/modules/UpdateEmployeeDialog";
import DeleteConfirmDialog from "@/components/modules/DeleteConfirmDialog";
import EmployeeFiltersHeader from "@/components/modules/EmployeeFiltersHeader";
import EmployeeTable from "@/components/modules/EmployeeTable";
import EmployeeTableSkeleton from "@/components/modules/EmployeeTableSkeleton";
import EmployeePagination from "@/components/modules/EmployeePagination";


const defaultMeta: IPaginationMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPage: 1,
};

export default function Home() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta>(defaultMeta);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [requestError, setRequestError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<IEmployee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setRequestError(null);

    try {
      const response = await employeeManagement.getEmployees({
        searchTerm: debouncedSearchTerm,
        page,
        limit: 10,
      });

      setEmployees(response.data);
      setMeta(response.meta);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch employees";
      setRequestError(message);
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    void fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await employeeManagement.deleteEmployee(employeeToDelete._id);
      toast.success("Employee deleted successfully");
      setEmployeeToDelete(null);

      if (employees.length === 1 && page > 1) {
        setPage((previous) => Math.max(1, previous - 1));
      } else {
        await fetchEmployees();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete employee";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const hasData = useMemo(() => employees.length > 0, [employees.length]);

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8 md:px-8 ">
      <div className="container mx-auto  space-y-6">
        <EmployeeFiltersHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <Card>
          <CardContent className="space-y-4 pt-4">
            {isLoading ? (
              <EmployeeTableSkeleton />
            ) : requestError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {requestError}
              </div>
            ) : (
              <>
                <EmployeeTable
                  employees={employees}
                  onEdit={setEmployeeToEdit}
                  onDelete={setEmployeeToDelete}
                />

                {hasData && (
                  <EmployeePagination
                    meta={meta}
                    onPreviousPage={() =>
                      setPage((previous) => Math.max(previous - 1, 1))
                    }
                    onNextPage={() =>
                      setPage((previous) =>
                        Math.min(previous + 1, Math.max(meta.totalPage, 1))
                      )
                    }
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <AddEmployeeDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={async () => {
          await fetchEmployees();
        }}
      />

      <UpdateEmployeeDialog
        employee={employeeToEdit}
        open={Boolean(employeeToEdit)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEmployeeToEdit(null);
          }
        }}
        onSuccess={async () => {
          await fetchEmployees();
        }}
      />

      <DeleteConfirmDialog
        employee={employeeToDelete}
        open={Boolean(employeeToDelete)}
        isLoading={isDeleting}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEmployeeToDelete(null);
          }
        }}
        onDelete={handleDeleteEmployee}
      />
    </main>
  );
}
