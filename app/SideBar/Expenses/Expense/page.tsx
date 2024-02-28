import { cn } from "@/lib/utils";

import React, { useState } from "react";

import { SquarePenIcon, Trash2Icon, CheckIcon } from "lucide-react";

import { Expense } from "../types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  expense: Expense;
  updateExpense: (updatedExpense: Expense) => void;
  deleteExpense: (deletedExpense: number) => void;
  newExpenseValue: number;
  setNewExpenseValue: (value: number) => void;
  newExpenseName: string;
  setNewExpenseName: (name: string) => void;
}

const ExpenseItem = ({
  expense,
  updateExpense,
  deleteExpense,
  newExpenseValue,
  setNewExpenseValue,
  newExpenseName,
  setNewExpenseName,
}: Props) => {
  const [displayInput, setDisplayInput] = useState<boolean>(false);

  const handleExpenseClick = () => {
    const updatedExpense = { ...expense, paid: !expense.paid };
    updateExpense(updatedExpense);
  };

  const handleDeleteExpenseClick = () => {
    setNewExpenseValue(0.0);
    setNewExpenseName("");
    deleteExpense(expense.id);
  };

  const handleEditExpenseValueClick = () => {
    setNewExpenseValue(expense.value);
    setDisplayInput(true);
  };
  const handleEditExpenseNameClick = () => {
    setNewExpenseName(expense.name);
    setDisplayInput(true);
  };

  const editExpense = () => {
    const updatedExpense = {
      ...expense,
      name: newExpenseName,
      value: newExpenseValue,
    };
    updateExpense(updatedExpense);
    setNewExpenseValue(0.0);
    setDisplayInput(false);
  };

  const expenseDisplay = () => {
    return (
      <>
        <div
          key={expense.id}
          className="flex justify-between w-full items-stretch place-items-center"
        >
          <div
            className={cn({
              "w-44 flex group mt-1": true,
            })}
          >
            <span className="leading-5">{expense.name}</span>
            <div className="flex flex-nowrap">
              <SquarePenIcon
                className="w-4 h-4 hidden group-hover:block hover:scale-110 ml-1"
                onClick={handleEditExpenseNameClick}
              />
              <Trash2Icon
                className="w-4 h-4 hidden group-hover:block hover:scale-110 "
                onClick={handleDeleteExpenseClick}
              />
            </div>
          </div>
          {/* line */}
          <span
            className={cn({
              "line-through": expense.paid, //hover:no-underline
              "hover:line-through": !expense.paid,
              "border-l-[1px] border-black flex-grow mt-0": true,
            })}
          ></span>
          <div
            className={cn({
              "line-through": expense.paid, //hover:no-underline
              "hover:line-through": !expense.paid,
              "w-20 flex my-auto items-center group justify-stretch": true,
            })}
          >
            <span className="flex-shrink-0">{`${expense.value.toFixed(
              2
            )} `}</span>
            <div className="flex">
              <SquarePenIcon
                className="w-4 h-4 hidden group-hover:block hover:scale-110 ml-1"
                onClick={handleEditExpenseValueClick}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex">
            <SquarePenIcon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleEditExpenseClick}
            />
            <Trash2Icon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleDeleteExpenseClick}
            />
          </div> */}
      </>
    );
  };

  const inputDisplay = () => {
    return (
      <>
        <div
          key={expense.id}
          className="flex justify-between w-full items-stretch place-items-center"
        >
          <div
            className={cn({
              "w-44 flex group mt-1": true,
            })}
          >
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600 m-0 h-7 before: p-2 text-md"
              type="txt"
              placeholder="Task"
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") editExpense();
              }}
              onBlur={() => {
                newExpenseName.trim() == ""
                  ? setDisplayInput(false)
                  : editExpense();
              }}
            />
            <Button
              size="icon"
              className="ml-1 bg-white hover:scale-105 hover:bg-gray-50  w-4 h-4 self-center"
            >
              <CheckIcon
                strokeWidth={1}
                className="w-4 h-4 text-green-500"
                onClick={editExpense}
              />
            </Button>
          </div>

          <span className="border-l-[1px] border-black flex-grow mt-0"></span>
          <div
            className={cn({
              "line-through": expense.paid, //hover:no-underline
              "hover:line-through": !expense.paid,
              "w-20 flex my-auto items-center group justify-stretch": true,
            })}
          >
            <span className="flex-shrink-0">{`${expense.value.toFixed(
              2
            )} `}</span>
            <div className="flex">
              <SquarePenIcon
                className="w-4 h-4 hidden group-hover:block hover:scale-110 ml-1"
                onClick={handleEditExpenseValueClick}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex">
            <SquarePenIcon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleEditExpenseClick}
            />
            <Trash2Icon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleDeleteExpenseClick}
            />
          </div> */}
      </>
    );
  }; //end input name display

  const inputValueDisplay = () => {
    return (
      <>
        <div
          key={expense.id}
          className="flex justify-between w-full items-stretch place-items-center"
        >
          <div
            className={cn({
              "w-44 flex group mt-1": true,
            })}
          >
            <span className="leading-5">{expense.name}</span>
          </div>

          <span className="border-l-[1px] border-black flex-grow mt-0"></span>
          <div
            className={cn({
              "line-through": expense.paid, //hover:no-underline
              "hover:line-through": !expense.paid,
              "w-20 flex my-auto items-center group justify-stretch": true,
            })}
          >
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600 m-0 h-7 before: p-2 text-md"
              type="number"
              placeholder="Value"
              value={newExpenseValue}
              onChange={(e) => setNewExpenseValue(parseFloat(e.target.value))}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") editExpense();
              }}
              onBlur={() => {
                newExpenseValue == 0 ? setDisplayInput(false) : editExpense();
              }}
            />
            <Button
              size="icon"
              className="ml-1 bg-white hover:scale-105 hover:bg-gray-50  w-4 h-4 self-center"
            >
              <CheckIcon
                strokeWidth={1}
                className="w-4 h-4 text-green-500"
                onClick={editExpense}
              />
            </Button>
          </div>
        </div>
        {/* <div className="flex">
            <SquarePenIcon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleEditExpenseClick}
            />
            <Trash2Icon
              className="w-5 h-5 hidden group-hover:block hover:scale-110 "
              onClick={handleDeleteExpenseClick}
            />
          </div> */}
      </>
    );
  }; //end input name display

  // TODO Fix right display on edit click
  // TODO Some places are not clearing the name and value state properly
  return <>{!displayInput ? expenseDisplay() : inputValueDisplay()}</>;
};

// line trhought logic
// {/* <span
// className={cn({
//   "line-through": expense.paid, //hover:no-underline
//   "hover:line-through": !expense.paid,
//   "flex justify-start w-20": true,
// })}
// onClick={handleExpenseClick}
// >
// {/* {` R$ ${expense.value.toFixed(2)}`} */}
// </span> */}

export default ExpenseItem;
