import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {
  BaseContainer,
  Logo,
  Alert,
  InputWithIcon,
  ButtonGroup,
} from '../components/CustomCoreComponents';

const Login = inject('userStore')(
  observer((props) => {
    const navigation = useNavigation();
    const {userStore} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPass, setErrPass] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {});

    const toggleOverlay = () => {
      navigation.navigate('Main');
      setVisible(false);
      setEmail('');
      setPassword('');
    };

    const handleLogin = async () => {
      setErrEmail('');
      setErrPass('');
      if (!email) {
        setErrEmail('This field can not be blank!');
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrEmail('Your email address is invalid!');
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
                id: documentSnapshot.id,
              });
            });
            const findUser = users.find((user) => user.email === email);
            if (findUser) {
              if (password === findUser.password) {
                setVisible(true);
                userStore.saveUserData(findUser);
              } else {
                setErrPass('Wrong password!');
              }
            } else {
              setErrEmail('User not found!');
            }
          });
      }
    };

    return (
      <BaseContainer isCenter>
        <Logo />
        <InputWithIcon
          placeholder="Username"
          iconName="ios-person"
          text={email}
          setText={setEmail}
          errMessage={errEmail}
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
          buttonTitle1="Log in"
          buttonTitle2="Sign up"
          buttonPress1={handleLogin}
          buttonPress2={() => navigation.navigate('Register')}
        />
        <Alert
          visible={visible}
          toggleOverlay={toggleOverlay}
          content="Login Success!"
        />
      </BaseContainer>
    );
  }),
);

export default Login;
