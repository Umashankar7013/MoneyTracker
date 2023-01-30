import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {context} from '../../App';
import NoItemsAnimationComponent from '../Components/NoItemsAnimationComponent';

export const AmountShownScreen = () => {
  const {
    data,
    setData,
    dailyTotalAmounts,
    setDailyTotalAmounts,
    paymentMethods,
    user,
  } = useContext(context);

  useEffect(() => {
    database()
      .ref(user.uid + '/DailyCals/')
      .on('value', snap => {
        setData(snap.val());
      });

    database()
      .ref(user.uid + '/DailyTotalAmount/')
      .on('value', snap => {
        setDailyTotalAmounts(snap.val());
      });
  }, []);

  return data ? (
    <ScrollView style={{backgroundColor: 'white'}}>
      {Object.keys(data).map((item, index) => (
        <View key={index}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Date : {item}</Text>
            <Text style={styles.totalAmountText}>
              Total Amount : {dailyTotalAmounts[item]['totalAmount']}
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
                {data[item][item1].selectedPaymentMethod}
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
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  bodyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    flex: 1,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  totalAmountText: {
    fontSize: 20,
    marginVertical: 7,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  tableHeader: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 18,
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
