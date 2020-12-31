import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {Button, Overlay} from 'react-native-elements';
import {DateTime} from 'luxon';
import {
  InputStandard,
  ButtonStandard,
  ErrorMessage,
} from '../CustomCoreComponents';
import Themes from '../../utils/Themes';
const {colors, dimensions, datetime} = Themes;

const FormCreateTask = ({visible, setVisible, roomId, memberList}) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [handle, setHandle] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDateText(DateTime.fromJSDate(new Date()).toFormat(datetime.DATE_FORMAT));
    memberList.length > 0 && setHandle(memberList[0].id);
  }, [memberList]);

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
    setDateText(
      DateTime.fromJSDate(selectedDate).toFormat(datetime.DATE_FORMAT),
    );
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
        <InputStandard
          label="task name"
          placeholder="Enter task name here..."
          elevation={10}
          text={taskName}
          setText={setTaskName}
        />
        <InputStandard
          label="description"
          placeholder="Enter task description here..."
          elevation={10}
          text={description}
          setText={setDescription}
          isMultiline
        />
        <Text style={styles.modalText}>Handle:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={handle}
            onValueChange={(itemValue) => setHandle(itemValue)}>
            {memberList.map((item) => (
              <Picker.Item
                label={item.displayName}
                value={item.id}
                key={item.id}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.modalText}>Deadline:</Text>
        <View style={styles.date}>
          <Text style={styles.dateText}>{dateText}</Text>
          <Button
            title="Pick a date"
            type="outline"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => setShow(true)}
          />
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
        {errMessage ? <ErrorMessage message={errMessage} /> : null}
        <ButtonStandard title="create" onButtonPress={createTask} />
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
    marginVertical: '1.5rem',
    marginLeft: '4rem',
    color: 'black',
    fontSize: '4.5rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  date: {
    marginLeft: '3rem',
    marginBottom: '2rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: '4rem',
  },
  buttonTitle: {
    fontSize: '3.5rem',
  },
  button: {
    marginLeft: '3rem',
    borderWidth: '0.3rem',
    paddingVertical: '0.5rem',
    borderColor: colors.primary,
    borderRadius: dimensions.borderRadius,
  },
  picker: {
    marginHorizontal: '1rem',
    marginBottom: '3rem',
    borderRadius: dimensions.borderRadius,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: dimensions.elevation8,
  },
});

export default FormCreateTask;
