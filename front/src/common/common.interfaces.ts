export interface User {
    name?: string;
    id?: string;
    likes?: number;
    company?: {
        name?: string;
    };
}

export interface Company {
    name: string;
    id: string;
}
