"use client";

import { Search, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface EmployeeFiltersHeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onAddClick: () => void;
}

const EmployeeFiltersHeader = ({
    searchTerm,
    onSearchChange,
    onAddClick,
}: EmployeeFiltersHeaderProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Employee Management</CardTitle>

                <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search by name, email, position, department"
                            className="pl-8"
                        />
                    </div>

                    <Button onClick={onAddClick}>
                        <UserPlus className="size-4" />
                        Add Employee
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};

export default EmployeeFiltersHeader;
