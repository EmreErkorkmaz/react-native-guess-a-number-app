import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import BodyText from '../components/BodyText';
import CustomButton from "../components/CustomButton";
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  const { roundsNumber, userNumber, onRestart } = props;
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image fadeDuration={1000} source={require('../assets/success.png')} style={styles.image} resizeMode="cover"/>
        {/* <Image source={{uri: 'https://images.squarespace-cdn.com/content/v1/5c09a1565417fc01fb86eaf9/1548092802241-HO16B8LUSSZA1VX4ZEW9/ke17ZwdGBToddI8pDm48kPnHaqX1Q253z26mJp-11Th7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQ93lJt6wopCJh7TMDDA2cGQDtuyOIsUBADKzjul-0ytA_BAmoM8KfSaR3f6p1HyQw/Summit%2BMountains%2BPhoto%2Bcopy.jpg?format=1500w'}} style={styles.image} resizeMode="cover"/> */}
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text></BodyText>
      </View>
      <CustomButton onPress={onRestart}>NEW GAME</CustomButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  resultContainer: {
    marginHorizontal: 60,
    marginVertical: 15
  },
  image: {
    width:'100%',
    height: '100%',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  }
});
