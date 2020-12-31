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
            <Text style={styles.values}>
              - {item.title}:{' '}
              <Text style={{fontStyle: 'normal'}}>{item.content}</Text>
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
    fontSize: '5.5rem',
  },
  content: {
    marginTop: '1.5rem',
    fontSize: '4.5rem',
    textAlign: 'justify',
  },
  values: {
    marginTop: '1.5rem',
    fontSize: '4.5rem',
    fontStyle: 'italic',
  },
});

export default InfoItem;
