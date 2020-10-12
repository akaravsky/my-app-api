export interface Employee {
    name?: string;
    id?: string;
    likes?: number;
    company?: {
        id?: string;
        name?: string;
    };
}

export interface Company {
    name: string;
    id: string;
}

export interface User {
    id: string;
    email: string;
}
