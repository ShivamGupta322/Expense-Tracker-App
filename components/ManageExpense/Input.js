import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Input = ({label,style,textInputConfig}) => {
    const inputStyle=[styles.input];
    if(textInputConfig && textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline)
    }
  return (
    <View style={[styles.inputContainer,style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        
    },
    label: {
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input: {
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700,
        borderWidth:1,
        borderColor:GlobalStyles.colors.primary50,
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top',
        // marginBottom:24
    },
})