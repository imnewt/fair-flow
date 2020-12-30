import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';
import {
  BaseContainer,
  Logo,
  InputWithIcon,
  ButtonGroup,
} from '../components/CustomCoreComponents';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errName, setErrName] = useState('');
  const [errPass, setErrPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createUser = () => {
    setErrEmail('');
    setErrName('');
    setErrPass('');
    if (!email) {
      setErrEmail('This field can not be blank!');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrEmail('Your email address is invalid!');
    }
    if (!displayName) {
      setErrName('This field can not be blank!');
    }
    if (!password) {
      setErrPass('This field can not be blank!');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users')
            .add({
              email: email,
              displayName: displayName,
              password: password,
            })
            .then(() => {
              navigation.navigate('Login');
              setIsLoading(false);
              setErrEmail('');
              setErrName('');
              setErrPass('');
            });
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            setErrEmail('That email address is already in use!');
          }
          if (error.code === 'auth/weak-password') {
            setErrPass('Weak password!');
          }
        });
    }
  };

  return (
    <BaseContainer isCenter>
      <Logo />
      <InputWithIcon
        placeholder="Email"
        iconName="ios-person"
        text={email}
        setText={setEmail}
        errMessage={errEmail}
      />
      <InputWithIcon
        placeholder="Display name"
        iconName="ios-phone-portrait-sharp"
        text={displayName}
        setText={setDisplayName}
        errMessage={errName}
      />
      <InputWithIcon
        placeholder="Password"
        isPassword={true}
        iconName="ios-lock-closed"
        text={password}
        setText={setPassword}
        errMessage={errPass}
      />
      <ButtonGroup
        buttonTitle1="Sign up"
        buttonTitle2="Login"
        buttonPress1={createUser}
        buttonPress2={() => navigation.navigate('Login')}
      />
      <Loading isVisible={isLoading} />
    </BaseContainer>
  );
};

export default Register;
