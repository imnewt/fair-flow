import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Header = (props) => {
    const { title } = props
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#2ea7e0"
    }
})

export default Header;
