/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constent/Colors';
import image from '../../constent/Images';
import {fonts} from '../../constent/fonts';

const Modals = ({show, setShow, sortItemsByName, sortItemsByPrice}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShow(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalText}>Filter</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShow(false)}>
                <Image source={image.CROSE_ICON} style={styles.crose}></Image>
              </Pressable>
            </View>
            <View style={styles.option}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sortItemsByName(false);
                }}>
                <Text style={styles.title}>Title - A to Z</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sortItemsByName(true);
                }}>
                <Text style={styles.title}>Title - Z to A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sortItemsByPrice(false);
                }}>
                <Text style={styles.title}>Price - Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sortItemsByPrice(true);
                }}>
                <Text style={styles.title}>Price - High to Low </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    right: 25,
    top: 80,
    marginTop: 22,
    width: '60%',
  },
  header: {
    backgroundColor: colors.primaryColor,
    borderTopLeftRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.PoppinsMedium,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.white,
  },
  btn: {
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
    borderBottomColor: colors.primaryColor,
    width: '100%',
  },
  crose: {
    width: 10,
    height: 10,
  },
  modalText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.PoppinsBoldItalic,
  },
});
export default Modals;
