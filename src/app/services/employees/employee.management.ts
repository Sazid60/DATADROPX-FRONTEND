import { regularFetch } from "@/app/components/lib/regular-fetch";
import type {
    IApiResponse,
    IEmployee,
    IEmployeePayload,
    IEmployeesData,
} from "@/app/types/employee.interface";

interface IGetEmployeesParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
}

const EMPLOYEES_ENDPOINT = "/employees";

const parseError = async (response: Response) => {
    try {
        const body = (await response.json()) as {
            message?: string;
            errorSources?: Array<{ message?: string }>;
        };

        if (body?.errorSources?.length && body.errorSources[0]?.message) {
            return body.errorSources[0].message;
        }

        return body?.message || "Request failed";
    } catch {
        return "Request failed";
    }
};

const ensureOk = async (response: Response) => {
    if (!response.ok) {
        throw new Error(await parseError(response));
    }
};

const getEmployees = async (params: IGetEmployeesParams = {}) => {
    const query = new URLSearchParams();

    if (params.searchTerm?.trim()) {
        query.set("searchTerm", params.searchTerm.trim());
    }

    query.set("page", String(params.page ?? 1));
    query.set("limit", String(params.limit ?? 10));

    const response = await regularFetch.get(
        `${EMPLOYEES_ENDPOINT}?${query.toString()}`,
        {
            cache: "no-store",
        }
    );

    await ensureOk(response);
    const result = (await response.json()) as IApiResponse<IEmployeesData>;
    return result.data;
};

const createEmployee = async (payload: IEmployeePayload) => {
    const response = await regularFetch.post(EMPLOYEES_ENDPOINT, {
        body: JSON.stringify(payload),
    });

    await ensureOk(response);
    const result = (await response.json()) as IApiResponse<IEmployee>;
    return result.data;
};

const updateEmployee = async (id: string, payload: Partial<IEmployeePayload>) => {
    const response = await regularFetch.put(`${EMPLOYEES_ENDPOINT}/${id}`, {
        body: JSON.stringify(payload),
    });

    await ensureOk(response);
    const result = (await response.json()) as IApiResponse<IEmployee>;
    return result.data;
};

const deleteEmployee = async (id: string) => {
    const response = await regularFetch.delete(`${EMPLOYEES_ENDPOINT}/${id}`);

    await ensureOk(response);
    const result = (await response.json()) as IApiResponse<IEmployee>;
    return result.data;
};

export const employeeManagement = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};