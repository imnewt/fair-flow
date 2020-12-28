import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {
  BaseContainer,
  InputStandard,
  ButtonStandard,
  Alert,
  ErrorMessage,
} from '../components/CustomCoreComponents';

const Profile = inject('userStore')(
  observer(({userStore}) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const {userData} = userStore;
      const {email, displayName, phoneNumber, address} = userData;
      setEmail(email);
      setName(displayName);
      phoneNumber && setPhone(phoneNumber);
      address && setAddress(address);
    }, []);

    const updateProfile = () => {
      const {userData} = userStore;
      if (!name || !phone || !address) {
        setErrMessage('Fields can not be blank!');
        return;
      }
      if (phone.length !== 10) {
        setErrMessage('Phone number must have 10 digits!');
        return;
      }
      firestore()
        .collection('users')
        .doc(userData.id)
        .update({
          displayName: name,
          phoneNumber: phone,
          address: address,
        })
        .then(() => {
          userStore.updateUserData(name, phone, address);
          setVisible(true);
          setErrMessage('');
        });
    };

    const toggleOverlay = () => {
      navigation.navigate('Settings');
      setVisible(false);
    };

    return (
      <BaseContainer tabTitle="edit profile" isCenter>
        <InputStandard label="email" text={email} setText={setEmail} disabled />
        <InputStandard label="display name" text={name} setText={setName} />
        <InputStandard
          label="phone number"
          text={phone}
          setText={setPhone}
          isNumber
        />
        <InputStandard label="address" text={address} setText={setAddress} />
        <ErrorMessage message={errMessage} />
        <ButtonStandard title="save" onButtonPress={updateProfile} />
        <Alert
          visible={visible}
          toggleOverlay={toggleOverlay}
          content="profile updated"
        />
      </BaseContainer>
    );
  }),
);

export default Profile;
