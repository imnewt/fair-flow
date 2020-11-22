import React from "react";
import { Text, View, Dimensions } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Divider} from 'react-native-elements';

export const LIST_ITEM_HEIGHT = Dimensions.get("window").width / 100 * 61.5;

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
    marginTop: "1rem",
    fontSize: "5rem",
    textTransform: "capitalize"
  },
  progress: {
    alignItems: "center",
    marginTop: "4rem"
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
  }
});

const TaskExpand = ({ description, progress }) => {
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
            // onPress={handleLogin}
        />
      </View>
    </View>
  )
}

export default TaskExpand;