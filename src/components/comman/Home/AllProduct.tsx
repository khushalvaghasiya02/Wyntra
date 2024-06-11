/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from '../../constent/Colors';
import {data} from '../../constent/Data';
import {fonts} from '../../constent/fonts';
import Card from './Card';

interface Data {
  category: string;
  title: string;
  rate: number;
  rating: any;
  count: number;
  price: number;
  id: number;
  image: any;
}

const AllProduct = () => {
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
      <FlatList
        data={data}
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
  },
  card: {
    width: '50%',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'stretch',
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
  review: {
    marginRight: 5,
    fontFamily: fonts.PoppinsRegular,
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
  star: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});

export default AllProduct;
