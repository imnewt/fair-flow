import React from 'react';
import {FlatList} from 'react-native';
import {BaseContainer} from '../components/CustomCoreComponents';
import {InfoItem, EmployeeCard} from '../components/Settings';
import Employee1 from '../assets/images/employee1.jpg';
import Employee2 from '../assets/images/employee2.png';
import Employee3 from '../assets/images/employee3.png';
import Employee4 from '../assets/images/employee4.jpg';

const values = [
  {
    id: 0,
    heading: 'Values We Live By',
    values: [
      {
        id: 0,
        title: 'Customer Commitment',
        content:
          "We develop relationships that make a positive difference in our customers's lives.",
      },
      {
        id: 1,
        title: 'Quality',
        content:
          'We provide outstanding products and unsurpassed service that, together, deliver premium value to our customers.',
      },
      {
        id: 2,
        title: 'Integrity',
        content:
          'We uphold the highest standards of integrity in all of our actions.',
      },
      {
        id: 3,
        title: 'Teamwork',
        content:
          'We work together, across boundaries, to meet the needs of our customers and to help our Company win.',
      },
      {
        id: 4,
        title: 'Respect for People',
        content:
          'We value our people, encourage their development and reward their performance.',
      },
      {
        id: 5,
        title: 'Good Citizenship',
        content:
          'We are good citizens in the communities in which we live and work.',
      },
      {
        id: 6,
        title: 'A Will to Win',
        content:
          'We exhibit a strong will to win in the marketplace and in every aspect of our business.',
      },
      {
        id: 7,
        title: 'Personal Accountability',
        content:
          'We are personally accountable for delivering on our commitments.',
      },
    ],
  },
  {
    id: 1,
    heading: 'Meet Our Team',
  },
];

const employees = [
  {
    id: 0,
    name: 'newt',
    position: 'founder',
    avatar: Employee1,
  },
  {
    id: 1,
    name: 'mct',
    position: 'project manager',
    avatar: Employee2,
  },
  {
    id: 2,
    name: 'Huyen Pham',
    position: 'designer',
    avatar: Employee3,
  },
  {
    id: 3,
    name: 'Tan Truc',
    position: 'developer',
    avatar: Employee4,
  },
];

const About = () => {
  return (
    <BaseContainer tabTitle="About Us">
      <FlatList
        data={values}
        renderItem={({item}) => <InfoItem data={item} />}
        keyExtractor={(item) => item.id}
      />
      <FlatList
        data={employees}
        renderItem={({item}) => <EmployeeCard employee={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </BaseContainer>
  );
};

export default About;
