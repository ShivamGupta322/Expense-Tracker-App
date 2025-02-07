import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Buttons from "../components/UI/Buttons";
import { ExpenseContext } from "../store/expenses-context";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx= useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; /// !! is used to convert the value into boolean (it will return ture or false)

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

  
  function confirmHandler(){
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId,{description:"Test!!!",amount:59.99,date:new Date('2025-02-06')});
    }
    else{
      expensesCtx.addExpense({description:"Test",amount:19.99,date:new Date('2025-02-07')});
    }
    navigation.goBack();

  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
       <Buttons style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Buttons>
       <Buttons style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Buttons>
      </View>
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
  buttons:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    minWidth:120,
    marginHorizontal:8
  }
});
