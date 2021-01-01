import React, {useState, useEffect} from 'react';
import {observer, inject} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {
  BaseContainer,
  ButtonStandard,
} from '../components/CustomCoreComponents';
import {UserBadge, SettingOption} from '../components/Settings';
import {useDidMountEffect} from '../utils/CustomHooks';

const Settings = inject('userStore')(
  observer(({userStore, route}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    useEffect(() => {
      setUser(userStore.userData);
    }, []);

    useDidMountEffect(() => {
      const {updated} = route.params;
      updated && setUser(userStore.userData);
    }, [route]);

    const handleLogout = () => {
      navigation.navigate('Login');
      userStore.wipeData();
    };

    return (
      <BaseContainer tabTitle="Settings">
        <UserBadge userName={user.displayName} />
        <SettingOption
          iconName="ios-person"
          iconBackground="#FFD54D"
          title="edit profile"
          routeName="Profile"
        />
        <SettingOption
          iconName="lock-closed"
          iconBackground="#4FC3F7"
          title="change password"
          routeName="Password"
        />
        <SettingOption
          iconName="shield"
          iconBackground="#DCE775"
          title="privacy policy"
          routeName="Policy"
        />
        <SettingOption
          iconName="shapes"
          iconBackground="#FF8B65"
          title="support"
          routeName="Support"
        />
        <SettingOption
          iconName="business"
          iconBackground="#7986CB"
          title="about us"
          routeName="About"
        />
        <ButtonStandard title="log out" onButtonPress={handleLogout} />
      </BaseContainer>
    );
  }),
);

export default Settings;
