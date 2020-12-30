import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {BaseContainer, TabTitle} from '../components/CustomCoreComponents';
import {InfoItem, EmployeeInfo} from '../components/Settings';
import Avatar from '../assets/images/avatar.png';

const About = ({params}) => {
  const [data] = useState([
    {
      heading: 'Values We Live By',
      values: [
        {
          title: '- Customer Commitment',
          content:
            "We develop relationships that make a positive difference in our customers's lives.",
        },
        {
          title: '- Quality',
          content:
            'We provide outstanding products and unsurpassed service that, together, deliver premium value to our customers.',
        },
        {
          title: '- Integrity',
          content:
            'We uphold the highest standards of integrity in all of our actions.',
        },
        {
          title: '- Teamwork',
          content:
            'We work together, across boundaries, to meet the needs of our customers and to help our Company win.',
        },
        {
          title: '- Respect for People',
          content:
            'We value our people, encourage their development and reward their performance.',
        },
        {
          title: '- Good Citizenship',
          content:
            'We are good citizens in the communities in which we live and work.',
        },
        {
          title: '- A Will to Win',
          content:
            'We exhibit a strong will to win in the marketplace and in every aspect of our business.',
        },
        {
          title: '- Personal Accountability',
          content:
            'We are personally accountable for delivering on our commitments.',
        },
      ],
    },
    {heading: 'Meet Our Team'},
  ]);

  const [employees] = useState([
    {name: 'newt', position: 'founder', imgUrl: Avatar},
    {name: 'john', position: 'project manager', imgUrl: Avatar},
    {name: 'will', position: 'designer', imgUrl: Avatar},
    {name: 'arthur', position: 'developer', imgUrl: Avatar},
  ]);
  return (
    <BaseContainer tabTitle="about us">
      <FlatList
        data={data}
        renderItem={({item}) => <InfoItem data={item} />}
        keyExtractor={(item) => item.heading}
      />
      <FlatList
        data={employees}
        renderItem={({item}) => <EmployeeInfo employee={item} />}
        keyExtractor={(item) => item.name}
        numColumns={2}
      />
    </BaseContainer>
  );
};

export default About;
