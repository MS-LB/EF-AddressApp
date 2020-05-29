import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

import '../../shim.js';
import crypto from 'crypto';

const wallet = require('eth-wallet-light');

export default class EthereumAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: 'unknown',
      address: 'unknown',
      deviceId: getUniqueId(),
    };

    this.createAddress();
  }

  // Ideally we would use more than just the device ID.
  // Using a long passphrase would be better
  getEntropyFromDeviceSpecs = () => {
    let paddedString = this.state.deviceId.padEnd('32', 0);
    return paddedString;
  };

  // Check for a new password and create a new address
  componentDidUpdate(prevProps) {
    if (this.props.password !== prevProps.password) {
      this.createAddress();
    }
  }

  createAddress() {
    let entropy = this.getEntropyFromDeviceSpecs();

    (async () => {
      let keystore = await new wallet.Keystore().initializeFromEntropy(
        entropy,
        this.props.password,
      );

      this.setState({
        privateKey: keystore.getPrivateKey(this.props.password),
        address: keystore.getAddress(),
      });
    })();
  }

  render() {
    let address = this.state.address;
    let privateKey = this.state.privateKey;

    return (
      <View>
        {/*
            Conflicting requirements:
            The text requirements state the one of the fields should be Address (see second bulletpoint).
            The last page in the writeup document it shows Public Key instead of Address
         */}
        <Text style={styles.title}> Address: </Text>
        <Text style={styles.value}>{address}</Text>
        <Text style={styles.title}> Private Key: </Text>
        <Text style={styles.value}>{privateKey}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginEnd: 15,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    borderWidth: 1,
    marginTop: 15,
    marginEnd: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});
