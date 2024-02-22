export interface ExplorerFile {
    name: string;
    device: string;
    path: string;
    status: Status;
}

export enum Status {
    SCHEDULED = "scheduled",
    AVAILABLE = "available"
}