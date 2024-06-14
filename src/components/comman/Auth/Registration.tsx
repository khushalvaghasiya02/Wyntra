/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constent/Colors';
import image from '../../constent/Images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {fonts} from '../../constent/fonts';

const Registration = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Kilb6oMIDH6w10eCixLl8OQC0HLuuGAe9w&s',
  );

  const ref = firestore().collection('users');
  const handleSubmit = async () => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await ref.add({
        phone: phone,
        name: name,
        avatar: avatar,
        address: address,
        email: result.user.email,
        uid: result.user.uid,
      });
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setAddress('');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        Alert.alert(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentBox}>
          <View style={styles.logoContain}>
            <Image source={image.INTRO} style={styles.image} />
            <Text style={styles.logoText}>Wyntra</Text>
          </View>
          <Text style={styles.welcome}>
            Welcome! Sign up to access exclusive offers and enjoy a seamless
            shopping experience.
          </Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Text style={styles.label}>Phone No</Text>
          <TextInput
            placeholder="Enter your phone no"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => setPhone(text)}
            value={phone}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter your address"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            onChangeText={text => setAddress(text)}
            value={address}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: colors.primaryColor,
    marginBottom: 20,
    color: colors.black,
    paddingHorizontal: 10,
  },
  contentBox: {
    width: '80%',
    alignItems: 'center',
  },
  logoContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  logoText: {
    fontSize: 36,
    fontFamily: fonts.PoppinsBold,
    color: colors.grayColor,
    marginLeft: 10,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: fonts.PoppinsRegular,
  },
  label: {
    fontSize: 16,
    color: colors.primaryColor,
    alignSelf: 'flex-start',
    fontFamily: fonts.PoppinsRegular,
  },
  btn: {
    borderRadius: 34,
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
  },
});

export default Registration;
