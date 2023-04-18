import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedItems} from '../redux/selectedItemsSlice';

export const NoOfItemsComponent = ({index}) => {
  const selectedItems = useSelector(state => state.selectedItems.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.symbol, ...{marginRight: 4}}}
        onPress={() => {
          let array = [...selectedItems];
          array[index] = {
            ...array[index],
            quantity: array[index].quantity > 1 ? array[index].quantity - 1 : 1,
          };
          dispatch(setSelectedItems(array));
        }}>
        <Text style={styles.symbolText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.itemNumber}>{selectedItems[index].quantity}</Text>
      <TouchableOpacity
        style={{...styles.symbol, ...{marginLeft: 4}}}
        onPress={() => {
          let array = [...selectedItems];
          array[index] = {...array[index], quantity: array[index].quantity + 1};
          dispatch(setSelectedItems(array));
        }}>
        <Text style={styles.symbolText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    borderWidth: 1,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'gray',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  itemNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
