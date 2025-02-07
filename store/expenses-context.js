import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'Groceries', amount: 50.75, date: new Date('2025-02-06') },
    { id: 'e2', description: 'Rent', amount: 1200.00, date: new Date('2023-10-01') },
    { id: 'e3', description: 'Utilities', amount: 150.30, date: new Date('2023-10-02') },
    { id: 'e4', description: 'Internet', amount: 60.00, date: new Date('2023-10-03') },
    { id: 'e5', description: 'Dining Out', amount: 45.50, date: new Date('2023-10-04') },
    { id: 'e6', description: 'Gym Membership', amount: 35.00, date: new Date('2023-10-05') },
    { id: 'e7', description: 'Car Maintenance', amount: 250.00, date: new Date('2023-10-06') },
    { id: 'e8', description: 'Insurance', amount: 100.00, date: new Date('2023-10-07') },
    { id: 'e9', description: 'Subscriptions', amount: 20.00, date: new Date('2023-10-08') },
    { id: 'e10', description: 'Clothing', amount: 75.00, date: new Date('2023-10-09') },
  ];

  export const ExpenseContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id,{description,amount,date})=>{}
  });

  function expenseReducer(state,action){
    switch(action.type){
      case 'ADD':
        const id=new Date().toString()+Math.random().toString();
        return [{...action.payload,id:id}, ...state]
      case 'UPDATE':
        const updateableExpenseIndex=state.findIndex((expense)=>expense.id===action.payload.id); 
        const updateableExpense=state[updateableExpenseIndex];
        const updateItem={...updateableExpense,...action.payload.data} 
        const updateExpenses=[...state];
        updateExpenses[updateableExpenseIndex]=updateItem;
        return updateExpenses;
      case 'DELETE':
        return state.filter((expense)=>expense.id !== action.payload);
      default:
        return state;
    }
  }

  function ExpensesContextProvider({children}){
    const [expenseState,dispatch]= useReducer(expenseReducer,DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData});
    }
    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id});
    }
    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}});
    }

    const value={
        expenses:expenseState,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  }

  export default ExpensesContextProvider;