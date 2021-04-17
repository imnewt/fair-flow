import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {observer, inject} from 'mobx-react';
import {
  BaseContainer,
  Logo,
  Alert,
  InputWithIcon,
  ButtonGroup,
} from '../components/CustomCoreComponents';
import Loading from './Loading';

const Login = inject('userStore')(
  observer(({userStore}) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPass, setErrPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const subcriber = firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setUsers(users);
        });
      return () => subcriber();
    }, []);

    const handleLogin = async () => {
      setIsLoading(true);
      setErrEmail('');
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
      if (!password) {
        setIsLoading(false);
        setErrPass('This field can not be blank!');
        return;
      }
      auth()
        .signInWithEmailAndPassword(email.toLowerCase(), password)
        .then(() => {
          setIsLoading(false);
          setVisible(true);
          const user = users.find((user) => user.email === email);
          userStore.saveUserData(user);
          setIsLoading(false);
          setErrEmail('');
          setErrPass('');
        })
        .catch((error) => {
          console.log('catfch');
          setIsLoading(false);
          if (error.code === 'auth/user-not-found') {
            setErrEmail('User not found!');
          }
          if (error.code === 'auth/wrong-password') {
            setErrPass('Wrong password!');
          }
        });
    };

    const toggleOverlay = () => {
      navigation.navigate('Main');
      setVisible(false);
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
        <Loading isVisible={isLoading} />
        <Alert
          visible={visible}
          toggleOverlay={toggleOverlay}
          content="You successfully log in to Fair Flow"
        />
      </BaseContainer>
    );
  }),
);

export default Login;
