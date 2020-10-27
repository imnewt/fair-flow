import React, { useState } from "react"
import { View, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from 'react-native-extended-stylesheet';
import { Input, Button, Divider } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons"

import Logo from "../assets/images/logo.jpg";

const Register = props => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <Input
                placeholder="Username"
                placeholderTextColor="#3F4350"
                leftIcon={ <Ionicons name="ios-person" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={username => setUsername(username)}
                value={username}
            />
            <Input
                placeholder="Phone number"
                placeholderTextColor="#3F4350"
                leftIcon={ <Ionicons name="ios-phone-portrait-sharp" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={phone => setPhone(phone)}
                value={phone}
            />
            <Input
                placeholder="Password"
                placeholderTextColor="#3F4350"
                secureTextEntry
                leftIcon={ <Ionicons name="ios-lock-closed" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button
                title="Sign up"
                titleStyle={styles.title}
                buttonStyle={[styles.button, { backgroundColor: "#2ea7e0" }]}
                onPress={() => navigation.navigate("Main")}
            />
            <View style={styles.divider}>
                <Divider style={{width:"43%",height:0.8}}/>
                <Text style={styles.dividerText}>or</Text>
                <Divider style={{width:"43%",height:0.8}}/>
            </View>
            <Button
                title="Log in"
                type="outline"
                titleStyle={styles.title}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: "5rem"
    },
    logo: {
        // marginTop: "7rem",
        alignSelf: "center",
        width: "100%"
    },
    input: {
        marginLeft: "2rem",
        fontSize: "4rem",
        fontWeight: "500"
    },
    title: {
        fontSize: "4rem"
    },
    button: {
        marginTop: "3rem",
        borderWidth: "0.3rem",
        borderColor: "#2ea7e0",
        paddingVertical: "3.5rem",
        borderRadius: 10
    },
    divider: {
        marginTop: "3rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    dividerText: {
        marginHorizontal: "4rem",
        fontSize: "4rem"
    }
})

export default Register;