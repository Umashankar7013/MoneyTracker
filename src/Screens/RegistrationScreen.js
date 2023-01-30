import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {EpicFloatingInput} from 'epic-floating-input-react-native';
import {LoginPage} from './LoginPage';

export const RegistrationScreen = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nameValidate, setNameValidate] = useState('');
  const [emailValidate, setEmailValidate] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [loginPageFlag, setLoginPageFlag] = useState(false);

  const passwordChangeHandler = text => {
    if (text.length === 0) {
      setPasswordValidate('');
    } else {
      setPassword('');
      if (text.length > 7 && text.length < 12) {
        setPassword(text);
        setPasswordValidate('');
      } else {
        setPasswordValidate('Password must contain 8 characters/numbers');
      }
    }
  };

  const emailChangeHandler = text => {
    if (text.length === 0) {
      setEmailValidate('');
    } else {
      setMail('');
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === true) {
        setMail(text);
        setEmailValidate('');
      } else {
        setEmailValidate('Email is not valid');
      }
    }
  };

  const nameChangeHandler = text => {
    if (text.length === 0) {
      setNameValidate('');
    } else {
      setName('');
      if (text.length > 2 && text.length <= 20) {
        setName(text);
        setNameValidate('');
      } else {
        setNameValidate(
          'Name should be of greater than 3 letters and less than 10 letters',
        );
      }
    }
  };

  const register = () => {
    if (name.length !== 0 && mail.length !== 0 && password.length !== 0) {
      auth()
        .createUserWithEmailAndPassword(mail, password, name)

        .then(
          Alert.alert('Account Created Succesfully'),
          console.log('User account created & signed in!'),
          setLoginPageFlag(true),
        )
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email is already in use');
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
            console.log('That email address is invalid!');
          }
        });
    } else {
      Alert.alert('Warning..!', 'Please enter your details properly');
    }
  };

  if (loginPageFlag) return <LoginPage />;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.headerName}>Register Here</Text>
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <EpicFloatingInput
          placeholder="Enter your Name"
          onChangeText={text => nameChangeHandler(text.trim())}
        />
        <View
          style={{
            flex: 0.02,
          }}>
          <Text style={styles.nameValidateText}>{nameValidate}</Text>
        </View>
        <EpicFloatingInput
          placeholder="Enter your Email Address"
          onChangeText={text => emailChangeHandler(text.trim())}
        />
        <View
          style={{
            flex: 0.02,
          }}>
          <Text style={styles.nameValidateText}>{emailValidate}</Text>
        </View>
        <EpicFloatingInput
          placeholder="choose your Password"
          onChangeText={text => passwordChangeHandler(text.trim())}
        />
        <View
          style={{
            flex: 0.02,
          }}>
          <Text style={styles.nameValidateText}>{passwordValidate}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.loginTextView}>
          <TouchableOpacity
            onPress={() => {
              register();
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
    marginTop: 10,
  },
  headerName: {
    fontSize: 32,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
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
  nameValidateText: {
    fontSize: 12,
    color: 'red',
  },
});
