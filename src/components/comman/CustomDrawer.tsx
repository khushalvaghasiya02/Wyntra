/* eslint-disable prettier/prettier */
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from '../constent/Images';
import {colors} from '../constent/Colors';
import {fonts} from '../constent/fonts';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
        }
      } catch (error) {
        Alert.alert('checking logged in status:', error);
      }
    };
    checkUserToken();
  }, []);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('currentUser');
      await AsyncStorage.removeItem('cart');
      Alert.alert('User signed out!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('signing out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View style={styles.profile}>
            {user && user.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.image} />
            ) : (
              <Image source={image.PROFILE} style={styles.image} />
            )}
          </View>
          <Text style={styles.greetingText}>Hello {user ? user.name : 'Guest'} 🖐</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerProfile}>
            {user && user.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.profileImg} />
            ) : (
              <Image source={image.PROFILE} style={styles.profileImg} />
            )}
          </View>
          <View style={styles.footerText}>
            <Text style={styles.name}>{user ? user.name : 'Guest'}</Text>
            <Text style={styles.email}>
              {user ? user.email : 'guest@example.com'}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout} style={styles.btn}>
            <Image source={image.LOGOUT_ICON} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
    backgroundColor: colors.white,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 5,
  },
  profile: {
    borderColor: colors.primaryColor,
    borderWidth: 2,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    marginTop: 20,
    marginLeft: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  greetingText: {
    paddingTop: 20,
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: fonts.PoppinsBoldItalic,
  },
  footer: {
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  footerContent: {
    gap: 10,
    flexDirection: 'row',
  },
  footerProfile: {
    justifyContent: 'center',
  },
  footerText: {
    justifyContent: 'center',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontFamily: fonts.PoppinsBoldItalic,
  },
  email: {
    fontFamily: fonts.PoppinsItalic,
    fontSize: 12,
    color: 'white',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: colors.white,
  },
});

export default CustomDrawer;
