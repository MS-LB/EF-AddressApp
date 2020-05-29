import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}> Ember Ethereum Wallet </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
