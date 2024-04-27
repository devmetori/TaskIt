import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { TKPI, TPriority, TTodoList } from '../types';
import { UUID } from '../utils';

export const List: TTodoList[] = [
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Work',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 2,
                completed: 0,
            },
            week: {
                total: 2,
                completed: 0,
            },
            month: {
                total: 2,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Personal',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 4,
                completed: 0,
            },
            week: {
                total: 4,
                completed: 0,
            },
            month: {
                total: 4,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Shopping',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 1,
                completed: 0,
            },
            week: {
                total: 1,
                completed: 0,
            },
            month: {
                total: 1,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [],
        name: 'Home',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 0,
                completed: 0,
            },
            week: {
                total: 0,
                completed: 0,
            },
            month: {
                total: 0,
                completed: 0,
            },
        },
    },
];
export const defaultKpi: TKPI = {
    today: {
        total: 0,
        completed: 0,
    },
    week: {
        total: 0,
        completed: 0,
    },
    month: {
        total: 0,
        completed: 0,
    },
};
export const defaultList: TTodoList = {
    id: UUID(),
    name: 'New List',
    Tasks: [],
    SelectedDate: new Date(),
    sort: {
        by: 'dateStart',
        asc: true,
    },
    filter: {
        by: 'all',
        tags: [],
    },
    KPI: defaultKpi,
};

const randomDate = (year: number, month: number): Date => {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomPriority = (): TPriority => {
    const priorities = ['low', 'medium', 'high'];
    return priorities[Math.floor(Math.random() * priorities.length)] as TPriority;
};
export const generateRandomTodoLists = (numLists: number, year: number, month: number): TTodoList[] => {
    const today = new Date();

    return Array.from({ length: numLists }, (_, listIndex) => {
        const numTasks = Math.floor(Math.random() * 10);
        const tasks = Array.from({ length: numTasks }, () => {
            const startDate = randomDate(year, month);
            const endDate = new Date(startDate.getTime() + Math.random() * (1000 * 60 * 60 * 24 * 7));

            return {
                id: UUID(),
                description: `Task generated on ${startDate.toDateString()}  `,
                dateStart: startDate,
                dateEnd: endDate,
                tags: [],
                completed: Math.random() > 0.5,
                priority: randomPriority(),
            };
        });

        const kpi = tasks.reduce((acc, task) => {
            const isToday = isSameDay(task.dateStart, today);
            const isThisWeek = isSameWeek(task.dateStart, today);
            const isThisMonth = isSameMonth(task.dateStart, today);

            return {
                today: {
                    total: isToday ? acc.today.total + 1 : acc.today.total,
                    completed: isToday && task.completed ? acc.today.completed + 1 : acc.today.completed,
                },
                week: {
                    total: isThisWeek ? acc.week.total + 1 : acc.week.total,
                    completed: isThisWeek && task.completed ? acc.week.completed + 1 : acc.week.completed,
                },
                month: {
                    total: isThisMonth ? acc.month.total + 1 : acc.month.total,
                    completed: isThisMonth && task.completed ? acc.month.completed + 1 : acc.month.completed,
                },
            };
        }, defaultKpi);

        return {
            id: UUID(),
            name: ['Work', 'Personal', 'Shopping', 'Home'][listIndex % 4],
            SelectedDate: today,
            Tasks: tasks,
            sort: { by: 'dateStart', asc: Math.random() > 0.5 },
            filter: { by: 'all', tags: [] },
            KPI: kpi,
        } as TTodoList;
    });
};
