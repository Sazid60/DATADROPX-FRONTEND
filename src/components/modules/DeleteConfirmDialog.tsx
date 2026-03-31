"use client";

import type { IEmployee } from "@/types/employee.interface";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";


interface DeleteConfirmDialogProps {
    employee: IEmployee | null;
    open: boolean;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: (employee: IEmployee) => void;
}

const DeleteConfirmDialog = ({
    employee,
    open,
    isLoading,
    onOpenChange,
    onDelete,
}: DeleteConfirmDialogProps) => {
    const handleConfirmDelete = () => {
        if (employee) {
            onDelete(employee);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{employee?.name}</span>? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-3 justify-end">
                    <AlertDialogCancel disabled={isLoading} variant={undefined} size={undefined}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirmDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700" variant={undefined} size={undefined}                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmDialog;
