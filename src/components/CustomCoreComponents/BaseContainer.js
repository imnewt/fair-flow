import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const BaseContainer = ({children, isCenter}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: isCenter && 'center',
        }}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: dimensions.standardSpacing,
  },
});

export default BaseContainer;
