import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Buttons from "../components/UI/Buttons";

const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; /// !! is used to convert the value into boolean (it will return ture or false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    navigation.goBack();

  }


  function cancelHandler(){
    navigation.goBack();
  }

  
  function confirmHandler(){
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
