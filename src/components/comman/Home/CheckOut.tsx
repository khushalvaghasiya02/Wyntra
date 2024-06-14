/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {colors} from '../../constent/Colors';
import EmptyList from './EmptyList';
import {fonts} from '../../constent/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';

const CheckoutScreen = ({route}) => {
  const {cartItems} = route.params;
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [parsedUser, setParsedUser] = useState(null);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        let totalPrice = 0;
        let itemCount = 0;
        cartItems.forEach(item => {
          totalPrice += item.price * item.quantity;
          itemCount += item.quantity;
        });
        setTotal(totalPrice);
        setTotalItems(itemCount);
        setDiscount(10);
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setParsedUser(parsedUser);
        }
      } catch (error) {
        Alert.alert('checking logged in status:', error);
      }
    };
    checkUserToken();
  }, [cartItems]);

  const createPaymentIntent = async (amount: number) => {
    console.log(amount);
    try {
      const response = await fetch(
        'https://7b1f-116-74-113-117.ngrok-free.app/payments/intents',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount}),
        },
      );

      console.log('response', response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      Alert.alert(error);
      Alert.alert('Failed to create payment intent');
      return null;
    }
  };

  const onCheckout = async () => {
    const paymentIntentData = await createPaymentIntent(
      Math.floor((total - discount) * 100),
    );

    if (!paymentIntentData) {
      return;
    }
    console.log(paymentIntentData);

    const {error: initError} = await initPaymentSheet({
      merchantDisplayName: 'Wyntra',
      paymentIntentClientSecret: paymentIntentData.paymentIntent,
      defaultBillingDetails: {
        name: parsedUser?.name || 'Jane Doe',
      },
    });

    if (initError) {
      Alert.alert('Something went wrong', initError.message);
      return;
    }

    const {error: paymentError} = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }

    onCreateOrder();
  };

  const onCreateOrder = () => {
    console.log('Order created successfully!');
    Alert.alert('Success', 'Payment successful and order created!');
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.middel}>
          <Text style={styles.price}>price: ${item.price}</Text>
          <Text style={styles.price}>Size : {item.selectedSize} </Text>
        </View>
        <Text style={styles.price}>quantity : {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
      />
      <View style={styles.bill}>
        <View>
          <Text style={styles.name}>Invoice</Text>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total Items:</Text>
            <Text style={styles.totalPrice}>{totalItems}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total Price:</Text>
            <Text style={styles.totalPrice}> ${total.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.total}>
              <Text style={styles.totalText}>Discount:</Text>
              <Text style={styles.totalPrice}> ${discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.total}>
            <Text style={styles.addressText}>Address:</Text>
            <Text style={styles.address}>{parsedUser?.address}</Text>
          </View>
        </View>
        <View>
          <View style={styles.totalAmount}>
            <Text style={styles.totalText}> Total Amount: </Text>
            <Text style={[styles.totalPrice, {color: colors.primaryColor}]}>
              ${(total - discount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.btn} onPress={onCheckout}>
              <Text style={styles.btnText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    flexDirection: 'row',
    margin: 15,
    padding: 10,
    width: '90%',
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
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  price: {
    fontSize: 16,
    color: colors.grayColor,
  },

  bill: {
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '40%',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 2,
    // borderColor: colors.primaryColor,
  },
  name: {
    textAlign: 'center',
    color: colors.primaryColor,
    fontFamily: fonts.PoppinsSemiBoldItalic,
  },
  total: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  totalText: {
    fontSize: 20,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
    color: colors.grayColor,
  },
  totalAmount: {
    borderTopColor: colors.primaryColor,
    borderTopWidth: 2,
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  address: {
    color: colors.grayColor,
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  btns: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default CheckoutScreen;
