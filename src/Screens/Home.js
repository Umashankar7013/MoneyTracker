import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import SelectedItemsView from './SelectedItemsView';
import {context} from '../../App';
import {Models} from '../Model/FireBaseModel';
import LoadingAnimationComponent from '../Components/LoadingAnimationComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import NoItemsAnimationComponent from '../Components/NoItemsAnimationComponent';

export const Home = () => {
  const [itemsData, setItemsData] = useState({});
  const {
    selectedItems,
    setSelectedItems,
    setPickerItems,
    setData,
    setDailyTotalAmounts,
    user,
  } = useContext(context);
  const [loading, setLoading] = useState(true);

  const selectedItemsHandler = data => {
    let flag = 0;
    selectedItems.map(item => {
      if (item.itemName === data.itemName) {
        flag = 1;
        return Alert.alert('Warning..!', 'Item Is Already Added');
      }
    });
    if (flag === 1) return;
    setSelectedItems([...selectedItems, data]);
  };

  const getDataHandler = async () => {
    const data = await Models.dataStore.getTotalData(user.uid);
    setData(data);
    const data1 = await Models.totalAmount.getTotalData(user.uid);
    setDailyTotalAmounts(data1);
    setLoading(false);
  };

  useEffect(() => {
    database()
      .ref(user.uid + '/Items/')
      .on('value', snap => {
        setItemsData(snap.val());
      });

    database()
      .ref(user.uid + '/Categories/')
      .on('value', snap => {
        if (snap.val()) setPickerItems(snap.val());
      });

    getDataHandler();
  }, []);

  return loading ? (
    <LoadingAnimationComponent />
  ) : itemsData ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: 2,
      }}>
      <ScrollView>
        {Object.keys(itemsData).map((item, index) => (
          <View key={index}>
            <View style={styles.header} key={index}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
            {Object.keys(itemsData[item]).map((item1, index1) => (
              <TouchableOpacity
                style={styles.detailsView}
                key={index1}
                onPress={() => selectedItemsHandler(itemsData[item][item1])}>
                <Text style={styles.itemNameText}>
                  {index1 + 1} {'. '}
                  {itemsData[item][item1].itemName}
                </Text>
                <Text style={styles.itemPriceText}>
                  {'Rs. '}
                  {itemsData[item][item1].itemPrice}
                  {' /-'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      {selectedItems.length > 0 && <SelectedItemsView />}
    </View>
  ) : (
    <NoItemsAnimationComponent />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'cornsilk',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemNameText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  itemPriceText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 3,
    color: 'green',
  },
});
