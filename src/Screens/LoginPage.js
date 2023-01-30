import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {EpicFloatingInput} from 'epic-floating-input-react-native';
import {RegistrationScreen} from './RegistrationScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export const LoginPage = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showTick, setShowTick] = useState(false);

  const [showRegistrationScreen, setShowRegistrationScreen] = useState(false);

  const showTickHandler = () => {
    showTick ? setShowTick(false) : setShowTick(true);
  };

  const forgotPasswordHandler = () => {
    if (mail.length > 0) {
      console.log('reset email sent to ' + mail);
      auth()
        .sendPasswordResetEmail(mail)
        .then(() => {
          alert('reset email sent to ' + mail);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('Warning..!', 'Please enter your email');
    }
  };

  const login = () => {
    if (mail.length > 0 && password.length > 0) {
      const userLogin = auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {
          console.log('signed in succesfully');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            Alert.alert(
              'Warning',
              'You do not have a account.please regiseter with your details.',
            );
            console.log('User not found');
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Warning', 'Invalid UserName or Password');
          }
          console.log(error);
        });
    } else {
      Alert.alert('Warning', 'Please enter email and password');
    }
  };

  if (showRegistrationScreen) return <RegistrationScreen />;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          flex: 0.05,
          justifyContent: 'flex-end',
        }}>
        <EpicFloatingInput
          placeholder="Email"
          onChangeText={text => setMail(text)}
        />
      </View>
      <View
        style={{
          flex: 0.05,
          justifyContent: 'center',
        }}>
        <EpicFloatingInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showTick}
        />
      </View>
      <View
        style={{
          flex: 0.01,
          flexDirection: 'row',
          marginTop: 5,
        }}>
        <TouchableOpacity onPress={() => showTickHandler()}>
          <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
              marginTop: -10,
              marginLeft: 5,
            }}>
            {showTick && (
              <View>
                <Icon name="checkmark" size={18} color="black" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 8, marginTop: -10}}>
          <Text style={{color: 'black'}}>Show Password</Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity onPress={() => forgotPasswordHandler()}>
          <Text style={styles.forgotPasswordText}>forgot password..?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.loginTextView}>
          <TouchableOpacity
            onPress={() => {
              login();
            }}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginTextView}>
          <TouchableOpacity
            onPress={() => {
              setShowRegistrationScreen(true);
            }}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInputBlock: {
    width: 350,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 3,
  },
  headerName: {
    fontSize: 55,
    fontWeight: '600',
    color: 'black',
    marginLeft: 75,
    marginTop: -65,
  },
  logoutButtonView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutButton: {
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  loginTextView: {
    borderWidth: 2,
    width: 150,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'blue',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: 'paleturquoise',
  },
  header: {
    fontSize: 30,
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  headerView: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 45,
  },
  imageView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  buttonView: {
    flex: 1,
    width: 200,
    alignSelf: 'center',
  },
  button1: {
    textAlign: 'center',
    padding: 10,
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 40,
  },
  button2: {
    textAlign: 'center',
    padding: 10,
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
});
