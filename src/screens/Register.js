import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';
import {
  BaseContainer,
  Logo,
  Alert,
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
  const [visible, setVisible] = useState(false);

  const createUser = () => {
    setIsLoading(true);
    setErrEmail('');
    setErrName('');
    setErrPass('');
    if (!email) {
      setIsLoading(false);
      setErrEmail('This field can not be blank!');
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setIsLoading(false);
      setErrEmail('Your email address is invalid!');
      return;
    }
    if (!displayName) {
      setIsLoading(false);
      setErrName('This field can not be blank!');
      return;
    }
    if (!password) {
      setIsLoading(false);
      setErrPass('This field can not be blank!');
      return;
    }
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
            setVisible(true);
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
  };

  const toogleOverlay = () => {
    setVisible(false);
    navigation.navigate('Login');
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
      <Alert
        visible={visible}
        toggleOverlay={toogleOverlay}
        content="Your account has been successfully created"
      />
    </BaseContainer>
  );
};

export default Register;
