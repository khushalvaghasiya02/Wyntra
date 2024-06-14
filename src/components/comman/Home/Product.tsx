/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constent/Colors';
import {data} from '../../constent/Data';
import {fonts} from '../../constent/fonts';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';

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

const Product = () => {
  const navigation = useNavigation();
  const renderProductCard = ({item}: {item: Data}) => (
    <Card
      images={item.image}
      category={item.category}
      title={item.title}
      rate={item.rating.rate}
      count={item.rating.count}
      price={item.price}
      id={item.id}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trending Now!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AllProduct')}>
          <Text style={styles.buttonText}>See More</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    paddingHorizontal:'4%'
  },
  headerText: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
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

export default Product;
