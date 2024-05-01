import { TKPI, TPriotyList, TTodoList, TRandomTodoList, IBreakpoint } from '../types';
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { UUID, randomDate } from '../utils';

export const Priorities = (): TPriotyList[] => {
    return [
        { id: UUID(), level: 3, label: 'High', selected: false, color: 'red' },
        { id: UUID(), level: 2, label: 'Medium', selected: false, color: 'orange' },
        { id: UUID(), level: 1, label: 'Low', selected: true, color: 'green' },
    ];
};
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

export const generateRandomTodoLists = ({ month, numLists, year }: TRandomTodoList): TTodoList[] => {
    const today = new Date();

    return Array.from({ length: numLists }, (_, listIndex) => {
        const numTasks = Math.floor(Math.random() * 10);
        const tasks = Array.from({ length: numTasks }, () => {
            const startDate = randomDate(year, month);
            const endDate = new Date(startDate.getTime() + Math.random() * (1000 * 60 * 60 * 24 * 7));
            const priority = Math.floor(Math.random() * 4);
            const description =
                'Tarea por el dia: ' +
                ' ' +
                startDate.getDate() +
                ' ' +
                startDate.toLocaleString('default', { month: 'long' }) +
                ' del ' +
                startDate.getFullYear();

            return {
                id: UUID(),
                description,
                dateStart: startDate,
                dateEnd: endDate,
                tags: [],
                completed: Math.random() > 0.5,
                priority,
                priorityColor: priority === 1 ? 'green' : priority === 2 ? 'orange' : 'red',
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

export const BREAKPOINTS = {
    sm: '(max-width: 576px)',
    md: '(min-width: 577px) and (max-width: 1024px)',
    lg: '(min-width: 1025px) and (max-width: 1400px)',
    xl: '(min-width: 1401px)',
};

export const screenSize: IBreakpoint[] = [
    { breakpoint: 'sm', className: 'phone' },
    { breakpoint: 'md', className: 'tablet' },
    { breakpoint: 'lg', className: 'laptop' },
    { breakpoint: 'xl', className: 'desktop' },
];
