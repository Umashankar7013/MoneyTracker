import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AddItemsScreen} from './src/screens/AddItemsScreen';
import {AmountShownScreen} from './src/screens/AmountShownScreen';
import {Home} from './src/screens/Home';
import NetInfo from '@react-native-community/netinfo';
import {NoInternetAnimation} from './src/components/NoInternetAnimation';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {LoginPage} from './src/screens/LoginPage';
import {LogoutScreen} from './src/screens/LogoutScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {userDetails} from './src/redux/userSlice';

const Tab = createBottomTabNavigator();
export const context = React.createContext();

const App = () => {
  const [internetAccess, setInternetAccess] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);

  const NetInfoListener = () => {
    NetInfo.addEventListener(state => {
      setInternetAccess(state.isConnected);
    });
  };

  // Handle user state changes
  function userState(User) {
    if (User) dispatch(userDetails(User));
    else dispatch(userDetails(null));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    NetInfoListener();
  }, []);

  if (!user) return <LoginPage />;

  return internetAccess ? (
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
            }
            // else if (route.name === 'Statistics') {
            //   iconName = focused
            //     ? 'stats-chart-sharp'
            //     : 'stats-chart-outline';
            // }
            else if (route.name === 'Logout') {
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
        {/* <Tab.Screen
              name="Statistics"
              component={StatisticsScreen}
              options={{
                headerShown: false,
              }}
            /> */}
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
  );
};

export default App;
