import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { red, gray } from '../utils/colors';

export default function UdaciSlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        value={value}
        step={step}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
        maximumTrackTintColor={red}
        style={styles.slider}
      />
      <View style={styles.metricText}>
        <Text style={{textAlign: 'center', fontSize: 24}}>{value}</Text>
        <Text style={{textAlign: 'center', fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  slider: {
    flex: 1,
  },
  metricText: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
