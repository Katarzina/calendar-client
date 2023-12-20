export type ActivityItem = BaseActivity & StartEndInterface & IdInterface

interface IdInterface {
    id: number
}
export interface BaseActivity {
    activity: string
    theme: string
    mentorId: number
}

export interface StartEndInterface {
    start: Date
    end: Date
}

export type ActivityDataItem = BaseActivity & {
    startDate: Date
    endDate: Date
} & IdInterface
