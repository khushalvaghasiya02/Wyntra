/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {colors} from '../../constent/Colors';
import {fonts} from '../../constent/fonts';
import image from '../../constent/Images';
import {useNavigation} from '@react-navigation/native';

interface Data {
  category: string;
  title: string;
  rate: number;
  count: number;
  price: number;
  images: string;
  id: number;
}

const Card = (props: Data) => {
  const navigation = useNavigation();

  const {images, category, title, rate, count, price, id} = props;
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetail', {id: id, name: category})
      }>
      <Image source={{uri: images}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.categories}>{category}</Text>
        <Text style={styles.name}>{title}</Text>
        <View style={styles.bottom}>
          <View style={styles.reviewContent}>
            <Image source={image.STAR_ICON} style={styles.star} />
            <Text style={styles.review}>{rate}</Text>
            <Text style={styles.count}>({count})</Text>
          </View>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  content: {
    padding: 10,
  },
  categories: {
    color: colors.grayColor,
    fontFamily: fonts.PoppinsRegular,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  review: {
    marginRight: 5,
    fontFamily: fonts.PoppinsRegular,
    color: colors.grayColor,
  },
  count: {
    color: colors.grayColor,
    fontFamily: fonts.PoppinsRegular,
  },
  price: {
    color: colors.darkGreen,
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
  },
});
export default Card;
