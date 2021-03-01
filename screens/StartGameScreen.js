import React, { useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Alert } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = (props) => {
  const { onStartGame } = props;
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if(confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="Start Game" onPress={onStartGame.bind(this, selectedNumber)}/>
      </Card>)
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input 
            style={styles.input} 
            blurOnSubmit 
            autoCapitalize='none' 
            autoCorrect={false} 
            keyboardType="number-pad" 
            maxLength={2} 
            onChangeText={numberInputHandler}
            value={enteredValue}
            />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title="Reset" color={colors.secondary} onPress={resetInputHandler} /></View>
            <View style={styles.button}><Button title="Confirm" color={colors.primary} onPress={confirmInputHandler} /></View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {width: 100},
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen
