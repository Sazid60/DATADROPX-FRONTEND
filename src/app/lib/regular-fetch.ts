const BACKEND_API_URL =
    process.env.NEXT_PUBLIC_BASE_API_URL;

const createUrl = (endpoint: string) => `${BACKEND_API_URL}${endpoint}`;

const regularFetchHelper = async (endpoint: string,options: RequestInit = {}): Promise<Response> => {
    const { headers, ...restOptions } = options;

    return fetch(createUrl(endpoint), {
        ...restOptions,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });
};

export const regularFetch = {
    get: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
        regularFetchHelper(endpoint, { ...options, method: "GET" }),

    post: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
        regularFetchHelper(endpoint, { ...options, method: "POST" }),

    put: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
        regularFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
        regularFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
        regularFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
