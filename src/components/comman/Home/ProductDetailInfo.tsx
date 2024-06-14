/* eslint-disable prettier/prettier */
// ProductDetailInfo.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constent/Colors';
import image from '../../constent/Images';
import {fonts} from '../../constent/fonts';

const ProductDetailInfo = ({product, size, selectedItem, setSelectedItem}) => {
  const renderSizeItem = ({item, index}) => {
    const isSelected = selectedItem === index;
    return (
      <TouchableOpacity
        style={[styles.sizeBox, isSelected && styles.selectedSizeBox]}
        onPress={() => setSelectedItem(index)}>
        <Text style={[styles.sizeText, isSelected && styles.selectedText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const addToCart = async () => {
    if (selectedItem === null) {
      Alert.alert('Please select a size.');
      return;
    }
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      const selectedSize = size[selectedItem];
      const existingProductIndex = cartItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize,
      );
      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
      } else {
        const item = {
          ...product,
          selectedSize: selectedSize,
          quantity: 1,
        };
        cartItems.push(item);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      Alert.alert('Success', 'Product added to cart!');
    } catch (error) {
      Alert.alert('adding to cart:', error);
      Alert.alert('Failed to add product to cart.');
    }
  };

  return (
    <View>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.cate}>
          <Text style={styles.category}>{product.category}</Text>
          <Image source={image.SHARE_ICON} style={styles.shareIcon} />
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.bottom}>
          <View style={styles.offer}>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.off}>60% off</Text>
          </View>
          <View style={styles.reviewContent}>
            <Image source={image.STAR_ICON} style={styles.star} />
            <Text style={styles.review}>{product.rating.rate}</Text>
            <Text style={styles.count}>({product.rating.count})</Text>
          </View>
        </View>
        <Text style={styles.crec}>$ 99.69</Text>
        <FlatList
          data={size}
          renderItem={renderSizeItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal={true}
          contentContainerStyle={styles.sizes}
        />
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About the product</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity
          onPress={addToCart}
          style={[
            styles.btn,
            {
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primaryColor,
            },
          ]}>
          <Text style={styles.cart}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.buy}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.primaryColor,
  },
  cate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
    color: colors.grayColor,
  },
  shareIcon: {
    height: 20,
    width: 20,
    tintColor: colors.grayColor,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  price: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.PoppinsBold,
  },
  offer: {
    flexDirection: 'row',
    gap: 10,
  },
  off: {
    color: colors.darkGreen,
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
  },
  crec: {
    textDecorationLine: 'line-through',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  count: {
    color: colors.grayColor,
    fontFamily: fonts.PoppinsRegular,
  },
  sizes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    marginBottom: 5,
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: colors.grayColor,
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    color: colors.grayColor,
  },
  selectedSizeBox: {
    backgroundColor: '#FFD2ED',
    borderColor: colors.primaryColor,
  },
  selectedText: {
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  about: {
    marginTop: 10,
    marginBottom: 10,
  },
  aboutTitle: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 18,
  },
  description: {
    marginBottom: 10,
    color: colors.grayColor,
  },
  categoryText: {
    marginBottom: 10,
  },
  rating: {
    marginBottom: 10,
  },
  flatListContainer: {
    padding: 10,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
  },
  cart: {
    color: colors.primaryColor,
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    textTransform: 'uppercase',
  },
  buy: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    textTransform: 'uppercase',
  },
});

export default ProductDetailInfo;
