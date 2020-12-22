import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from "../utils/Themes"
const { colors, dimensions } = Themes;

const Header = (props) => {
    const { title } = props
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "3rem",
        borderBottomRightRadius: dimensions.borderRadius,
        borderBottomLeftRadius: dimensions.borderRadius
    },
    text: {
        color: "white",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
})

export default Header;
