import { TKPI, TPriotyList, TTodoList, TTask } from '../types';
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { UUID, randomDate } from '@/app/core/utils';

/**
 *  Generate a list of priorities
 * @returns {TPriotyList[]} - List of priorities
 */
export const Priorities = (): TPriotyList[] => {
    return [
        { id: UUID(), level: 1, label: 'Low', selected: true, color: 'green' },
        { id: UUID(), level: 2, label: 'Medium', selected: false, color: 'orange' },
        { id: UUID(), level: 3, label: 'High', selected: false, color: 'red' },
    ];
};

/**
 *  Default KPI
 * @returns {TKPI} - Default KPI
 */
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

/**
 *  Default List
 * @returns {TTodoList} - Default List
 */
export const defaultList: TTodoList = {
    id: UUID(),
    name: 'Nueva Lista',
    Tasks: [],
    KPI: defaultKpi,
};

/**
 *  Generate random tasks
 * @param {number} month - Month
 * @param {number} numTasks - Number of tasks
 * @param {number} year - Year
 * @returns {TTask[]} - List of tasks
 */
export const GenerateRandomTasks = ({
    month,
    numTasks,
    year,
}: {
    numTasks: number;
    year: number;
    month: number;
}): TTask[] => {
    return Array.from({ length: numTasks }, () => {
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
        } as TTask;
    });
};

/**
 *  Generate random todo lists
 * @param {number} month - Month
 * @param {number} numLists - Number of lists
 * @param {number} year - Year
 * @returns {TTodoList[]} - List of todo lists
 */
export const generateRandomTodoLists = ({
    month,
    numLists,
    year,
}: {
    numLists: number;
    year: number;
    month: number;
}): TTodoList[] => {
    const today = new Date();

    return Array.from({ length: numLists }, (_, listIndex) => {
        const numTasks = Math.floor(Math.random() * 10);
        const tasks = GenerateRandomTasks({ numTasks, year, month });

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
            Tasks: tasks,
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
