import {ToastVariants} from "../../../context/toast/ToastProvider";

export type TaskViews = "join" | "split";

export type TaskProps = {
    id: number,
    view?: TaskViews,
    fullwidth?: boolean,
    disabled?: boolean,
    getData: (id: number) => Promise<any>,
    getPreviousData: (id: number) => Promise<any>,
    getIntegrated: (id: number) => Promise<any>,
    releaseTask: (id: number) => Promise<any>,
    requestTask: (id: number) => Promise<any>,
    triggerWebhook: (id: number) => Promise<any>,
    saveData: (id: number, data: { responses: any, complete?: boolean }) => Promise<any>,
    debouncedSave: (id: number, data: { responses: any, complete?: boolean }) => Promise<any> | undefined,
    openPreviousTask: (id: number) => Promise<any>,
    handleRedirect: (id: number, nextId: number, callback: Function) => void,
    handlePrompt: (value: boolean) => void,
    openToast: (msg: string, type: ToastVariants) => void,
    updateState: Function,
    getDynamicForm: (id: number, formData: any) => Promise<any>
};

export type FilterData = {
    schema: object,
    uiSchema?: object,
    formData?: any,
    onChange: (formData: object) => void,
    onSubmit?: (formData: object) => void
};