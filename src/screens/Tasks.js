import React, {useState, useEffect} from 'react';
import {observer, inject} from 'mobx-react';
import firestore from '@react-native-firebase/firestore';
import {BaseContainer, EmptyState} from '../components/CustomCoreComponents';
import {Task} from '../components/Task';
import Loading from './Loading';

const Tasks = inject('userStore')(
  observer(({userStore}) => {
    const [tasks, setTasks] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
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
          setIsEmpty(false);
          setIsLoading(false);
          filteredTasks.length > 0 ? setTasks(filteredTasks) : setIsEmpty(true);
        });
      return () => subscriber();
    }, []);

    return (
      <BaseContainer
        tabTitle="Tasks"
        isCenter={tasks.length === 0 ? true : false}>
        {tasks.length > 0
          ? tasks.map((item, index) => <Task task={item} key={index} />)
          : null}
        <Loading isVisible={isLoading} />
        {isEmpty ? (
          <EmptyState
            screenName="Tasks"
            text1="You have no current tasks"
            text2="Enjoy your day"
          />
        ) : null}
      </BaseContainer>
    );
  }),
);

export default Tasks;
