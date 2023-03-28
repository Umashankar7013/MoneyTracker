import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import NoOfItemsComponent from '../Components/NoOfItemsComponent';
import {context} from '../../App';
import {Models} from '../Model/FireBaseModel';

const SelectedItemsView = () => {
  const {selectedItems, setSelectedItems, paymentMethods, user} =
    useContext(context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const date = new Date();

  const detailsSaveHandler = async () => {
    let currentDate = date.toDateString();
    let time = date.toLocaleTimeString();
    let amount;
    let amount1;

    const data = await Models.totalAmount.particularDayData(
      user.uid,
      currentDate,
    );

    if (!data) amount = 0;
    else amount = data.totalAmount;

    if (
      !data ||
      !data?.[selectedPaymentMethod] ||
      !data?.[selectedPaymentMethod]
    )
      amount1 = 0;
    else amount1 = data[selectedPaymentMethod];

    Models.totalAmount.DayTotalAmount(
      user.uid,
      amount + totalAmount,
      currentDate,
      selectedPaymentMethod,
      amount1 + totalAmount,
    );

    Models.dataStore.addDailyData(
      user.uid,
      currentDate,
      time,
      totalAmount,
      selectedPaymentMethod,
    );
  };

  const removeButtonHandler = item => {
    let array = [...selectedItems];
    array.map((itr, index) => {
      if (itr === item) {
        array.splice(index, 1);
      }
    });
    setSelectedItems(array);
  };

  useEffect(() => {
    let total = 0;
    selectedItems.map(item => (total += item.quantity * item.itemPrice));
    setTotalAmount(total);
  }, [selectedItems]);

  return (
    <View style={{flex: 1, borderWidth: 2}}>
      <ScrollView style={styles.container}>
        {selectedItems.map((item, index) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginBottom: 10,
            }}
            key={index}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemNameText}>
                {index + 1 + '. '}
                {item.itemName}
              </Text>
              <Text style={styles.itemPriceText}>
                {'Rs. '}
                {item.itemPrice * item.quantity}
                {' /-'}
              </Text>
              <TouchableOpacity onPress={() => removeButtonHandler(item)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
            <NoOfItemsComponent index={index} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalAmountView}>
        <Text style={styles.totalAmountText}>
          Total : {totalAmount}
          {' /-'}
        </Text>
        <TouchableOpacity
          style={styles.saveButtonView}
          onPress={() => setShowModal(true)}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide">
        <>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.intoSymbolText}>X</Text>
          </TouchableOpacity>
          <View style={styles.modalView}>
            {paymentMethods.map((item, index) => (
              <TouchableOpacity
                style={{
                  ...styles.modalElementsView,
                  ...{
                    backgroundColor:
                      item === selectedPaymentMethod ? 'gray' : 'white',
                  },
                }}
                key={index}
                onPress={() => setSelectedPaymentMethod(item)}>
                <Text
                  style={{
                    ...styles.modalElements,
                    ...{
                      color: item === selectedPaymentMethod ? 'white' : 'black',
                    },
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={{
              ...styles.saveButtonViewInModal,
              ...{
                backgroundColor:
                  selectedPaymentMethod !== ''
                    ? 'rgba(11,156,49,1)'
                    : 'rgba(11,156,49,0.5)',
              },
            }}
            onPress={() => {
              detailsSaveHandler(),
                setSelectedItems([]),
                setShowModal(false),
                Alert.alert('Data Saved SuccesFully');
            }}
            disabled={selectedPaymentMethod !== '' ? false : true}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </>
      </Modal>
    </View>
  );
};

export default SelectedItemsView;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
  },
  innerContainer: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
    color: 'black',
  },
  totalAmountView: {
    flex: 0.25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderWidth: 1,
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  saveButtonView: {
    backgroundColor: 'green',
    marginRight: 10,
    borderRadius: 8,
  },
  saveText: {
    marginHorizontal: 25,
    marginVertical: 9,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalElementsView: {
    // backgroundColor: 'gray',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  modalElements: {
    color: 'black',
    fontSize: 30,
    marginHorizontal: 30,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  saveButtonViewInModal: {
    position: 'absolute',
    bottom: 20,
    right: 50,
    borderRadius: 8,
  },
  removeButtonText: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignSelf: 'center',
    marginTop: 9,
    fontSize: 14,
    borderRadius: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  intoSymbolText: {
    color: 'black',
    borderWidth: 1,
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 8,
    left: 50,
    top: 20,
    color: 'red',
    paddingHorizontal: 10,
  },
});
