import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { white, purple, red } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

import TextButton from './TextButton';
import UdaciSteppers from './UdaciSteppers';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';

import { submitEntry, removeEntry } from '../utils/api';

import { addEntry } from '../actions';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitButton}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {

  state = {
    run: 0,
    bike: 10,
    swim: 0,
    sleep: 20,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState(state =>{
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count
      }
    });
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric)

    this.setState(state =>{
      const count = state[metric] - step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    });
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    })
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    // update redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })

    // navigate to home
    this.toHome()

    // save to db
    submitEntry({ key, entry })

    // clear local notification
  }

  toHome = () => {
    const { navigation } = this.props

    navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  reset = () => {
    const key = timeToString()

    // update redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    // route to home
    this.toHome()

    // update db
    removeEntry({ key })
  }

  render() {
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo()

    if (alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name = {Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size = {100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton style={{padding: 10, color: red}} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {/* {getMetricMetaInfo('bike').getIcon()} */}
        <DateHeader
          date={(new Date()).toLocaleDateString()}
        />
        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        {
          Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return (
              <View key={key} style={styles.row}>
                {getIcon()}
                {type === 'slider'
                 ? <UdaciSlider
                      value={value}
                      onChange={(value) => this.slide(key, value)}
                      {...rest}
                   />
                 : <UdaciSteppers
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      {...rest}
                   />
                }
              </View>
            )
          })
        }
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  }
})

function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)
