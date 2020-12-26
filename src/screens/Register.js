import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
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
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    navigation.navigate('Login');
    setVisible(false);
    setEmail('');
    setDisplayName('');
    setPassword('');
  };

  const createUser = async () => {
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
      const subcriber = await firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const users = [];

          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const findUser = users.find((user) => user.email === email);
          if (findUser) {
            setErrEmail('Email has been used for another account!');
          } else {
            firestore()
              .collection('users')
              .add({
                email: email,
                displayName: displayName,
                password: password,
              })
              .then(() => {
                setVisible(true);
                setErrEmail('');
                setErrName('');
                setErrPass('');
              });
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
      <Alert
        visible={visible}
        toggleOverlay={toggleOverlay}
        content="User Created!"
      />
    </BaseContainer>
  );
};

export default Register;
