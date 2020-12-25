import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import {Button, Overlay} from 'react-native-elements';
import {observer, inject} from 'mobx-react';
import {DateTime} from 'luxon';

import {TaskItemInRoom} from '../components/Room';
import Header from '../components/Header';
import Themes from '../utils/Themes';
const {colors, dimensions} = Themes;
// import {} from "../utils/Themes"
const RoomDetail = inject('userStore')(
  observer((props) => {
    const {room} = props.route.params;
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [handle, setHandle] = useState('');
    const [errMessage, setErrMessage] = useState('');
    // const [errDescription, setErrDescription] = useState('');

    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState('');

    const [show, setShow] = useState(false);

    useEffect(() => {
      setDateText(DateTime.fromJSDate(new Date()).toFormat(DATE_FORMAT));
      const getTasks = firestore()
        .collection('tasks')
        .onSnapshot((querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((documentSnapshot) => {
            tasks.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          if (room.taskIds) {
            const filteredTasks = tasks.filter((task) =>
              room.taskIds.includes(task.id),
            );
            setTasks(filteredTasks);
          }
        });
      const getMembers = firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const members = [];
          querySnapshot.forEach((documentSnapshot) => {
            members.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          if (room.memberIds) {
            const filteredMembers = members.filter((member) =>
              room.memberIds.includes(member.id),
            );
            setMembers(filteredMembers);
            filteredMembers.length > 0 && setHandle(filteredMembers[0].id);
          }
        });
      return () => {
        getTasks();
        getMembers();
      };
    }, []);

    const createTask = () => {
      setErrMessage('');
      if (!taskName) {
        setErrMessage('This field can not be blank!');
      } else {
        console.log('name:', taskName);
        console.log('descriptiom:', description);
        console.log('deadline:', dateText);
        console.log('roomId:', room.id);
        console.log('underTakerId:', handle);
        firestore()
          .collection('tasks')
          .add({
            name: taskName,
            description,
            progress: 0,
            deadline: dateText,
            roomId: room.id,
            underTakerId: handle,
          })
          .then(() => setVisible(false));
      }
    };
    const DATE_FORMAT = 'dd/MM/yyyy';

    const handleChangeDate = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDateText(DateTime.fromJSDate(selectedDate).toFormat(DATE_FORMAT));
    };

    return (
      <View style={styles.container}>
        <Header title={room.name} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Current tasks:</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={tasks}
            renderItem={({item}) => (
              <TaskItemInRoom
                name={item.name}
                progress={item.progress}
                underTakerId={item.underTakerId}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.title}>Members:</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={members}
            renderItem={({item}) => (
              <Text style={styles.text}>{item.displayName}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
        <Overlay
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          overlayStyle={{
            width: '90%',
            borderRadius: dimensions.borderRadius,
          }}>
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Create new task</Text>
            <Text style={styles.modalText}>Task name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(taskName) => setTaskName(taskName)}
              value={taskName}
              placeholder="Enter task name here..."
            />
            <Text style={styles.modalText}>Description:</Text>
            <TextInput
              style={[styles.input, styles.description]}
              onChangeText={(description) => setDescription(description)}
              value={description}
              multiline={true}
              placeholder="Enter task description here..."
            />
            <Text style={styles.modalText}>Deadline:</Text>
            <View style={styles.date}>
              <Text style={styles.dateText}>{dateText}</Text>
              <Button
                title="Pick a date"
                type="outline"
                titleStyle={styles.dateButtonTitle}
                buttonStyle={styles.dateButton}
                onPress={() => setShow(true)}
              />
            </View>
            <Text style={styles.modalText}>Handle:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={handle}
                onValueChange={(itemValue, itemIndex) => setHandle(itemValue)}>
                {members.map((item) => (
                  <Picker.Item
                    label={item.displayName}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>
            {show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                minimumDate={new Date()}
                //   is24Hour={true}
                display="default"
                onChange={handleChangeDate}
              />
            ) : null}

            {errMessage ? <Text style={styles.error}>{errMessage}</Text> : null}
            <Button
              title="Create"
              titleStyle={styles.overlayButtonText}
              buttonStyle={styles.overlayButton}
              onPress={createTask}
            />
          </View>
        </Overlay>
      </View>
    );
  }),
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: dimensions.standardSpacing,
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '6rem',
    marginTop: dimensions.standardSpacing,
  },
  text: {
    fontSize: '4rem',
  },
  button: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: '4rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  overlay: {
    backgroundColor: 'white',
    padding: '2rem',
    // width: "90%"
  },
  overlayTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  modalText: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginTop: '3rem',
    marginBottom: '2rem',
  },
  input: {
    backgroundColor: '#eee',

    height: '12rem',
    width: '100%',
    padding: '2rem',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    fontSize: '4rem',
  },
  description: {
    height: '24rem',
    // padding: 0,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: '3rem',
  },
  dateText: {
    fontSize: '4rem',
  },
  dateButtonTitle: {
    fontSize: '3.5rem',
  },
  dateButton: {
    marginLeft: '3rem',
    borderWidth: '0.3rem',
    borderColor: '#2ea7e0',
    paddingVertical: '0.5rem',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: '#eee',
  },
  overlayButton: {
    backgroundColor: '#2ea7e0',
    marginTop: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3rem',
  },
  overlayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4rem',
  },
});

export default RoomDetail;
