import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {observer, inject} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {
  BaseContainer,
  InputStandard,
  ButtonStandard,
  Alert,
  ErrorMessage,
} from '../components/CustomCoreComponents';
import Loading from './Loading';

const Password = inject('userStore')(
  observer(({userStore}) => {
    const navigation = useNavigation();
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);

    const reauthenticate = () => {
      const {userData} = userStore;
      var user = auth().currentUser;
      var cred = auth.EmailAuthProvider.credential(userData.email, pass);
      return user.reauthenticateWithCredential(cred);
    };

    const updatePassword = () => {
      reauthenticate(pass)
        .then(() => {
          var user = auth().currentUser;
          user.updatePassword(newPass).then(() => setVisiblePassword(true));
        })
        .catch(() => {
          setIsLoading(false);
          setErrMessage('Current password is incorrect!');
        });
    };

    const changePassword = () => {
      setIsLoading(true);
      if (!pass || !newPass || !conPass) {
        setErrMessage('Fields can not be blank!');
        setIsLoading(false);
        return;
      }
      if (conPass !== newPass) {
        setErrMessage('Passwords do not match!');
        setIsLoading(false);
        return;
      }
      updatePassword();
    };

    const toggleOverlay = () => {
      setVisiblePassword(false);
      navigation.navigate('Settings', {updated: true});
    };

    return (
      <BaseContainer tabTitle="Change Password" isCenter>
        <InputStandard
          label="current password"
          text={pass}
          setText={setPass}
          isPassword
        />
        <InputStandard
          label="new password"
          text={newPass}
          setText={setNewPass}
          isPassword
        />
        <InputStandard
          label="confirm password"
          text={conPass}
          setText={setConPass}
          isPassword
        />
        <ErrorMessage message={errMessage} />
        <ButtonStandard title="save" onButtonPress={changePassword} />
        <Loading isVisible={isLoading} />
        <Alert
          visible={visiblePassword}
          toggleOverlay={toggleOverlay}
          content="Your password has been changed"
        />
      </BaseContainer>
    );
  }),
);

export default Password;
