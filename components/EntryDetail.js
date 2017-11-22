import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';

class EntryDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { date } = navigation.state.params

    return {
      title: date
    }
  }

  render() {
    const { metrics, date } = this.props

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} date={date}/>
        {/* <Text>
          Entry Detail - {this.props.navigation.state.params.entryId}
        </Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

function mapStateToProps(state, { navigation }) {
  const { entryId, date } = navigation.state.params

  return {
    entryId,
    date,
    metrics: state[entryId]
  }
}

export default connect(mapStateToProps)(EntryDetail)
