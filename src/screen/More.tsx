/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import Profile from '../components/comman/Home/Profile';
import { colors } from '../components/constent/Colors';

const More = () => {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
export default More;
