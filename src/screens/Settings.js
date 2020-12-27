import React, {useState, useEffect} from 'react';
import {observer, inject} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {
  BaseContainer,
  TabTitle,
  ButtonStandard,
} from '../components/CustomCoreComponents';
import {UserBadge, SettingOption} from '../components/Settings';

const Settings = inject('userStore')(
  observer((props) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const {userStore} = props;

    useEffect(() => {
      setUser(userStore.userData);
    }, []);

    const handleLogout = () => {
      navigation.navigate('Login');
      userStore.wipeData();
    };

    return (
      <BaseContainer>
        <TabTitle title="settings" />
        <UserBadge userName={user.displayName} />
        <SettingOption
          iconName="ios-person"
          iconBackground="#ffd54d"
          title="edit profile"
        />
        <SettingOption
          iconName="lock-closed"
          iconBackground="#4fc3f7"
          title="change password"
        />
        <SettingOption
          iconName="shield"
          iconBackground="#dce775"
          title="privacy policy"
        />
        <SettingOption
          iconName="shapes"
          iconBackground="#ff8b65"
          title="support"
        />
        <SettingOption
          iconName="business"
          iconBackground="#7986cb"
          title="about us"
        />
        <ButtonStandard title="log out" onButtonPress={handleLogout} />
      </BaseContainer>
    );
  }),
);

export default Settings;
