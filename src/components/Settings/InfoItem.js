import React from 'react';
import {View, Text, FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const InfoItem = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{data.heading}</Text>
      {data.content && <Text style={styles.content}>{data.content}</Text>}
      {data.values && (
        <FlatList
          data={data.values}
          renderItem={({item}) => (
            <Text style={[styles.content, {fontStyle: 'italic'}]}>
              {item.title}: <Text style={styles.content}>{item.content}</Text>
            </Text>
          )}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: '4rem',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '5.2rem',
    fontStyle: 'italic',
  },
  content: {
    marginTop: '1.5rem',
    fontSize: '4.2rem',
    // fontStyle: 'normal',
    textAlign: 'justify',
  },
  value: {
    marginTop: '1.5rem',
    fontSize: '4.2rem',
  },
});

export default InfoItem;
