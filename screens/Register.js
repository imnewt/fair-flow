import React, { useState } from "react"
import { View, ScrollView, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from 'react-native-extended-stylesheet';
import { Input, Button, Divider, Overlay } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons"
import Logo from "../assets/images/logo.jpg";
import firestore from '@react-native-firebase/firestore';

const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errName, setErrName] = useState("");
    const [errPass, setErrPass] = useState("");
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleOverlay = () => {
        navigation.navigate("Main")
        setVisible(false);
        setEmail("");
        setDisplayName("");
        setPassword("");
    };

    const createUser = async () => {
        setErrEmail("");
        setErrName("");
        setErrPass("");
        if (!email) {
            setErrEmail("This field can not be blank!");
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            setErrEmail("Your email address is invalid!");
        }
        if (!displayName) {
            setErrName("This field can not be blank!");
        }
        if (!password) {
            setErrPass("This field can not be blank!");
        }
        else {
            const subcriber = await firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const users = [];
        
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
                });
                setUsers(users);
            });
            const findUser = users.find(user => user.email === email);
            if (findUser) {
                setErrEmail("Email has been used for another account!");
            }
            else {
                firestore()
                .collection('users')
                .add({
                    email: email,
                    displayName: displayName,
                    password: password,
                })
                .then(() => setVisible(true))
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <Input
                placeholder="Email"
                placeholderTextColor="#3F4350"
                leftIcon={ <Ionicons name="ios-person" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={email => setEmail(email)}
                value={email}
                errorMessage={errEmail}
            />
            <Input
                placeholder="Display name"
                placeholderTextColor="#3F4350"
                leftIcon={ <Ionicons name="ios-phone-portrait-sharp" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={displayName => setDisplayName(displayName)}
                value={displayName}
                errorMessage={errName}
            />
            <Input
                placeholder="Password"
                placeholderTextColor="#3F4350"
                secureTextEntry
                leftIcon={ <Ionicons name="ios-lock-closed" size={25} color="#3F4350" /> }
                inputStyle={styles.input}
                onChangeText={password => setPassword(password)}
                value={password}
                errorMessage={errPass}
            />
            <Button
                title="Sign up"
                titleStyle={styles.title}
                buttonStyle={[styles.button, { backgroundColor: "#2ea7e0" }]}
                onPress={createUser}
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
            <Overlay 
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ borderRadius: 20 }}
            >
                <View style={styles.overlay}>
                    <Ionicons name="ios-checkmark-circle-outline" size={80} color="#109648"/>
                    <Text style={styles.modalText}>User Created!</Text>
                </View>
            </Overlay>
        </ScrollView>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 16
    },
    logo: {
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
        marginVertical: "3rem",
        borderWidth: "0.3rem",
        borderColor: "#2ea7e0",
        paddingVertical: "3.5rem",
        borderRadius: 10
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    dividerText: {
        marginHorizontal: "4rem",
        fontSize: "4rem"
    },
    overlay: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: "8rem",
        paddingHorizontal: "15rem",
        borderRadius: 120
    },
    modalText: {
        paddingTop: "3rem",
        fontSize: "5rem",
        fontWeight: "900"
    }
})

export default Register;