export type WorkOrderType = {
    id: string;
    no_wo: string;
    product_name: string;
    quantity: number;
    deadline: string;
    status: "pending" | "processing" | "completed" | "canceled";
    asigned_to: string;
};

export type WorkOrderProgressItemType = {
    id: string;
    date: string;
    asigned_to: string;
    description: string;
};
