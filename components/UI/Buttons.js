import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Buttons = ({children,onPress,mode,style}) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <View style={[styles.button, mode==='flat' && styles.flat]}>
            <Text style={[styles.buttonText, mode==='flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Buttons

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 4,
    },
    flat:{
        backgroundColor:'transparent',
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    },
    flatText:{
        color:GlobalStyles.colors.primary200,
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.colors.primary100,
        borderRadius:4
    }
})