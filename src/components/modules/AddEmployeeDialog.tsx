"use client";


import type { IEmployee } from "@/types/employee.interface";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import AddEmployeeForm from "../forms/add-employee-form";


interface AddEmployeeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (employee: IEmployee) => void;
}

const AddEmployeeDialog = ({
    open,
    onOpenChange,
    onSuccess,
}: AddEmployeeDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                        Fill in employee information and submit to create a new employee.
                    </DialogDescription>
                </DialogHeader>

                <AddEmployeeForm
                    onSuccess={(employee) => {
                        onOpenChange(false);
                        onSuccess(employee);
                    }}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddEmployeeDialog;
