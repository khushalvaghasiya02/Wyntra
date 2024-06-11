/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {mainDrawer, mainStack, mainTab} from '../constent/Navigation';
import {colors} from '../constent/Colors';
import {fonts} from '../constent/fonts';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import image from '../constent/Images';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
      <Image
        source={image.BACK_ARROW}
        style={styles.backButtonText}
        tintColor="black"></Image>
    </TouchableOpacity>
  );
};

export const AuthTabStack = () => {
  return (
    <View style={styles.auth}>
      <StatusBar
        animated={true}
        backgroundColor={colors.primaryColor}
        barStyle="light-content"
        translucent={true}
      />
      <Stack.Navigator>
        {mainStack.map((item, index) => (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={{
              headerLeft: () => (item.back === true ? <BackButton /> : null),
              headerShown: item.back === true,
            }}
            key={index}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
};

export const MainTabScreen = () => {
  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor={colors.primaryColor}
        barStyle="light-content"
        translucent={true}
      />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        {mainTab.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.title}
            component={item.component}
            options={{
              tabBarStyle: {height: 60},
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={item.src}
                    resizeMode="stretch"
                    style={{
                      ...styles.iconImg,
                      tintColor: focused ? colors.primaryColor : colors.black,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.tabText,
                      color: focused ? colors.primaryColor : colors.black,
                    }}>
                    {item.title}
                  </Text>
                </View>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -20},
        drawerActiveBackgroundColor: colors.primaryColor,
        drawerActiveTintColor: colors.white,
      }}>
      {mainDrawer.map((item, index) => (
        <Drawer.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            drawerIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={item.src}
                  resizeMode="cover"
                  style={{
                    ...styles.iconImg,
                    tintColor: focused ? colors.white : colors.black,
                  }}
                />
              </View>
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  main: {flex: 1, marginTop: 25},
  auth: {flex: 1},
  iconImg: {
    width: 20,
    height: 20,
  },
  tabText: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
    fontFamily: fonts.PoppinsMedium,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default MainTabScreen;
