import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

export default function DateHeader ({date}) {
  return (
    <Text style={styles.date}>
      {date}
    </Text>
  )
}

const styles = StyleSheet.create({
  date: {
    fontSize: 25,
    color: purple,
    marginTop: 15
  }
})
