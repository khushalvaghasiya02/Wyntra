/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import image from '../../constent/Images';
import {colors} from '../../constent/Colors';
import {fonts} from '../../constent/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserAvatar(parsedUser.avatar);
        }
      } catch (error) {
        Alert.alert('checking logged in status:', error);
      }
    };
    checkUserToken();
  }, []);

  return (
    <View style={styles.header}>
      <View>
        <DrawerToggle />
      </View>
      <View style={styles.logoContain}>
        <Image source={image.MAIN_LOGO} style={styles.logo} />
        <Text style={styles.logoText}>Wyntra</Text>
      </View>
      <View style={styles.profileText}>
        <Pressable onPress={() => navigation.navigate('Search')}>
          <View style={styles.searchBack}>
            <Image source={image.SEARCH_ICON} style={styles.searchIcon}></Image>
          </View>
        </Pressable>
        {userAvatar ? (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image source={{uri: userAvatar}} style={styles.profile} />
          </Pressable>
        ) : (
          <Image source={image.PROFILE} style={styles.profile} />
        )}
      </View>
    </View>
  );
};

export const DrawerToggle = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.btn}>
      <View>
        <Image source={image.MORE_ICON} style={styles.more} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: '5%',
  },
  btn: {
    padding: 8,
    backgroundColor: colors.primaryColor,
    borderRadius: 34,
    width:40,
  },
  more: {
    width: 25,
    height: 25,
    tintColor: colors.white,
  },
  logoContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 20,
    marginTop:5,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  profileText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchBack: {
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
  profile: {
    width: 40,
    height: 40,
    borderRadius: 34,
  },
});

export default Header;
