import React from 'react';
import { StyleSheet, Text, View, Platform } from "react-native";
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerText}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  headerText: {
    color: 'white',
    fontSize: 24
  }
});

export default Header;
