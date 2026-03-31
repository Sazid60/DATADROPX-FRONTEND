"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { getInputFieldError, IInputErrorState } from "@/app/components/lib/getInputFiledError";
import { zodValidator } from "@/app/components/lib/zodValidator";
import { employeeManagement } from "@/app/services/employees/employee.management";
import type { IEmployee, IEmployeePayload } from "@/app/types/employee.interface";
import { updateEmployeeSchema } from "@/app/zod/employee.validation";

interface UpdateEmployeeFormProps {
    employee: IEmployee;
    onSuccess: (employee: IEmployee) => void;
    onCancel: () => void;
}

const defaultValidationState: IInputErrorState = {
    success: true,
    errors: [],
};

const UpdateEmployeeForm = ({
    employee,
    onSuccess,
    onCancel,
}: UpdateEmployeeFormProps) => {
    const [formData, setFormData] = useState<IEmployeePayload>({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationState, setValidationState] =
        useState<IInputErrorState>(defaultValidationState);
    const [requestError, setRequestError] = useState<string | null>(null);

    const fieldConfig = useMemo(
        () => [
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "position", label: "Position", type: "text" },
            { key: "department", label: "Department", type: "text" },
        ] as const,
        []
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequestError(null);

        const validationResult = zodValidator(formData, updateEmployeeSchema);

        if (!validationResult.success) {
            setValidationState(validationResult as IInputErrorState);
            return;
        }

        setValidationState(defaultValidationState);

        try {
            setIsSubmitting(true);
            const updatedEmployee = await employeeManagement.updateEmployee(
                employee._id,
                formData
            );
            toast.success("Employee updated successfully");
            onSuccess(updatedEmployee);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to update employee";
            setRequestError(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fieldConfig.map((field) => (
                <div key={field.key} className="space-y-1.5">
                    <label htmlFor={field.key} className="text-sm font-medium text-foreground">
                        {field.label}
                    </label>
                    <Input
                        id={field.key}
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(event) =>
                            setFormData((previous) => ({
                                ...previous,
                                [field.key]: event.target.value,
                            }))
                        }
                    />
                    {getInputFieldError(field.key, validationState) && (
                        <p className="text-xs text-destructive">
                            {getInputFieldError(field.key, validationState)}
                        </p>
                    )}
                </div>
            ))}

            {requestError && <p className="text-sm text-destructive">{requestError}</p>}

            <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Employee"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateEmployeeForm;
