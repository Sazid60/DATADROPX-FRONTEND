export interface IEmployeePayload {
    name: string;
    email: string;
    position: string;
    department: string;
}

export interface IEmployee extends IEmployeePayload {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface IEmployeesData {
    data: IEmployee[];
    meta: IPaginationMeta;
}
