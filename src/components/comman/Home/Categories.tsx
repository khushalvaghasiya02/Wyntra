/* eslint-disable prettier/prettier */
import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import image from '../../constent/Images';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../constent/fonts';
import { colors } from '../../constent/Colors';

const Categories = () => {
  const navigation = useNavigation();

  const CategorieWise = [
    {
      id: 1,
      image: image.MEN,
      title: 'Men',
      tintColor: '#2557D8',
      backgroundColor: '#DBE5FF',
    },
    {
      id: 2,
      image: image.WOMEN,
      title: 'Women',
      tintColor: '#EB26D7',
      backgroundColor: '#FFDAFB',
    },
    {
      id: 3,
      image: image.KIDS,
      title: 'Kids',
      tintColor: '#21A400',
      backgroundColor: '#DFFFD7',
    },
    {
      id: 4,
      image: image.JEWELLERY,
      title: 'Jewellery',
      tintColor: '#B86A04',
      backgroundColor: '#FFEED8',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemWrapper}>
      <Pressable
        style={styles.cates}
        onPress={() =>
          navigation.navigate('ProductList', {name: item.title,})
        }>
        <View
          style={{
            ...styles.categoryBack,
            backgroundColor: item.backgroundColor,
          }}>
          <Image
            source={item.image}
            style={[styles.categoryImage, {tintColor: item.tintColor}]}
          />
        </View>
        <Text style={styles.label}>{item.title}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CategorieWise}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        contentContainerStyle={styles.categories}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  categories: {
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  itemWrapper: {
    flex: 1,
  },
  cates: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
    color:colors.grayColor,
  },
  categoryBack: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryImage: {
    width: 25,
    height: 25,
  },
});

export default Categories;
