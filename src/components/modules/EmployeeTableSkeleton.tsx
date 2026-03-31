import { Skeleton } from "../ui/skeleton";


const EmployeeTableSkeleton = () => {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
};

export default EmployeeTableSkeleton;
