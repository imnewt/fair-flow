import React, {useState, useEffect} from 'react';
import {Text, View, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {Button, Overlay} from 'react-native-elements';
import {DateTime} from 'luxon';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;
const DATE_FORMAT = 'dd/MM/yyyy';

const FormCreateTask = ({visible, setVisible, roomId, memberList}) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [handle, setHandle] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDateText(DateTime.fromJSDate(new Date()).toFormat(DATE_FORMAT));
    memberList.length > 0 && setHandle(memberList[0].id);
  });

  const createTask = () => {
    setErrMessage('');
    if (!taskName) {
      setErrMessage('Task name can not be blank!');
      return;
    }
    if (memberList.length === 0) {
      setErrMessage('You have no members in this room!');
      return;
    }
    firestore()
      .collection('tasks')
      .add({
        name: taskName,
        description,
        progress: 0,
        deadline: dateText,
        roomId: roomId,
        underTakerId: handle,
      })
      .then(() => setVisible(false));
  };

  const handleChangeDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDateText(DateTime.fromJSDate(selectedDate).toFormat(DATE_FORMAT));
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={{
        width: '92%',
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
            {memberList.map((item) => (
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
  );
};

const styles = EStyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    padding: '2rem',
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
    backgroundColor: colors.inputBackground,
    height: '12rem',
    width: '100%',
    padding: '2rem',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    fontSize: '4rem',
  },
  description: {
    height: '24rem',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: colors.primary,
    paddingVertical: '0.5rem',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: colors.inputBackground,
  },
  overlayButton: {
    backgroundColor: colors.primary,
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
    color: colors.error,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4rem',
  },
});

export default FormCreateTask;
