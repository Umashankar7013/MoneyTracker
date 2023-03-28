import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {context} from '../../App';
import NoItemsAnimationComponent from '../Components/NoItemsAnimationComponent';
import {useState} from 'react';

export const AmountShownScreen = () => {
  const {
    data,
    setData,
    dailyTotalAmounts,
    setDailyTotalAmounts,
    paymentMethods,
    user,
  } = useContext(context);
  const [filteredDataKeys, setFilteredDataKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    database()
      .ref(user.uid + '/DailyCals/')
      .on('value', snap => {
        setData(snap.val() || {});
      });

    database()
      .ref(user.uid + '/DailyTotalAmount/')
      .on('value', snap => {
        setDailyTotalAmounts(snap.val() || {});
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const filteredData = Object.keys(data)?.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      if (a === b) return 0;
    });
    setFilteredDataKeys(filteredData);
    setLoading(false);
  }, [data]);

  return loading ? (
    <LoadingAnimationComponents />
  ) : data ? (
    <ScrollView style={{backgroundColor: 'white'}}>
      {filteredDataKeys.map((item, index) => (
        <View key={index}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Date : {item}</Text>
            <Text style={styles.totalAmountText}>
              Total Amount : {dailyTotalAmounts[item]?.totalAmount}
              {' /-'}
            </Text>
            <View style={styles.differentPaymentMethodsView}>
              {paymentMethods.map(
                (method, index) =>
                  dailyTotalAmounts[item][method] > 0 && (
                    <Text key={index} style={styles.paymentMethod}>
                      {method} : {dailyTotalAmounts[item][method]}
                      {' /-'}
                    </Text>
                  ),
              )}
            </View>
          </View>
          <View style={styles.tableView}>
            <Text style={styles.tableHeader}>Time</Text>
            <Text style={styles.tableHeader}>Amount</Text>
            <Text style={styles.tableHeader}>Method</Text>
          </View>
          {Object.keys(data[item]).map((item1, index1) => (
            <View key={index1} style={styles.bodyView}>
              <Text style={styles.text1}>
                {index1 + 1 + '. '}
                {item1}
              </Text>
              <Text
                style={{
                  ...styles.text1,
                  ...{color: 'green'},
                }}>
                {' Rs.'} {data[item][item1].totalAmount}
                {' /-'}
              </Text>
              <Text style={styles.text1}>
                {data[item][item1].paymentMethod}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  ) : (
    <NoItemsAnimationComponent />
  );
};

const styles = StyleSheet.create({
  header: {backgroundColor: 'cornsilk'},
  headerText: {
    fontSize: 18,
    marginVertical: 8,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  bodyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  text1: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    flex: 1,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  totalAmountText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  tableHeader: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  tableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 1,
  },
  differentPaymentMethodsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  paymentMethod: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
