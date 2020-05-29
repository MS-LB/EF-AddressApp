import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

const GenerateButton = props => {
  let handlePress = () => {
    props.onPress();
  };
  return (
    <View>
      <Button
        style={styles.button}
        title="Generate New Address"
        onPress={handlePress}
      />
    </View>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 24,
  },
});
