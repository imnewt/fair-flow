import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {observer, inject} from 'mobx-react';
import {
  BaseContainer,
  Logo,
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
        setIsLoading(true);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate('Main');
            const user = users.find((user) => user.email === email);
            userStore.saveUserData(user);
            setIsLoading(false);
            setErrEmail('');
            setErrPass('');
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.code === 'auth/user-not-found') {
              setErrEmail('User not found!');
            }
            if (error.code === 'auth/wrong-password') {
              setErrPass('Wrong password!');
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
        <Loading isVisible={isLoading} />
      </BaseContainer>
    );
  }),
);

export default Login;
