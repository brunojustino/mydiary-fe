import { cn } from "@/lib/utils";

import React, { PropsWithChildren, useState } from "react";

import { Expense } from "./types";
import ExpenseItem from "./Expense/page";

import girlFont from "@/lib/fonts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  PlusCircleIcon,
  CurrencyDollarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  className?: string;
};

const Expenses = ({ collapsed, setCollapsed, className }: Props) => {
  const [expensesList, setExpensesList] = useState<Expense[]>([
    { id: 1, name: "water", value: 5.0, paid: false },
    { id: 2, name: "netflix", value: 10.0, paid: false },
    { id: 3, name: "school", value: 255.0, paid: true },
    { id: 4, name: "rent", value: 2486.45, paid: false },
    { id: 5, name: "hooker", value: 80.58, paid: true },
    {
      id: 6,
      name: "this is really big text for a simple description",
      value: 99999999.99,
      paid: false,
    },
    { id: 7, name: "hookers", value: 180.58, paid: true },
  ]);

  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);
  const [newExpenseValue, setNewExpenseValue] = useState<number>(0);
  const [newExpenseName, setNewExpenseName] = useState<string>("");

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpensesList = expensesList.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpensesList(updatedExpensesList);
  };

  const deleteExpense = (expenseId: number) => {
    setExpensesList(expensesList.filter((expense) => expense.id !== expenseId));
  };

  const addNewExpense = () => {
    if (newExpenseValue !== 0) {
      const newExpense: Expense = {
        id: expensesList.length + 1,
        name: newExpenseName,
        value: newExpenseValue,
        paid: false,
      };
      setExpensesList([...expensesList, newExpense]);
      setNewExpenseValue(0);
      setShowAddExpense(false);
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
      onClick={() => setCollapsed(false)}
    >
      <div className="flex justify-center m-auto">
        {collapsed && <CurrencyDollarIcon className="w-6 h-6" />}
        <div
          className={cn({
            flex: true,
            "ml-2": !collapsed,
          })}
        >
          <span className="mr-1 text-xl underline">
            {!collapsed && "Expenses"}
          </span>
          {!collapsed && (
            <PlusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setShowAddExpense(true);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex  border-b-[1px] border-black justify-between pb-2">
        <ul className="w-full">
          {/* {expensesList.map((expense) => {
            return (
              <li key={expense.id} className="flex justify-between group">
                <div className="flex w-full justify-between">
                  {!collapsed && (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      updateExpense={updateExpense}
                      deleteExpense={deleteExpense}
                      newExpenseValue={newExpenseValue}
                      setNewExpenseValue={setNewExpenseValue}
                    />
                  )}
                </div>
              </li>
            );
          })} */}

          {expensesList.map((expense) => (
            // <div
            //   key={expense.id}
            //   className="flex justify-between w-full items-stretch place-items-center"
            // >
            //   <div className="w-44">{expense.name}</div>
            //   <span className="border-l-[1px] border-black flex-grow mt-0"></span>
            //   <span className="w-20 mt-auto">{`R$ ${expense.value.toFixed(
            //     2
            //   )} `}</span>
            // </div>
            <ExpenseItem
              key={expense.id}
              expense={expense}
              updateExpense={updateExpense}
              deleteExpense={deleteExpense}
              newExpenseValue={newExpenseValue}
              setNewExpenseValue={setNewExpenseValue}
            />
          ))}
          {!collapsed && showAddExpense && (
            <div className="flex">
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600"
                type="number"
                placeholder="Value"
                value={newExpenseValue}
                onChange={(e) => setNewExpenseValue(parseFloat(e.target.value))}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") addNewExpense();
                }}
                onBlur={() => {
                  newExpenseValue == 0
                    ? setShowAddExpense(false)
                    : addNewExpense();
                }}
              />
              <Button
                size="icon"
                className="ml-1 bg-white hover:scale-110 hover:bg-gray-50  w-8 h-8 self-center"
              >
                <CheckIcon
                  strokeWidth={1}
                  className="w-4 h-4 text-green-500"
                  onClick={addNewExpense}
                />
              </Button>
            </div>
          )}
        </ul>
        {/* <div className="border-r-[1px] border-black m-1"></div>
        <ul className="w-18">
          {expensesList.map((expense) => {
            return (
              <li key={expense.id}> {`R$ ${expense.value.toFixed(2)} `}</li>
            );
          })}
        </ul>
      </div> */}
      </div>
      <div className="flex justify-end">R$ 99.999.999.99</div>
    </li>
  );
};

export default Expenses;
