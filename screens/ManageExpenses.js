import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Buttons from "../components/UI/Buttons";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); //initially false as we are not sending data initially
  const [error, setError] = useState();
  const expensesCtx= useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; /// !! is used to convert the value into boolean (it will return ture or false)

  const selectedExpense=expensesCtx.expenses.find(expense=>expense.id===editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true); // change state to true while sending data
    try{
      await deleteExpense(editedExpenseId);
      //setIsSubmitting(false); // change state to false after sending data
      //no need to set it again false as we are closing the screen down 
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    }catch(error){
      setError('Failed to delete expense. Please try again later.');
      setIsSubmitting(false);
    }

  }


  function cancelHandler(){
    navigation.goBack();
  }

  
  async function confirmHandler(expenseData){
    setIsSubmitting(true); // change state to true while sending data
    try{
      if(isEditing){
        expensesCtx.updateExpense(editedExpenseId,expenseData);
        await updateExpense(editedExpenseId,expenseData);
      }
      else{
        const id= await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData,id:id});
      }
      navigation.goBack();
    }catch(error){
      setError('Failed to save expense. Please try again later.');
      setIsSubmitting(false);
    }

  }
  
  if(error && !isSubmitting){
    return <ErrorOverlay message={error} />
  }

  if(isSubmitting){
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={confirmHandler} submitButtonLevel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler} defaultValues={selectedExpense}/>
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800,
   
  },
  deleteContainer:{
    marginTop:16,
    padding:8,
    borderTopWidth:2,
    borderTopColor:GlobalStyles.colors.primary200,
    alignItems:'center',
  },
  
 
});
