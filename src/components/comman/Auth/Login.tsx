/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constent/Colors';
import image from '../../constent/Images';
import {fonts} from '../../constent/fonts';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState();

  const ref = firestore().collection('users');
  const handleSubmit = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setUserData(user);
        setEmail('');
        setPassword('');
        AsyncStorage.setItem('token', JSON.stringify(user));
        Alert.alert('User login successful!');
        navigation.navigate('move');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          console.log('Wrong password provided!');
        } else if (error.code === 'auth/user-not-found') {
          console.log('User not found!');
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
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
          address
        });
      });

      if (userData) {
        const currentUserData = list.find(u => u.uid === userData.uid);
        AsyncStorage.setItem('currentUser', JSON.stringify(currentUserData));
      }
    });

    return () => unsubscribe();
  }, [userData]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Signed in with Google!');
      navigation.navigate('Home');
    } catch ({error}: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('Something went wrong with Google Sign In');
        console.error('Google Sign In Error:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.loginBox}>
        <View style={styles.contentBox}>
          <View style={styles.logoContain}>
            <Image source={image.INTRO} style={styles.image} />
            <Text style={styles.logoText}>Wyntra</Text>
          </View>
          <Text style={styles.welcome}>
            Welcome back! Sign in using your social account or email to continue
            us
          </Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Text style={styles.label}>Your Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={colors.grayColor}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.bottom}>
            <View style={styles.orLines}>
              <View style={styles.orLine}></View>
              <Text>OR</Text>
              <View style={styles.orLine}></View>
            </View>
          </View>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
            style={styles.googleBtn}
          />

          <View style={styles.reg}>
            <Text style={styles.regText}>
              Don't have an account?{' '}
              <Pressable onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.regLink}>Sign up</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: '80%',
    height: '70%',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 40,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: colors.primaryColor,
    marginBottom: 30,
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontFamily: fonts.PoppinsBold,
    color: colors.grayColor,
  },
  title: {
    color: colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: fonts.PoppinsRegular,
  },
  googleBtn: {
    marginBottom: 20,
  },
  orLines: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CDD1D0',
  },
  inputBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: colors.primaryColor,
    marginBottom: 10,
    fontFamily: fonts.PoppinsRegular,
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
  bottom: {alignItems: 'center'},
  reg: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regText: {
    color: colors.primaryColor,
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular,
  },
  regLink: {
    textDecorationLine: 'underline',
    color: colors.grayColor,
  },
});

export default Login;
