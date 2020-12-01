import React, { useState } from "react";
import { Text, View, Dimensions, TextInput } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Divider, Overlay } from 'react-native-elements';

export const LIST_ITEM_HEIGHT = Dimensions.get("window").width / 100 * 61.5;

const TaskExpand = ({ description, progress }) => {
  const [visible, setVisible] = useState(false);
  const [newProgress, setNewProgress] = useState(0);
  const [err, setErr] = useState("");

  const toggleOverlay = () => {
    setVisible(false);
  }

  const updateProgress = () => {

  }

  return (
    <View style={styles.container}>
      <Divider style={styles.divider}/>
      <View style={styles.content}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description} numberOfLines={1}>{description}</Text>
        <View style={styles.progress}>
          <ProgressCircle
            percent={progress}
            radius={40}
            borderWidth={8}
            color="#2ea7e0"
            shadowColor="#C2C1BF"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{progress}%</Text>
          </ProgressCircle>
        </View>
        <Button
            title="details"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() => setVisible(true)}
        />
      </View>
      <Overlay 
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ width: "90%", borderRadius: 10, marginHorizontal: 20 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.title}>Progress</Text>
          <TextInput 
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={newProgress => setNewProgress(newProgress)}
            value={newProgress}
          />
          {
            err ? <Text>Progress must be an integer from 0 to 100!</Text> : null
          }
          <Button
            title="update progress"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={updateProgress}
          />
        </View>
      </Overlay>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderColor: "#F4F4F6",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: LIST_ITEM_HEIGHT,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1
  },
  divider: {
    height: 1,
    marginBottom: "3rem"
  },
  title: {
    fontSize: "4rem",
    color: "#9B9B9B"
  },
  description: {
    marginVertical: "1rem",
    fontSize: "5rem",
    textTransform: "capitalize"
  },
  progress: {
    alignItems: "center",
    marginTop: "4rem"
  },
  input: {
    backgroundColor: "#eee",
    marginTop: "3rem",
    height: "12rem",
    width: "100%",
    padding: "2rem",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
    fontSize: "4rem"
  },
  button: {
    backgroundColor: "#2ea7e0",
    marginTop: "4rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: "3rem"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  overlay: {
    backgroundColor: "#fff",
    margin: "3rem"
  },
  modalText: {
      paddingTop: "3rem",
      fontSize: "5rem",
      fontWeight: "900"
  }
})

export default TaskExpand;