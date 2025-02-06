import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({description,amount,date,id}) => {
    const navigation=useNavigation();

    function expensePressHandler(){
        navigation.navigate('ManageExpense',{
          expenseId:id
        });
    }
  return (
    <Pressable onPress={expensePressHandler} style={({pressed})=>pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase,styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    expenseItem:{
        padding: 15,
        backgroundColor: GlobalStyles.colors.primary500,
        marginVertical: 8,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4,
        // color: GlobalStyles.colors.primary50,
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80
    },
    amount:{
        fontSize:16,
        fontWeight: 'bold',
        color:GlobalStyles.colors.primary500,
    }
});
