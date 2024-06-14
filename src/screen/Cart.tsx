/* eslint-disable prettier/prettier */
// Cart.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../components/constent/Colors';
import image from '../components/constent/Images';
import {fonts} from '../components/constent/fonts';
import EmptyList from '../components/comman/Home/EmptyList';
import {useNavigation} from '@react-navigation/native';
import {DrawerToggle} from '../components/comman/Home/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
          setCartItems(JSON.parse(cart));
        }
      } catch (error) {
        Alert.alert('fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const updateCartItems = async newCartItems => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
    } catch (error) {
      Alert.alert('updating cart items:', error);
    }
  };

  const increaseQuantity = id => {
    const newCartItems = cartItems.map(item =>
      item.id === id ? {...item, quantity: (item.quantity || 1) + 1} : item,
    );
    updateCartItems(newCartItems);
  };

  const decreaseQuantity = id => {
    const newCartItems = cartItems.map(item =>
      item.id === id ? {...item, quantity: (item.quantity || 1) - 1} : item,
    );
    updateCartItems(newCartItems);
  };

  const deleteItem = id => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    updateCartItems(newCartItems);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.middel}>
          <Text style={styles.price}>
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </Text>
          <Text>Size : {item.selectedSize} </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity || 1}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => deleteItem(item.id)}
            style={styles.deleteButton}>
            <Image source={image.DELETE_ICON} style={styles.crose}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.toggle}>
          <DrawerToggle />
        </View>
        <View style={styles.categorie}>
          <Text style={styles.categorieName}>Cart</Text>
          <Image
            source={image.LEFT_ARROW}
            tintColor={colors.white}
            style={styles.rightArrow}
          />
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
      />

      <View style={styles.btns}>
        {cartItems.length > 0 ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('CheckOut', {cartItems});
            }}>
            <Text style={styles.btnText}>Check out</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  toggle: {
    paddingLeft: 10,
  },
  categorie: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: colors.primaryColor,
    marginBottom: 10,
    marginTop: 20,
    width: '36%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
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
    marginLeft: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    width: '100%',
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
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryColor,
  },
  image: {
    width: 100,
    height: '100%',
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  middel: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  price: {
    fontSize: 16,
    color: colors.grayColor,
  },
  bottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD2ED',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: colors.primaryColor,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.black,
  },
  deleteButton: {
    marginTop: 10,
    borderRadius: 5,
  },
  crose: {
    width: 20,
    height: 20,
    tintColor: colors.grayColor,
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
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    textTransform: 'uppercase',
  },
});

export default Cart;
