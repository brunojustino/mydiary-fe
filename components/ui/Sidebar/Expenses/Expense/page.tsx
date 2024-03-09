import { cn, formatNumber } from "@/lib/utils";

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
  const [displayInputName, setDisplayInputName] = useState<boolean>(false);
  const [displayInputValue, setDisplayInputValue] = useState<boolean>(false);

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
    setDisplayInputValue(true);
  };
  const handleEditExpenseNameClick = () => {
    setNewExpenseName(expense.name);
    setDisplayInputName(true);
  };

  const editExpenseValue = () => {
    const updatedExpense = {
      ...expense,
      value: newExpenseValue,
    };
    updateExpense(updatedExpense);
    setNewExpenseValue(0.0);
    setDisplayInputName(false);
    setDisplayInputValue(false);
  };
  const editExpenseName = () => {
    const updatedExpense = {
      ...expense,
      name: newExpenseName,
    };
    updateExpense(updatedExpense);
    setNewExpenseName("");
    setDisplayInputName(false);
    setDisplayInputValue(false);
  };

  const expenseDisplay = () => {
    return (
      <div
        key={expense.id}
        className={cn({
          "flex justify-between w-full items-stretch place-items-center": true,
          "line-through": expense.paid, //hover:no-underline
          "hover:line-through": !expense.paid,
        })}
      >
        <div
          className={cn({
            "line-through": expense.paid, //hover:no-underline
            "hover:line-through": !expense.paid,
            "w-44 flex group mt-1": true,
          })}
        >
          <span onClick={handleExpenseClick} className="leading-5">
            {expense.name}
          </span>
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
        {/* vertical line */}
        <span
          className={cn({
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
          <span onClick={handleExpenseClick} className="flex-shrink-0">
            {`${formatNumber(expense.value)} `}
          </span>
          <div className="flex">
            <SquarePenIcon
              className="w-4 h-4 hidden group-hover:block hover:scale-110 ml-1"
              onClick={handleEditExpenseValueClick}
            />
          </div>
        </div>
      </div>
    );
  };

  const onBlurName = () => {
    setDisplayInputName(false);
    setNewExpenseName("");
  };

  const inputNameDisplay = () => {
    return (
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
            placeholder="Description"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") editExpenseName();
            }}
            onBlur={() => {
              newExpenseName.trim() == "" ? onBlurName() : editExpenseName();
            }}
          />
          <Button
            size="icon"
            className="ml-1 bg-white hover:scale-105 hover:bg-gray-50  w-4 h-4 self-center"
          >
            <CheckIcon
              strokeWidth={1}
              className="w-4 h-4 text-green-500"
              onClick={editExpenseName}
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
    );
  }; //end input name display

  const onBlurValue = () => {
    console.log("blurvalue");
    if (newExpenseValue == 0 || newExpenseValue == null) setNewExpenseValue(0);
    setDisplayInputValue(false);
  };

  const inputValueDisplay = () => {
    return (
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
            onChange={(e) => {
              setNewExpenseValue(parseFloat(e.target.value));
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") editExpenseValue();
            }}
            onBlur={(e) => {
              newExpenseValue == 0 || e.target.value.trim() == ""
                ? onBlurValue()
                : editExpenseValue();
            }}
          />
          <Button
            size="icon"
            className="ml-1 bg-white hover:scale-105 hover:bg-gray-50  w-4 h-4 self-center"
          >
            <CheckIcon
              strokeWidth={1}
              className="w-4 h-4 text-green-500"
              onClick={editExpenseValue}
            />
          </Button>
        </div>
      </div>
    );
  }; //end input name display

  const display = () => {
    if (displayInputName) {
      return inputNameDisplay();
    }
    if (displayInputValue) {
      return inputValueDisplay();
    }
    return expenseDisplay();
  };

  return <div key={expense.id}>{display()}</div>;
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
