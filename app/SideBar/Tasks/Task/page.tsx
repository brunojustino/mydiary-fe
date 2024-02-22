import { cn } from "@/lib/utils";

import React, { useState } from "react";

import { SquarePenIcon, Trash2Icon } from "lucide-react";

import { Task } from "../types";

interface Props {
  task: Task;
  updateTask: (updatedTask: Task) => void;
}

const TaskItem = ({ task, updateTask }: Props) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleTaskClick = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  return (
    <>
      <span
        className={cn({
          "line-through": task.completed, //hover:no-underline
          "hover:line-through": !task.completed,
        })}
        onClick={handleTaskClick} //handleTaskClick(task.id)
      >
        {task.name}
      </span>
      <div className="flex">
        <SquarePenIcon className="w-5 h-5 hidden group-hover:block hover:scale-110 " />
        <Trash2Icon className="w-5 h-5 hidden group-hover:block hover:scale-110 " />
      </div>
    </>
  );
};

export default TaskItem;
