import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AddItemsScreen} from './src/Screens/AddItemsScreen';
import {AmountShownScreen} from './src/Screens/AmountShownScreen';
import {Home} from './src/Screens/Home';
import NetInfo from '@react-native-community/netinfo';
import NoInternetAnimation from './src/Components/NoInternetAnimation';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {LoginPage} from './src/Screens/LoginPage';
import {LogoutScreen} from './src/Screens/LogoutScreen';

const Tab = createBottomTabNavigator();
export const context = React.createContext();

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState({});
  const [dailyTotalAmounts, setDailyTotalAmounts] = useState('');
  const [pickerItems, setPickerItems] = useState({vegRolls: 'Veg Rolls'});
  const [category, setCategory] = useState('Rolls');
  const [internetAccess, setInternetAccess] = useState(true);
  const paymentMethods = ['Cash', 'UPI'];
  const [user, setUser] = useState();

  const NetInfoListener = () => {
    NetInfo.addEventListener(state => {
      setInternetAccess(state.isConnected);
    });
  };

  // // Handle user state changes
  function userState(User) {
    if (User) setUser(User);
    else setUser();
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    NetInfoListener();
  }, []);

  if (!user) return <LoginPage />;

  return (
    <context.Provider
      value={{
        selectedItems,
        setSelectedItems,
        data,
        setData,
        dailyTotalAmounts,
        pickerItems,
        setPickerItems,
        category,
        setCategory,
        paymentMethods,
        setDailyTotalAmounts,
        user,
        setUser,
      }}>
      {internetAccess ? (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarLabelStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              },
              tabBarIcon: ({color, focused}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Add') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (route.name === 'Amount') {
                  iconName = focused ? 'wallet' : 'wallet-outline';
                } else if (route.name === 'Logout') {
                  iconName = focused ? 'log-out' : 'log-out-outline';
                }
                return <Icon name={iconName} color={color} size={22} />;
              },
            })}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarBadgeStyle: {fontSize: 20},
              }}
            />
            <Tab.Screen
              name="Add"
              component={AddItemsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Amount"
              component={AmountShownScreen}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Logout"
              component={LogoutScreen}
              options={{
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NoInternetAnimation />
      )}
    </context.Provider>
  );
};

export default App;
