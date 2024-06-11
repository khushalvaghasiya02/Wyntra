/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import Categories from '../components/comman/Home/Categories';
import Header from '../components/comman/Home/Header';
import Slider from '../components/comman/Home/Slider';
import Product from '../components/comman/Home/Product';

const Home = () => {
  return (
    <View style={styles.main}>
      <Header />
      <Slider />
      <Categories />
      <Product />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Home;
