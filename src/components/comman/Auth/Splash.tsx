/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import image from '../../constent/Images';
import {fonts} from '../../constent/fonts';
import {colors} from '../../constent/Colors';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Intro');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={image.MAIN_LOGO}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Wyntra</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.PoppinsBoldItalic,
    marginBottom: 20,
    textTransform: 'uppercase',
    color: colors.grayColor,
  },
});

export default Splash;
