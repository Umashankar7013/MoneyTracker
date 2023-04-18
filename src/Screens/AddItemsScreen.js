import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Models} from '../model/FireBaseModel';
import {context} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '../redux/categorySlice';

export const AddItemsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const category = useSelector(state => state.category.value);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const pickerItems = useSelector(state => state.pickerItems.value);

  const submitButtonHandler = () => {
    Models.items.addNewItemHandler(user?.displayName, category, name, price);
    setName('');
    setPrice('');
    Alert.alert('Success...!', 'Item Added Succesfully');
    navigation.navigate('Home');
  };

  return (
    <ScrollView>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Select Category</Text>
        <Picker
          style={{marginTop: -15}}
          selectedValue={category}
          onValueChange={itemValue => dispatch(setCategory(itemValue))}>
          {Object.keys(pickerItems).map((item, index) => (
            <Picker.Item
              label={pickerItems[item]}
              value={pickerItems[item]}
              key={index}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
        <Text style={styles.text}>1. Enter Item Name</Text>
        <TextInput
          style={styles.textInputField}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.text}>2.Enter the Cost Of Item</Text>
        <TextInput
          style={styles.textInputField}
          value={price}
          keyboardType="number-pad"
          onChangeText={text => setPrice(text)}
        />
        <TouchableOpacity
          style={styles.submitButtonView}
          onPress={() => submitButtonHandler()}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  textInputField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
    height: 55,
    paddingLeft: 15,
  },
  submitButtonView: {
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 7,
    borderRadius: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  submitButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  pickerItem: {
    fontSize: 20,
    color: 'black',
  },
});
