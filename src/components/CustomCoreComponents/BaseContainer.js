import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ButtonAdd} from '../../components/CustomCoreComponents';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const BaseContainer = ({children, isCenter, stickyButton, setVisible}) => {
  return (
    <View style={styles.container}>
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
      {stickyButton ? <ButtonAdd setVisible={setVisible} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: dimensions.standardSpacing,
  },
});

export default BaseContainer;
