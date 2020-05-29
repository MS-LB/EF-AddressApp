import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedbackBase,
  Button,
} from 'react-native';

// Components used in this application
import Title from '../Title/Title';
import EthereumAddress from '../EthereumAddress/EthereumAddress';
import GenerateButton from '../GenerateButton/GenerateButton';

// New password function requires crypto
import '../../shim.js';
import crypto from 'crypto';

const App: () => React$Node = () => {
  //This should be replaced with a real auth feature
  // Ideally the user would enter a password everytime they open the app
  const [password, setPassword] = useState('SavedOrEnteredPassword');

  // Creating a new password to trigger the address change
  // Again if the passwords had real meaning this could be changed to be another prop
  function handlePress() {
    setPassword(crypto.randomBytes(32).toString('hex'));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <View style={styles.AddressesContainer}>
          <EthereumAddress password={password} />
        </View>
        <View style={styles.ButtonContainer}>
          <GenerateButton onPress={handlePress} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  AddressesContainer: {
    marginTop: 96,
    marginLeft: 24,
  },
  ButtonContainer: {flex: 1, justifyContent: 'flex-end', marginBottom: 64},
});

export default App;
