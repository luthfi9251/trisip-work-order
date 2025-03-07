export const URL = {
    LOGIN: "/",
    WORK_ORDER_HOME: "/work-order",
    WORK_ORDER_CREATE: "/work-order/create",
    WORK_ORDER_VIEW: (id: number | string) => `/work-order/${id}/view`,
    WORK_ORDER_EDIT: (id: number | string) => `/work-order/${id}/edit`,
    WORK_ORDER_PROCESS: (id: number | string) => `/work-order/${id}/process`,
    SUMMARY_PRODUCT_REPORT: "/api/work-order/summary-product",
    SUMMARY_OPEERATOR_REPORT: "/api/work-order/summary-operator",
};
