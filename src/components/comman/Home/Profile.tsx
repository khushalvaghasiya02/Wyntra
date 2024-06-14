/* eslint-disable prettier/prettier */
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
import auth from '@react-native-firebase/auth';

import {colors} from '../../constent/Colors';
import image from '../../constent/Images';
import {fonts} from '../../constent/fonts';
import {useNavigation} from '@react-navigation/native';
import {DrawerToggle} from './Header';

const Profile = () => {
  const navigation = useNavigation();

  const [parsedUser, setParsedUser] = useState(null);

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

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setParsedUser(parsedUser);
        }
      } catch (error) {
        Alert.alert(' checking logged in status:', error);
      }
    };
    checkUserToken();
  }, []);

  return (
    <View>
      <View style={styles.mainHeader}>
        <View style={styles.toggle}>
          <DrawerToggle />
        </View>
        <View style={styles.categorie}>
          <Text style={styles.categorieName}>Profile</Text>
          <Image
            source={image.LEFT_ARROW}
            tintColor={colors.white}
            style={styles.rightArrow}
          />
        </View>
      </View>
      <View style={styles.list}>
        {parsedUser && (
          <View>
            <View style={styles.header}>
              <Image
                source={
                  parsedUser.avatar ? {uri: parsedUser.avatar} : image.PROFILE
                }
                alt="Profile"
                style={styles.avatar}
              />
              <Text style={styles.name}>{parsedUser.name}</Text>
              <Text style={styles.email}>{parsedUser.email}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.section}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{parsedUser.name}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{parsedUser.email}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{parsedUser.phone}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{parsedUser.address}</Text>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.btn}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 20,
  },
  mainHeader: {
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
    width: '40%',
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  email: {
    fontSize: 16,
    color: colors.black,
  },
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  value: {
    width: '100%',
    marginLeft: 5,
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  btn: {
    borderRadius: 34,
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.PoppinsMedium,
  },
});

export default Profile;
