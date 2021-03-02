import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import Colors from '../constants/colors';

const CustomButton = (props) => {
  const { children, onPress, style } = props;
  let ButtonComponent = TouchableOpacity;

  if(Platform.OS === 'android' && Platform.Version >= 21){
    ButtonComponent = TouchableWithoutFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={onPress}>
        <View style={{...styles.button, ...style}}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  button:{
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25 
  },
  buttonText:{
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
})
