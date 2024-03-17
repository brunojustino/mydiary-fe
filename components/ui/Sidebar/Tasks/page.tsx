import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/app/AppContext";
import { useSession } from "next-auth/react";

import { girlFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  ClipboardListIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  CheckIcon,
} from "lucide-react";

import { Tasks } from "@prisma/client";
// import type { Tasks } from "@prisma/client";
import TaskItem from "./Task/page";

type Props = {
  className: string;
};

const Tasks = ({ className }: Props) => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const { collapsed, setSidebarCollapsed, date } = useAppContext();
  const newDate = date ? new Date(date) : new Date();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const year = newDate?.getFullYear();
  const session = useSession();

  const userId = session.data?.user?.id;
  const formattedDate = `${month}${day}${year}`;

  useEffect(() => {
    fetch(`/api/tasks/${userId}?date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data.tasks);
        console.log("inside use effect");
      });
  }, [formattedDate, userId]);

  // [
  //   { id: 1, name: "Wake up", completed: false },
  //   { id: 2, name: "Make coofee", completed: false },
  //   { id: 3, name: "Go to the gym", completed: true },
  //   { id: 4, name: "Buy rice and eggs", completed: false },
  //   { id: 5, name: "Clean the air conditioner", completed: true },
  //   { id: 6, name: "Play guitarrrr", completed: false },
  // ]

  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateTask = async (updatedTask: Tasks) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: "PUT", // Use PUT method for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // Assuming the API returns the updated task, you can update the task list with it
      const updatedTaskFromServer = await response.json();
      console.log(updatedTaskFromServer.task.description);
      const updatedTaskList = taskList.map((task) =>
        task.id === updatedTaskFromServer.task.id
          ? updatedTaskFromServer.task
          : task
      );
      setTaskList(updatedTaskList);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  // const deleteTask = (taskId: string) => {
  //   setTaskList(taskList.filter((task) => task.id !== taskId));
  // };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Remove the deleted task from the task list
      const updatedTaskList = taskList.filter((task) => task.id !== taskId);
      setTaskList(updatedTaskList);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const addNewTask = async (userId: string) => {
    const description = newTaskName.trim();
    const createdAt = newDate;

    console.log("addNewTask" + "id: ", userId + " " + newTaskName);

    if (newTaskName.trim() !== "") {
      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, createdAt, userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to add taskkkkk");
        }
        const newTask = await response.json();
        console.log("new task" + newTask);
        // Assuming you want to clear the input field after adding the task
        setNewTaskName("");
        setShowAddTask(false);
        setTaskList([...taskList, newTask]);
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task2222");
      }
    }
  };

  return (
    <li
      className={cn(className, girlFont.className, {
        "flex flex-col rounded-sm": true,
        "transition-colors duration-300 justify-center": true,
        "rounded-sm p-2 mx-3 gap-1 ": !collapsed,
        "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
      })}
      onClick={() => setSidebarCollapsed(false)}
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
          {!collapsed && !showAddTask && (
            <PlusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setShowAddTask(true);
              }}
            />
          )}
          {!collapsed && showAddTask && (
            <MinusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setErrorMessage("");
                setShowAddTask(false);
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
                if (e.key === "Enter") {
                  console.log("keydown");
                  addNewTask(session.data?.user?.id || "");
                }
              }}
              onBlur={() => {
                newTaskName.trim() == ""
                  ? setShowAddTask(false)
                  : addNewTask(session.data?.user?.id || "");
              }}
            />
            <Button
              size="icon"
              className="ml-1 bg-white hover:scale-110 hover:bg-gray-50  w-8 h-8 self-center"
            >
              <CheckIcon
                strokeWidth={1}
                className="w-4 h-4 text-green-500"
                onClick={() => {
                  addNewTask(session.data?.user?.id || "");
                }}
              />
            </Button>
          </div>
        )}
      </ul>
    </li>
  );
};

export default Tasks;
