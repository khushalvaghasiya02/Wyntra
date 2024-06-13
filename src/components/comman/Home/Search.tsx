/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TextInput, FlatList, StyleSheet, Image} from 'react-native';
import {data} from '../../constent/Data';
import Card from './Card';
import {colors} from '../../constent/Colors';
import image from '../../constent/Images';

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

const Search = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = data.filter(item => {
    const searchTerm = search.toLowerCase();
    return searchTerm === '' || item.title.toLowerCase().includes(searchTerm);
  });

  const renderItem = ({item}: {item: Data}) => (
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
      <View style={styles.content}>
        <TextInput
          placeholder="Search Product"
          placeholderTextColor={colors.grayColor}
          onChangeText={text => setSearch(text)}
          value={search}
          style={styles.searchBar}
        />
        <View style={styles.searchBack}>
          <Image source={image.SEARCH_ICON} style={styles.searchIcon}></Image>
        </View>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
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
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  searchBar: {
    width: '80%',
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    color:colors.black,
  },
  searchBack: {
    position: 'absolute',
    right: 50,
    top: 5,
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
});
export default Search;
