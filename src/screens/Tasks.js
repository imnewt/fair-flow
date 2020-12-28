import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text} from 'react-native';
import {observer, inject} from 'mobx-react';
import {BaseContainer, TabTitle} from '../components/CustomCoreComponents';
import {Task} from '../components/Task';
import Themes from '../utils/Themes';
const {dimensions} = Themes;

const Tasks = inject('userStore')(
  observer((props) => {
    const [tasks, setTasks] = useState([]);
    const {userStore} = props;

    useEffect(() => {
      const subscriber = firestore()
        .collection('tasks')
        .onSnapshot((querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((documentSnapshot) => {
            tasks.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          const filteredTasks = tasks.filter(
            (task) => task.underTakerId === userStore.userData.id,
          );
          setTasks(filteredTasks);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

    return (
      <BaseContainer tabTitle="Tasks">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={({item}) => <Task task={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: dimensions.standardSpacing,
          }}
        />
      </BaseContainer>
    );
  }),
);

export default Tasks;
