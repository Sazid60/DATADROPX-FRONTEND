"use client";

import type { IPaginationMeta } from "@/types/employee.interface";
import { Button } from "../ui/button";


interface EmployeePaginationProps {
    meta: IPaginationMeta;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

const EmployeePagination = ({
    meta,
    onPreviousPage,
    onNextPage,
}: EmployeePaginationProps) => {
    return (
        <div className="flex flex-col gap-3 border-t pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
                Showing page {meta.page} of {Math.max(meta.totalPage, 1)} | Total
                records: {meta.total}
            </p>

            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onPreviousPage}
                    disabled={meta.page <= 1}
                >
                    Previous
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onNextPage}
                    disabled={meta.page >= Math.max(meta.totalPage, 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default EmployeePagination;
