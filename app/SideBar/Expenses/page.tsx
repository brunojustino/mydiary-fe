import { cn, formatNumber } from "@/lib/utils";

import React, { PropsWithChildren, useState } from "react";

import { Expense } from "./types";
import ExpenseItem from "./Expense/page";

import girlFont from "@/lib/fonts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  PlusCircleIcon,
  MinusCircleIcon,
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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const totalValue = expensesList.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const totalPago = expensesList.reduce((acc, expense) => {
    if (expense.paid) return acc + expense.value;
    else return acc;
  }, 0);

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
    if (newExpenseValue !== 0 && newExpenseName.trim() !== "") {
      const newExpense: Expense = {
        id: expensesList.length + 1,
        name: newExpenseName,
        value: newExpenseValue,
        paid: false,
      };
      setExpensesList([...expensesList, newExpense]);
      setNewExpenseValue(0);
      setNewExpenseName("");
      setErrorMessage("");
      setShowAddExpense(false);
    }
  };

  const onBlurValue = () => {
    if (newExpenseValue <= 0) {
      setErrorMessage("Fill the form");
    }
  };
  const onBlurName = () => {
    if (newExpenseName == "") {
      setErrorMessage("Fill the form");
    } // else {
    //   addNewExpense();
    // }
  };

  // TODO add masl to value display: 9,999,999,999.00
  return (
    <li
      className={cn(className, girlFont.className, {
        "flex flex-col": true,
        "transition-colors duration-300 justify-center": true,
        "rounded-sm p-2 mx-3 gap-1 ": !collapsed,
        "rounded-full mx-3 p-2 w-10 h-10 hover:border": collapsed,
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
          {!collapsed && !showAddExpense && (
            <PlusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setShowAddExpense(true);
              }}
            />
          )}
          {!collapsed && showAddExpense && (
            <MinusCircleIcon
              strokeWidth={1}
              className="w-6 h-6 hover:scale-110"
              onClick={() => {
                setErrorMessage("");
                setShowAddExpense(false);
              }}
            />
          )}
        </div>
      </div>

      <div
        className={cn({
          "flex justify-between pb-2": true,
          "border-b-[1px] border-black": !collapsed,
          "border-b-0 pb-0": collapsed,
        })}
      >
        <div className="w-full">
          {!collapsed &&
            expensesList.map((expense) => (
              <div key={expense.id}>
                {!collapsed && (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    updateExpense={updateExpense}
                    deleteExpense={deleteExpense}
                    newExpenseValue={newExpenseValue}
                    setNewExpenseValue={setNewExpenseValue}
                    newExpenseName={newExpenseName}
                    setNewExpenseName={setNewExpenseName}
                  />
                )}
              </div>
            ))}

          {!collapsed && showAddExpense && (
            <div className="flex">
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600 m-0 h-7 before: p-2 text-md"
                type="text"
                placeholder="Description"
                value={newExpenseName}
                onChange={(e) => {
                  setNewExpenseName(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setErrorMessage("");
                  }
                }}
                autoFocus
                onBlur={onBlurName}
              />
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-600 m-0 h-7 before: p-2 text-md w-1/3"
                type="number"
                placeholder="Value"
                value={newExpenseValue}
                onChange={(e) => {
                  setNewExpenseValue(parseFloat(e.target.value));
                  if (parseFloat(e.target.value) > 0) {
                    setErrorMessage("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addNewExpense();
                }}
                onBlur={onBlurValue}
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
          {errorMessage.trim() !== "" && (
            <div
              className={cn({
                "text-xs mx-auto text-red-600 pl-3": true,
              })}
            >
              {errorMessage}
            </div>
          )}
        </div>
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
      <div className="flex flex-col justify-end">
        {!collapsed && (
          <div className="flex justify-between pr-5 text-lg ">
            <span className="w-16">Total:</span>
            <span>
              {" "}
              {totalValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
        {!collapsed && (
          <div className="flex justify-between pr-5 text-lg ">
            <span className="w-16">Pago:</span>
            <span>
              {totalPago.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
        {!collapsed && (
          <div className="flex justify-between pr-5 text-lg ">
            <span className="w-16">Saldo: </span>
            <span>{formatNumber(totalValue - totalPago)}</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default Expenses;
