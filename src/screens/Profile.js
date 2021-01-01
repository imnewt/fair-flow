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
import Loading from './Loading';

const Profile = inject('userStore')(
  observer(({userStore}) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);

    useEffect(() => {
      const {userData} = userStore;
      const {email, displayName, phoneNumber, address} = userData;
      setEmail(email);
      setName(displayName);
      phoneNumber && setPhone(phoneNumber);
      address && setAddress(address);
    }, []);

    const updateProfile = () => {
      setIsLoading(true);
      const {userData} = userStore;
      if (!name || !phone || !address) {
        setErrMessage('Fields can not be blank!');
        setIsLoading(false);
        return;
      }
      if (phone.length !== 10) {
        setErrMessage('Phone number must have 10 digits!');
        setIsLoading(false);
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
          setIsLoading(false);
          setVisibleProfile(true);
          setErrMessage('');
          userStore.updateUserData(name, phone, address);
        });
    };

    const toggleOverlay = () => {
      setVisibleProfile(false);
      navigation.navigate('Settings', {updated: true});
    };

    return (
      <BaseContainer tabTitle="Edit Profile" isCenter>
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
        <Loading isVisible={isLoading} />
        <Alert
          visible={visibleProfile}
          toggleOverlay={toggleOverlay}
          content="Your profile has been updated"
        />
      </BaseContainer>
    );
  }),
);

export default Profile;
