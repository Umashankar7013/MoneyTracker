import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import SelectedItemsView from './SelectedItemsView';
import {LoadingAnimationComponent} from '../components/LoadingAnimationComponent';
import {NoItemsAnimationComponent} from '../components/NoItemsAnimationComponent';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedItems} from '../redux/selectedItemsSlice';
import {setpickerItems} from '../redux/pickerItemsSlice';
import {Models} from '../model/FireBaseModel';
import {dailyAmount, dailyTotalAmount} from '../redux/dailyAmountSlice';

const FilterItem = ({data, onchange = () => {}, style}) => {
  const [filter, setFilter] = useState({});
  useEffect(() => {
    onchange(filter);
  }, [filter]);

  return (
    <View style={{...style, margin: 10}}>
      <FlatList
        data={Object.keys(data)}
        horizontal={true}
        renderItem={item => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                marginRight: 10,
                borderRadius: 20,
                paddingHorizontal: 10,
                justifyContent: 'center',
                backgroundColor: filter[item.item] ? 'cornsilk' : 'white',
                paddingVertical: 10,
              }}
              onPress={() => {
                if (filter[item.item]) {
                  setFilter(prev => {
                    const copy = {...prev};
                    delete copy[item.item];
                    return copy;
                  });
                } else {
                  setFilter({...filter, [item.item]: data[item.item]});
                }
              }}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: 'black'}}>
                {item.item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const isObjectEmpty = objectName => {
  return Object.keys(objectName).length === 0;
};
export const Home = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState({});
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.value);
  const selectedItems = useSelector(state => state.selectedItems.value);

  const selectedItemsHandler = data => {
    let flag = 0;
    selectedItems.map(item => {
      if (item.itemName === data.itemName) {
        flag = 1;
        return Alert.alert('Warning..!', 'Item Is Already Added');
      }
    });
    if (flag === 1) return;
    dispatch(setSelectedItems([...selectedItems, data]));
  };

  const getDataHandler = async () => {
    const data = await Models.dataStore.getTotalData(user.uid);
    dispatch(dailyAmount(data || {}));
    const data1 = await Models.totalAmount.getTotalData(user.uid);
    dispatch(dailyTotalAmount(data1 || {}));
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      database()
        .ref(user?.displayName + '/Items/')
        .on('value', snap => {
          setItemsData(snap.val() || {});
        });

      database()
        .ref(user?.displayName + '/Categories/')
        .on('value', snap => {
          if (snap.val()) {
            dispatch(setpickerItems(snap.val()));
          }
        });
      getDataHandler();
    }
  }, [user]);

  const arr = isObjectEmpty(filter)
    ? Object.keys(itemsData)
    : Object.keys(filter);

  const sortArr = obj => {
    const arr = Object.keys(obj).sort((a, b) => {
      if (Number(obj[a].itemPrice) < Number(obj[b].itemPrice)) {
        return -1;
      }
      if (Number(obj[a].itemPrice) > Number(obj[b].itemPrice)) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  };

  return loading ? (
    <LoadingAnimationComponent />
  ) : itemsData && Object.keys(itemsData).length > 0 ? (
    <View style={{flex: 1}}>
      <FilterItem
        data={itemsData}
        onchange={e => {
          setFilter(e);
        }}
        style={{paddingHorizontal: 10, marginTop: 10}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'row',
          borderWidth: 2,
        }}>
        <ScrollView style={{flex: 1}}>
          {arr.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.header} key={index}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
                {sortArr(itemsData[item]).map((item1, index1) => {
                  return (
                    <TouchableOpacity
                      style={styles.detailsView}
                      key={index1}
                      onPress={() =>
                        selectedItemsHandler(itemsData[item][item1])
                      }>
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
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        {selectedItems.length > 0 && <SelectedItemsView />}
      </View>
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
