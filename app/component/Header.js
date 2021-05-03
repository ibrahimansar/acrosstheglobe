// import React from 'react';
// import { StyleSheet, Text, View} from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Container, Header,Item,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';

// export default function Headers({ title, navigation }) {

//   const openMenu = () => {
//     navigation.openDrawer();
//   }

//   return (
//     <View style={styles.header}>
//       <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
//       <View>
//         <Text style={styles.headerText}>{title}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {  
//     width: '100%',
//     height: 40,
//     flexDirection: 'row',
//     alignItems: "baseline",
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: '#333',
//     letterSpacing: 1,
//   },
//   icon: {
//     position: 'absolute',
//     left: 16,
//   }
// });