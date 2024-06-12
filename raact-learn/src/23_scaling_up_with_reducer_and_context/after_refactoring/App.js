import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import {TasksContext, TasksDispatchContext, TasksProvider} from "./TasksContext";

export default function TaskApp() {

    return (
        <TasksProvider>
            <h1>Day off in Kyoto</h1>
            <AddTask/>
            <TaskList/>
        </TasksProvider>
    );
}

