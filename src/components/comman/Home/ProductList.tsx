/* eslint-disable prettier/prettier */
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../constent/Colors';
import {fonts} from '../../constent/fonts';
import image from '../../constent/Images';
import {data} from '../../constent/Data';
import Card from './Card';
import Modals from './Modals';

interface Data {
  category: string;
  title: string;
  rate: number;
  rating: any;
  count: number;
  price: number;
  image: any;
  id: number;
}

const ProductList = ({route}) => {
  const {name} = route.params;
  const [productList, setProductList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const filterData = data.filter(item => item.category === name);
    setProductList(filterData);
    return () => {};
  }, [name]);

  const sortItemsByName = (reverse = false) => {
    const sortedList = [...productList].sort((a, b) =>
      reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title),
    );
    setProductList(sortedList);
    setModalVisible(false);
  };

  const sortItemsByPrice = (reverse = false) => {
    const sortedList = [...productList].sort((a, b) =>
      reverse ? b.price - a.price : a.price - b.price,
    );
    setProductList(sortedList);
    setModalVisible(false);
  };
  const renderProductCard = ({item}: {item: Data}) => (
    <Card
      id={item.id}
      images={item.image}
      category={item.category}
      title={item.title}
      rate={item.rating.rate}
      count={item.rating.count}
      price={item.price}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.categorie}>
        <Image
          source={image.RIGHT_ARROW}
          tintColor={colors.white}
          style={styles.rightArrow}
        />
        <Text style={styles.categorieName}>{name}</Text>
      </View>
      <Pressable style={styles.filter} onPress={() => setModalVisible(true)}>
        <Image
          source={image.FILTER_ICON}
          tintColor={colors.white}
          style={styles.rightArrow}
        />
      </Pressable>
      <Modals
        show={modalVisible}
        setShow={setModalVisible}
        sortItemsByName={sortItemsByName}
        sortItemsByPrice={sortItemsByPrice}
      />
      <FlatList
        data={productList}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.cards}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  categorie: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primaryColor,
    marginBottom: 10,
    width: '38%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  rightArrow: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  categorieName: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.PoppinsBoldItalic,
    marginRight: 20,
  },
  filter: {
    width: 50,
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 25,
    position: 'absolute',
    right: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default ProductList;
