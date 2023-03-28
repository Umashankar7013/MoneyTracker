import database from '@react-native-firebase/database';

export class FireBaseModel {
  constructor(path) {
    this.basePath = path;
  }

  addNewItemHandler = (userId, category, name, price) => {
    database()
      .ref(userId + '/' + this.basePath + category + '/')
      .push({
        itemName: name,
        itemPrice: price,
        quantity: 1,
      });
  };

  addDailyData = (
    userId,
    currentDate,
    time,
    totalAmount,
    selectedPaymentMethod,
  ) => {
    database()
      .ref(userId + '/' + this.basePath + currentDate + '/')
      .child(time + '/')
      .set({
        totalAmount: totalAmount,
        paymentMethod: selectedPaymentMethod,
      });
  };

  particularDayData = async (userId, date) => {
    const data = await database()
      .ref(userId + '/' + this.basePath + date + '/')
      .once('value');
    return data.val();
  };

  DayTotalAmount = (userId, amount, date, selectedPaymentMethod, amount1) => {
    database()
      .ref(userId + '/' + this.basePath + date + '/')
      .child('totalAmount/')
      .set(amount);

    database()
      .ref(userId + '/' + this.basePath + date + '/')
      .child(selectedPaymentMethod + '/')
      .set(amount1);
  };

  getTotalData = async userId => {
    const data = await database()
      .ref(userId + '/' + this.basePath)
      .once('value');
    return data.val();
  };
}

export const Models = {
  categories: new FireBaseModel('Categories/'),
  items: new FireBaseModel('Items/'),
  dataStore: new FireBaseModel('DailyCals/'),
  totalAmount: new FireBaseModel('DailyTotalAmount/'),
};
