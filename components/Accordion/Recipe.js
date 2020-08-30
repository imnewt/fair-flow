import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { mix, bin, useTransition } from 'react-native-redash';
import { Rating, Avatar } from 'react-native-elements';
import Chevron from './Chevron';
import RecipeExpand, { LIST_ITEM_HEIGHT } from './RecipeExpand';

const { not, interpolate } = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  line: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  beverageName: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  countryName: {
    fontSize: 16,
    color: "#9b9b9b"
  },
  userInfo: {
    flexDirection:"row", 
    alignItems:"center"
  },
  userName: {
    fontSize: 16,
    marginLeft: 10
  },
  icon: {
    width: 20,
    height: 20,
    overlayColor: "red",
    tintColor: "#9b9b9b"
  },
  amount: {
    marginLeft: 3,
    color: "#9b9b9b"
  },
  items: {
    overflow: 'hidden',
  },
});

const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease),
  );

  const height = mix(transition, 0, LIST_ITEM_HEIGHT);

  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            },
          ]}
        >
          <View style={styles.line}>
            <Text style={styles.beverageName}>{recipe.baverageName}</Text>
            <Chevron {...{transition}} />
          </View>
          <View style={[styles.line, { marginVertical:10 }]}>
            <Text style={styles.countryName}>{recipe.country}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../assets/icons/coffee-beans.png")}
                  style={styles.icon}
                />
                <Text style={styles.amount}>20g</Text>
              </View>
              <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <Image source={require("../../assets/icons/water.png")}
                  style={styles.icon}
                />
                <Text style={styles.amount}>300ml</Text>
              </View>
            </View>
          </View>
          <View style={styles.line}>
            <View style={styles.userInfo}>
              <Avatar
                rounded
                source={require("../../assets/images/test.gif")}
              />
              <Text style={styles.userName}>{recipe.creator}</Text>
            </View>
            <Rating 
              imageSize={16}
              readonly
              startingValue={recipe.rating}
              type="custom"
              ratingBackgroundColor="#d2d2d2"
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, {height}]}>
        <RecipeExpand time={recipe.time} difficulty={recipe.difficulty}/>
      </Animated.View>
    </>
  )
}

export default Recipe;