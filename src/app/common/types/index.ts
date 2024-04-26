export type TTask = {
    id: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    tags: string[];
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
};

export type TTodoList = {
    id: string;
    name: string;
    SelectedDate: Date;
    Tasks: TTask[];
    sort: any;
    filter: any;
};

export type CalendarEvent = {
    id: string;
    title: string;
    date: Date;
    description?: string;
};
