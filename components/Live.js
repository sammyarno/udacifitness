import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

class Live extends Component {

  state = {
    coords: null,
    status: null,
    direction: ''
  }

  render() {
    const { coords, status, direction } = this.state

    if(status === null) {
      return (
        <ActivityIndicator style={{marginTop: 30}} />
      )
    }

    if(status === 'denied') {
      return (
        <View>
          <Text>Access Denied!</Text>
        </View>
      )
    }

    if(status === 'undetermined') {
      return (
        <View>
          <Text>Access Undetermined!</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>Live</Text>
      </View>
    )
  }
}

export default Live
