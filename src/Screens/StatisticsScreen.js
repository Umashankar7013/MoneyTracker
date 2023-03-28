import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {context} from '../../App';
import {useEffect} from 'react';
import moment from 'moment/moment';
import NoItemsAnimationComponent from '../Components/NoItemsAnimationComponent';

const StatisticsScreen = () => {
  const {data} = useContext(context);
  const currentDate = new Date();
  const statisticsHeaders = [
    {
      title: 'Today',
    },
    {
      title: 'Yesterday',
    },
    {
      title: 'Last week',
    },
    {
      title: 'Per month',
    },
  ];
  const [selectedItem, setSelectedItem] = useState(
    statisticsHeaders?.[0]?.title,
  );
  const [statisticsData, setStatisticsData] = useState({});
  const [totalAmountObject, setTotalAmountObject] = useState({});

  const amountHandler = () => {
    let amountObject = {};
    let finalObject = {};
    Object.keys(statisticsData)?.map(item => {
      Object.values(statisticsData[item])?.map(item1 => {
        amountObject[item1?.paymentMethod] =
          (amountObject[item1?.paymentMethod] || 0) + item1?.totalAmount;
      });
      finalObject[item] = amountObject;
    });
    setTotalAmountObject(finalObject);
  };

  const filterFun = date => {
    let products = {};
    Object.keys(data)?.map(product => {
      if (product === date) {
        products[product] = data?.[product];
      }
    });
    setStatisticsData(products);
  };

  const statisticsFilterHandler = () => {
    if (selectedItem === statisticsHeaders?.[0]?.title) {
      filterFun(currentDate?.toDateString());
    } else if (selectedItem === statisticsHeaders?.[1]?.title) {
      const spilttedPreviousDayDate = moment(currentDate)
        .add(-1, 'days')
        .toString()
        .split(' ');
      const previousDayDate = `${spilttedPreviousDayDate[0]} ${spilttedPreviousDayDate[1]} ${spilttedPreviousDayDate[2]} ${spilttedPreviousDayDate[3]}`;
      filterFun(previousDayDate);
    }
  };

  useEffect(() => {
    statisticsFilterHandler();
  }, [selectedItem, data]);

  useEffect(() => {
    amountHandler();
  }, [statisticsData]);

  return (
    <View style={styles.container}>
      <View style={styles.flatListView}>
        <Text style={styles.headerText}>Statistics</Text>
        <FlatList
          data={statisticsHeaders}
          horizontal
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.titleView,
                  ...{
                    backgroundColor:
                      selectedItem === item?.title ? 'green' : 'white',
                  },
                }}
                onPress={() => setSelectedItem(item?.title)}>
                <Text
                  style={{
                    ...styles.titleText,
                    ...{
                      color: selectedItem === item?.title ? 'white' : 'black',
                    },
                  }}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {Object.keys(totalAmountObject).length > 0 ? (
        <FlatList
          data={Object.keys(totalAmountObject)}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderBottomWidth:
                    index !== Object.keys(totalAmountObject).length - 1 && 1,
                }}>
                <Text style={styles.dateText}>{`${index + 1}. ${item}`}</Text>
                {Object.keys(totalAmountObject[item])?.map((method, index1) => (
                  <Text
                    style={styles.methodText}
                    key={
                      index1
                    }>{`${method} : ${totalAmountObject[item][method]} /-`}</Text>
                ))}
              </View>
            );
          }}
        />
      ) : (
        <NoItemsAnimationComponent />
      )}
    </View>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListView: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 10,
    paddingVertical: 10,
  },
  titleView: {
    paddingVertical: 7,
    borderWidth: 1,
    marginVertical: 0.2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  titleText: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 20,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
