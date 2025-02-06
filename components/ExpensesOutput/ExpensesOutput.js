import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({expenses,expensesPeriod}) => {
  const dummyExpenses = [
    { id: 'e1', description: 'Groceries', amount: 50.75, date: new Date('2023-10-01') },
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
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={dummyExpenses} periodName={expensesPeriod}/>
     <ExpensesList expenses={dummyExpenses}/>
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:24,
    paddingTop:24,
    paddingBottom:0,
    backgroundColor:GlobalStyles.colors.primary700
  }
})