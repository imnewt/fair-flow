import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TabTitle, ButtonAdd} from '../../components/CustomCoreComponents';
import Loading from '../../screens/Loading';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const BaseContainer = ({
  children,
  isCenter,
  isLoading,
  tabTitle,
  buttonTitle,
  buttonPress,
  stickyButton,
  setVisible,
}) => {
  return (
    <View style={styles.container}>
      {tabTitle && (
        <TabTitle
          title={tabTitle}
          buttonTitle={buttonTitle}
          buttonPress={buttonPress}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          isCenter && {
            flex: 1,
            justifyContent: 'center',
          }
        }>
        {children}
      </ScrollView>
      {isLoading ? <Loading /> : null}
      {stickyButton ? <ButtonAdd setVisible={setVisible} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: dimensions.standardSpacing,
  },
});

export default BaseContainer;
