import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Buttons from "../components/UI/Buttons";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx= useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; /// !! is used to convert the value into boolean (it will return ture or false)

  const selectedExpense=expensesCtx.expenses.find(expense=>expense.id===editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();

  }


  function cancelHandler(){
    navigation.goBack();
  }

  
  function confirmHandler(expenseData){
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId,expenseData);
    }
    else{
      storeExpense(expenseData);
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();

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
