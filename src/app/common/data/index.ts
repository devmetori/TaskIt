import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { TKPI, TPriority, TPriotyList, TTodoList } from '../types';
import { UUID } from '../utils';

export const Priorities: TPriotyList[] = [
    { id: UUID(), level: 'high', label: 'High', selected: false, color: 'red' },
    { id: UUID(), level: 'medium', label: 'Medium', selected: false, color: 'orange' },
    { id: UUID(), level: 'low', label: 'Low', selected: true, color: 'green' },
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
        by: 'date',
        asc: true,
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
            const priority = randomPriority();
            return {
                id: UUID(),
                description: `Task generated on ${startDate.toDateString()}  `,
                dateStart: startDate,
                dateEnd: endDate,
                tags: [],
                completed: Math.random() > 0.5,
                priority,
                priorityColor: priority === 'low' ? 'green' : priority === 'medium' ? 'orange' : 'red',
            };
        });

        const kpi = tasks.reduce((acc, task) => {
            const isToday = isSameDay(task.dateStart, today);
            const isThisWeek = isSameWeek(task.dateStart, today);
            const isThisMonth = isSameMonth(task.dateStart, today);
            const data = {
                today: {
                    total: acc.today.total + 1,
                    completed: acc.today.completed + (task.completed ? 1 : 0),
                },
                month: {
                    total: acc.month.total + 1,
                    completed: acc.month.completed + (task.completed ? 1 : 0),
                },
                week: {
                    total: acc.week.total + 1,
                    completed: acc.week.completed + (task.completed ? 1 : 0),
                },
            };

            if (isToday) {
                acc = { today: data.today, month: data.month, week: data.week };
            }
            if (isThisWeek) {
                acc = { ...acc, month: data.month, week: data.week };
            }
            if (isThisMonth) {
                acc = { ...acc, month: data.month };
            }
            return acc;
        }, defaultKpi);

        return {
            id: UUID(),
            name: ['Trabajo', 'Medico', 'Compras', 'Hogar', 'Estudios'][listIndex % 5],
            SelectedDate: today,
            Tasks: tasks,
            sort: { by: 'date', asc: Math.random() > 0.5 },
            KPI: kpi,
        } as TTodoList;
    });
};
