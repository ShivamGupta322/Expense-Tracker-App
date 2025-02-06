import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData){
  return (
    <ExpenseItem {...itemData.item}/>
  )
}

const ExpensesList = ({expenses}) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=>item.id}/>
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  expenseItem: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
})