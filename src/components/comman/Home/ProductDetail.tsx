/* eslint-disable prettier/prettier */
// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { data } from '../../constent/Data';
import { colors } from '../../constent/Colors';
import { fonts } from '../../constent/fonts';
import image from '../../constent/Images';
import ProductDetailInfo from './ProductDetailInfo';

const ProductDetail = ({ route }) => {
  const { id ,name} = route.params;
  const [product, setProduct] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const size = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetail = data.find(item => item.id === id);
        setProduct(productDetail);
      } catch (error) {
        Alert.alert('fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <View style={styles.container}>
      {product && (
        <View style={styles.label}>
          <Image
            source={image.RIGHT_ARROW}
            tintColor={colors.white}
            style={styles.rightArrow}
          />
          <Text style={styles.categoryName}>{name}</Text>
        </View>
      )}
      <FlatList
        data={product ? [product] : []}
        renderItem={({ item }) => (
          <ProductDetailInfo
            product={item}
            size={size}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
        keyExtractor={item => item?.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primaryColor,
    marginBottom: 10,
    width: '40%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  rightArrow: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  categoryName: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.PoppinsBoldItalic,
  },
  flatListContainer: {
    padding: 10,
  },
});

export default ProductDetail;
