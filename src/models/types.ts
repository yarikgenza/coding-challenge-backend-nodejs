export enum CaseStatus {
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    RESOLVED = "RESOLVED",
}

export type Case = {
    id: string,
    reporter: string,
    description: string,
    status: CaseStatus,
    officerId: string | null,
}

export type CaseBody = {
    reporter: string,
    description: string,
}

export type Officer = {
    name: string
}