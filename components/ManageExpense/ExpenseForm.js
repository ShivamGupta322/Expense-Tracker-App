import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Buttons from "../UI/Buttons";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({submitButtonLevel,onCancel,onSubmit,defaultValues}) => {
    const [inputs, setInputs] = useState({
        amount: {value:defaultValues ? defaultValues.amount.toString() :'', isValid: true },
        date: {value:defaultValues ? getFormattedDate(defaultValues.date) :'',isValid: true },
        description: {value:defaultValues ? defaultValues.description  :'',isValid: true }
    });
  function inputChnageHandler(inputIdentifier,enteredValue) {
    setInputs((currentInputs)=>{
        return {
         ...currentInputs,
          [inputIdentifier]:{value: enteredValue, isValid: true}
        };
    })
  }
  function submitHandler(){
    const expenseData={
        amount: +inputs.amount.value, //+ sign converts the string into number
        date: new Date(inputs.date.value),
        description: inputs.description.value
    };
    const amountIsValid =! isNaN(expenseData.amount) && expenseData.amount>0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid =expenseData.description.trim().length>0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      // Alert.alert('Invalid Input', 'Please Check your Input values');
      setInputs((currentInputs)=>{
        return{
          amount: {value: currentInputs.amount.value, isValid: amountIsValid},
          date: {value: currentInputs.date.value, isValid: dateIsValid},
          description: {value: currentInputs.description.value, isValid: descriptionIsValid}
        }
      })
      return;
    }
    onSubmit(expenseData);

  }
  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChnageHandler.bind(this,'amount'),
            value:inputs.amount.value
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputs.date.isValid}

          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChnageHandler.bind(this,'date'),
            value:inputs.date.value
          }}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //autoCorrect:false, // default is true
          onChangeText: inputChnageHandler.bind(this,'description'),
            value:inputs.description.value
        }}
      />
      {formIsInvalid && (<Text style={styles.errorText}>Invalid Input values, Please check your input Data !! ⚠</Text>)}
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
  },
  errorText:{
    textAlign: 'center',
    color:GlobalStyles.colors.error500,
    margin:8,
    fontSize:16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  }
});
