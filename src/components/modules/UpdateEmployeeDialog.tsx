"use client";


import type { IEmployee } from "@/types/employee.interface";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import UpdateEmployeeForm from "../forms/update-employee-form";


interface UpdateEmployeeDialogProps {
    employee: IEmployee | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (employee: IEmployee) => void;
}

const UpdateEmployeeDialog = ({
    employee,
    open,
    onOpenChange,
    onSuccess,
}: UpdateEmployeeDialogProps) => {
    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onOpenChange(false);
                }
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Update Employee</DialogTitle>
                    <DialogDescription>
                        Update employee information and save changes.
                    </DialogDescription>
                </DialogHeader>

                {employee && (
                    <UpdateEmployeeForm
                        employee={employee}
                        onSuccess={(updatedEmployee) => {
                            onOpenChange(false);
                            onSuccess(updatedEmployee);
                        }}
                        onCancel={() => onOpenChange(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UpdateEmployeeDialog;
