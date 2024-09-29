export type GetDataAPIResponse = {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
    updated_at: string;
};

export type GetDataAPIEntry = Omit<GetDataAPIResponse, "created_at" | "updated_at"> & {
    created_at: Date;
    updated_at: Date;
};