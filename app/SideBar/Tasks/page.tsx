import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";

import girlFont from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ClipboardListIcon, PlusCircleIcon, CheckIcon } from "lucide-react";

import { Task } from "./types";
import TaskItem from "./Task/page";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  className: string;
};

const Tasks = ({ collapsed, setCollapsed, className }: Props) => {
  const [taskList, setTaskList] = useState<Task[]>([
    { id: 1, name: "Wake up", completed: false },
    { id: 2, name: "Make coofee", completed: false },
    { id: 3, name: "Go to the gym", completed: true },
    { id: 4, name: "Buy rice and eggs", completed: false },
    { id: 5, name: "Clean the air conditioner", completed: true },
    { id: 6, name: "Play guitarrrr", completed: false },
  ]);

  const updateTask = (updatedTask: Task) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTaskList);
  };

  const deleteTask = (taskId: number) => {
    setTaskList(taskList.filter((task) => task.id !== taskId));
  };

  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const addNewTask = () => {
    if (newTaskName.trim() !== "") {
      const newTask: Task = {
        id: taskList.length + 1,
        name: newTaskName,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setNewTaskName("");
      setShowAddTask(false);
    }
  };
  return (
    <li
      className={cn(className, girlFont.className, {
        "flex flex-col rounded-sm": true,
        "transition-colors duration-300 justify-center": true,
        "rounded-md p-2 mx-3 gap-1 ": !collapsed,
        "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
      })}
      onClick={() => setCollapsed(false)}
    >
      <div className="flex justify-center m-auto">
        {collapsed && <ClipboardListIcon className="w-6 h-6" />}
        <div
          className={cn({
            flex: true,
            "ml-2": !collapsed,
          })}
        >
          <span className="mr-1 text-xl underline">
            {!collapsed && "Tasks"}
          </span>
          {!collapsed && (
            <PlusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setShowAddTask(true);
              }}
            />
          )}
        </div>
      </div>

      <ul>
        {taskList.map((task) => {
          return (
            <li key={task.id} className="flex justify-between group">
              {!collapsed && (
                <TaskItem
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  newTaskName={newTaskName}
                  setNewTaskName={setNewTaskName}
                />
              )}
            </li>
          );
        })}
        {/* TODO only show this div when clicked add task button */}
        {/* TODO implement edit and delete funcionality */}
        {!collapsed && showAddTask && (
          <div className="flex">
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600"
              type="txt"
              placeholder="Task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") addNewTask();
              }}
              onBlur={() => {
                newTaskName.trim() == "" ? setShowAddTask(false) : addNewTask();
              }}
            />
            <Button
              size="icon"
              className="ml-1 bg-white hover:scale-110 hover:bg-gray-50  w-8 h-8 self-center"
            >
              <CheckIcon
                strokeWidth={1}
                className="w-4 h-4 text-green-500"
                onClick={addNewTask}
              />
            </Button>
          </div>
        )}
      </ul>
    </li>
  );
};

export default Tasks;
