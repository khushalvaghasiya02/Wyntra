/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import image from '../../constent/Images';
import {colors} from '../../constent/Colors';
import {fonts} from '../../constent/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Intro = ({navigation}) => {
  const ref = firestore().collection('users');
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const user = await AsyncStorage.getItem('token');
      if (user) {
        const unsubscribe = ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {name, email, phone, avatar, uid,address} = doc.data();
            list.push({
              id: doc.id,
              uid,
              name,
              email,
              phone,
              avatar,
              address,
            });
          });

          if (user) {
            const currentUserData = list.find(u => u.uid === user.uid);
            AsyncStorage.setItem(
              'currentUser',
              JSON.stringify(currentUserData),
            );
          }
        });

        navigation.navigate('move', {name: user});
        return () => unsubscribe();
      }
    } catch (error) {
      Alert.alert('checking logged in status:', error);
    }
  };
  return (
    <ImageBackground source={image.SHOPPING} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={image.MAIN_LOGO}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>"Discover Fashion, Discover You"</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>GO TO SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBoldItalic,
    marginBottom: 20,
    color: colors.white,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.PoppinsLightItalic,
  },
});

export default Intro;
