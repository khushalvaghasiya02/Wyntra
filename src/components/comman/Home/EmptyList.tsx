/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import image from '../../constent/Images';
import {colors} from '../../constent/Colors';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image source={image.NOT_CART} style={styles.icon} />
      <Text style={styles.text}>Shopping continues...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 650,
  },
  text: {
    fontSize: 20,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default EmptyList;
