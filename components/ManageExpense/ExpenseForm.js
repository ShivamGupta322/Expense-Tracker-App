import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Buttons from "../UI/Buttons";
import { getFormattedDate } from "../../util/date";

const ExpenseForm = ({submitButtonLevel,onCancel,onSubmit,defaultValues}) => {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() :'',
        date: defaultValues ? getFormattedDate(defaultValues.date) :'',
        description: defaultValues ? defaultValues.description  :''
    });
  function inputChnageHandler(inputIdentifier,enteredValue) {
    setInputValues((currentInputValues)=>{
        return {
         ...currentInputValues,
          [inputIdentifier]:enteredValue
        };
    })
  }
  function submitHandler(){
    const expenseData={
        amount: +inputValues.amount, //+ sign converts the string into number
        date: new Date(inputValues.date),
        description: inputValues.description
    };
    const amountIsValid =! isNaN(expenseData.amount) && expenseData.amount>0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid =expenseData.description.trim().length>0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      Alert.alert('Invalid Input', 'Please Check your Input values');
      return;
    }
    onSubmit(expenseData);
  }
  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChnageHandler.bind(this,'amount'),
            value:inputValues.amount
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChnageHandler.bind(this,'date'),
            value:inputValues.date
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //autoCorrect:false, // default is true
          onChangeText: inputChnageHandler.bind(this,'description'),
            value:inputValues.description
        }}
      />
      <View style={styles.buttons}>
             <Buttons style={styles.button} mode='flat' onPress={onCancel}>Cancel</Buttons>
             <Buttons style={styles.button} onPress={submitHandler}>{submitButtonLevel}</Buttons>
            </View> 
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:20,
    },
    title:{
        marginBottom:20,
        fontSize:24,
        fontWeight:"bold",
        textAlign:"center",
        color:'white',
        marginVertical:24
    },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
