/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import AllProduct from '../components/comman/Home/AllProduct';
import Categories from '../components/comman/Home/Categories';
import {colors} from '../components/constent/Colors';
import {DrawerToggle} from '../components/comman/Home/Header';

const AllCategories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toggle}>
        <DrawerToggle />
      </View>
      <Categories />
      <AllProduct />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  toggle: {
    marginTop: 15,
  },
});
export default AllCategories;
