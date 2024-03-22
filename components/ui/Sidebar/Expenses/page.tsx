import { cn, formatNumber } from "@/lib/utils";
import React, { useState, useEffect } from "react";

import { useAppContext } from "@/app/AppContext";
import { useSession } from "next-auth/react";

import { Expenses } from "@prisma/client";
import ExpenseItem from "./Expense/page";

import { girlFont } from "@/lib/fonts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  PlusCircleIcon,
  MinusCircleIcon,
  CurrencyDollarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

type Props = {
  className?: string;
};

const Expenses = ({ className }: Props) => {
  // const [expensesList, setExpensesList] = useState<Expense[]>([
  //   { id: 1, name: "water", value: 5.0, paid: false },
  //   { id: 2, name: "netflix", value: 10.0, paid: false },
  //   { id: 3, name: "school", value: 255.0, paid: true },
  //   { id: 4, name: "rent", value: 2486.45, paid: false },
  //   { id: 5, name: "hooker", value: 80.58, paid: true },
  //   {
  //     id: 6,
  //     name: "this is really big text for a simple description",
  //     value: 99999999.99,
  //     paid: false,
  //   },
  //   { id: 7, name: "hookers", value: 180.58, paid: true },
  // ]);

  const [expensesList, setExpensesList] = useState<Expenses[]>([]);
  const { collapsed, setSidebarCollapsed, date } = useAppContext();
  const newDate = date ? new Date(date) : new Date();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const year = newDate?.getFullYear();
  const session = useSession();

  const userId = session.data?.user?.id;
  const formattedDate = `${month}${day}${year}`;

  useEffect(() => {
    fetch(`/api/expenses/${userId}?date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setExpensesList(data.expenses);
        console.log("inside use effect");
      });
  }, [formattedDate, userId]);

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

  // const updateExpense = (updatedExpense: Expenses) => {
  //   const updatedExpensesList = expensesList.map((expense) =>
  //     expense.id === updatedExpense.id ? updatedExpense : expense
  //   );
  //   setExpensesList(updatedExpensesList);
  // };

  const updateExpense = async (updatedExpense: Expenses) => {
    try {
      const response = await fetch(`/api/expenses/${updatedExpense.id}`, {
        method: "PUT", // Use PUT method for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      // Assuming the API returns the updated task, you can update the task list with it
      const updatedExpenseFromServer = await response.json();
      const updatedExpenseList = expensesList.map((expense) =>
        expense.id === updatedExpenseFromServer.expense.id
          ? updatedExpenseFromServer.expense
          : expense
      );
      setExpensesList(updatedExpenseList);
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense");
    }
  };

  // const deleteExpense = (expenseId: number) => {
  //   setExpensesList(expensesList.filter((expense) => expense.id !== expenseId));
  // };

  const deleteExpense = async (expenseId: string) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete Expense");
      }
      if (!response.ok) {
        throw new Error("Failed to delete Expense");
      }
      // Remove the deleted task from the task list
      const updatedExpenseList = expensesList.filter(
        (expense) => expense.id !== expenseId
      );
      setExpensesList(updatedExpenseList);
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense");
    }
  };

  const addNewExpense = async (userId: string) => {
    const description = newExpenseName.trim();
    const value = newExpenseValue;
    const createdAt = newDate;

    console.log("addNewExpense" + "id: ", userId + " " + newExpenseName);

    if (newExpenseValue !== 0 && newExpenseName.trim() !== "") {
      try {
        const response = await fetch("/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, value, createdAt, userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to add taskkkkk");
        }
        const newExpense = await response.json();
        console.log("new expense" + newExpense);
        // Assuming you want to clear the input field after adding the task
        setNewExpenseName("");
        setShowAddExpense(false);
        setExpensesList([...expensesList, newExpense]);
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add Expense");
      }
    }
  };

  // const addNewExpense = () => {
  //   if (newExpenseValue !== 0 && newExpenseName.trim() !== "") {
  //     const newExpense: Expense = {
  //       id: expensesList.length + 1,
  //       name: newExpenseName,
  //       value: newExpenseValue,
  //       paid: false,
  //     };
  //     setExpensesList([...expensesList, newExpense]);
  //     setNewExpenseValue(0);
  //     setNewExpenseName("");
  //     setErrorMessage("");
  //     setShowAddExpense(false);
  //   }
  // };

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

  return (
    <li
      className={cn(className, girlFont.className, {
        "flex flex-col": true,
        "transition-colors duration-300 justify-center": true,
        "rounded-sm p-2 mx-3 gap-1 ": !collapsed,
        "rounded-full mx-3 p-2 w-10 h-10 hover:border": collapsed,
      })}
      onClick={() => setSidebarCollapsed(false)}
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
                  if (e.key === "Enter") {
                    console.log("keydown");
                    addNewExpense(session.data?.user?.id || "");
                  }
                }}
                onBlur={() => {
                  newExpenseName.trim() == ""
                    ? setShowAddExpense(false)
                    : addNewExpense(session.data?.user?.id || "");
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
                    addNewExpense(session.data?.user?.id || "");
                  }}
                  onMouseDown={(e) => e.preventDefault()}
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
            <span>{formatNumber(totalValue)}</span>
          </div>
        )}
        {!collapsed && (
          <div className="flex justify-between pr-5 text-lg ">
            <span className="w-16">Pago:</span>
            <span>{formatNumber(totalPago)}</span>
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
