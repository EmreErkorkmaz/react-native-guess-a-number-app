import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
// import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText><Ionicons name="ios-arrow-forward" size={24} color="#ccc"/></BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, SetPastGuesses] = useState([initialGuess]);
  const [availableDeviceSize, setAvailableDeviceSize] = useState({width: Dimensions.get('window').width, height: Dimensions.get('window').height});

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceSize({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      });
    }
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if(currentGuess == userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice])

  const nextGuessHandler = direction => {
    if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)){
      Alert.alert('Don\'t lie!', 'Please don\'t cheat on me!', [{text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess;
    }else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    SetPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);
  }

  let gameScreen = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={{...styles.buttonContainer, marginTop: availableDeviceSize.height > 600 ? 20 : 5}}>
        <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white"/></CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white"/></CustomButton>
      </Card>
    </>
  );

  if(availableDeviceSize.height < 500) {
    gameScreen = (
      <>
        <View style={styles.controls}>
          <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white"/></CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white"/></CustomButton>
        </View>
      </>  
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Oppenent's Guess</Text>
        {gameScreen}
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'60%'
  }
});

export default GameScreen;