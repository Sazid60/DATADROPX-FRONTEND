"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { IEmployee } from "@/types/employee.interface";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";


interface EmployeeTableProps {
    employees: IEmployee[];
    onEdit: (employee: IEmployee) => void;
    onDelete: (employee: IEmployee) => void;
}

const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
    const hasData = employees.length > 0;

    return (
        <Table>
            <TableHeader>
                <TableRow >
                    <TableHead className="font-bold uppercase">Name</TableHead>
                    <TableHead className="font-bold uppercase">Email</TableHead>
                    <TableHead className="font-bold uppercase">Position</TableHead>
                    <TableHead className="font-bold uppercase">Department</TableHead>
                    <TableHead className="font-bold uppercase">Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {!hasData ? (
                    <TableRow>
                        <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                            No employee found.
                        </TableCell>
                    </TableRow>
                ) : (
                    employees.map((employee) => (
                        <TableRow key={employee._id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>
                                {new Date(employee.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(employee)}
                                    >
                                        <Pencil className="size-4" />
                                        Update
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDelete(employee)}
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};

export default EmployeeTable;
