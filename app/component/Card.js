import React from "react";
import { View, Dimensions, Button, StyleSheet} from "react-native";
import { Image } from "react-native-expo-image-cache";
// import FastImage from 'react-native-fast-image';

function Card({imageUrl}) {
  return (
      <View style={styles.card}>
        {/* <FastImage
          style={styles.image}
          source={{ uri: imageUrl, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}        
        /> */}
        <Image
          style={styles.image} 
          tint="light"
          preview={{ uri: imageUrl }}
          uri={imageUrl}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    margin: "1%",
    overflow: "hidden",
    width: "48%",
    height: Dimensions.get('window').width/2 + 10
  }
});

export default Card;
