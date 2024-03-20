import { cn } from "@/lib/utils";

import React, { useState } from "react";

import { SquarePenIcon, Trash2Icon, CheckIcon } from "lucide-react";

import { Tasks } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

interface Props {
  task: Tasks;
  updateTask: (updatedTask: Tasks) => void;
  deleteTask: (deletedTask: string) => void;
  newTaskName: string;
  setNewTaskName: (name: string) => void;
}

const TaskItem = ({
  task,
  updateTask,
  deleteTask,
  newTaskName,
  setNewTaskName,
}: Props) => {
  const [displayInput, setDisplayInput] = useState<boolean>(false);

  const handleTaskClick = async () => {
    // const updatedTask = { ...task, completed: !task.completed };
    // updateTask(updatedTask);
    try {
      const updatedTask = { ...task, description: newTaskName };
      await updateTask(updatedTask);
      // After the task is successfully updated, clear the input field and hide the input display
      setNewTaskName("");
      setDisplayInput(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTaskClick = () => {
    setNewTaskName("");
    deleteTask(task.id);
  };

  const handleEditTaskClick = () => {
    setNewTaskName(task.description);
    setDisplayInput(true);
  };

  const editTask = async () => {
    try {
      const updatedTask = { ...task, description: newTaskName };
      await updateTask(updatedTask);
      // After the task is successfully updated, clear the input field and hide the input display
      setNewTaskName("");
      setDisplayInput(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const taskDisplay = () => {
    return (
      <>
        <span
          className={cn({
            "line-through": task.completed, //hover:no-underline
            "hover:line-through": !task.completed,
          })}
          onClick={handleTaskClick} //handleTaskClick(task.id)
        >
          {task.description}
        </span>
        <div className="flex">
          <SquarePenIcon
            className="w-5 h-5 hidden group-hover:block hover:scale-110 "
            onClick={handleEditTaskClick}
          />
          <Trash2Icon
            className="w-5 h-5 hidden group-hover:block hover:scale-110 "
            onClick={handleDeleteTaskClick}
          />
        </div>
      </>
    );
  };
  const inputDisplay = () => {
    return (
      <div className="flex">
        <Input
          className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600 m-0 h-8 before: p-2 text-md"
          type="txt"
          placeholder="Task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") editTask();
          }}
          onBlur={() => {
            newTaskName.trim() == "" ? setDisplayInput(false) : editTask();
          }}
        />
        <Button
          size="icon"
          className="ml-1 bg-white hover:scale-110 hover:bg-gray-50  w-8 h-8 self-center"
        >
          <CheckIcon
            strokeWidth={1}
            className="w-4 h-4 text-green-500"
            onClick={editTask}
          />
        </Button>
      </div>
    );
  };

  return (
    <>
      {/* <span
        className={cn({
          "line-through": task.completed, //hover:no-underline
          "hover:line-through": !task.completed,
        })}
        onClick={handleTaskClick} //handleTaskClick(task.id)
      >
        {task.name}
      </span> */}
      {!displayInput ? taskDisplay() : inputDisplay()}
    </>
  );
};

export default TaskItem;
