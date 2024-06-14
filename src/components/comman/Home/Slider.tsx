/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constent/Colors';
import {slides} from '../../constent/Data';
import {fonts} from '../../constent/fonts';

const Slider = () => {
  const navigation = useNavigation();

  const {width} = Dimensions.get('screen');
  const height = width * 0.5;
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (active < slides.length - 1) {
        scrollViewRef.current.scrollTo({
          x: width * (active + 1),
          animated: true,
        });
      } else {
        scrollViewRef.current.scrollTo({x: 0, animated: true});
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{width, height}}>
        {slides.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.image}
            resizeMode="cover"
            style={{width, height, resizeMode: 'cover'}}>
            <View style={styles.overlay}>
              <View style={styles.offers}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.off}>{item.discount}</Text>
                <Text style={styles.contein}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AllProduct')}>
                  <Text style={styles.buttonText}>Check this out</Text>
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {slides.map((i, k) => (
          <Text key={k} style={k === active ? styles.activeDot : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    color: '#888',
    fontSize: 20,
    marginHorizontal: 5,
  },
  activeDot: {
    color: colors.primaryColor,
    fontSize: 20,
    marginHorizontal: 5,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  offers: {
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
    marginBottom: '4%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: fonts.PoppinsSemiBold,
  },
  off: {
    color: colors.secondaryColor,
    fontFamily: fonts.PoppinsBlackItalic,
    fontSize: 20,
  },
  contein: {
    color: colors.fontColor,
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
  },
  button: {
    width: '40%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
});

export default Slider;
