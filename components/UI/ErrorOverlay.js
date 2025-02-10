import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import Buttons from './Buttons'

const ErrorOverlay = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title,styles.text]}>Ann error occured !!😣</Text>
      <Text style={styles.text}>{message}</Text>

    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,
    },
    text:{
        textAlign: 'center',
        marginBottom:8,
        color:'white'
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        color:'white'
    },
    
})