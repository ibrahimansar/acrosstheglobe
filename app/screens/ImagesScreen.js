import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import Card from "../component/Card";
import Constants from "expo-constants";
import useApi from "../hooks/useApi";
import { MaterialIcons } from '@expo/vector-icons';

export default ImagesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const openMenu = () => {
    navigation.openDrawer();
  }
  
  const val = "cat";
  const getApis = useApi("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=" + val)

  useEffect(() => {
    getApis.request();
  })

  useEffect(() => {
    function clickHandler(){
    fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=" + val)
      .then((response) => response.json())
      .then((json) => setData(json.photos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };

    clickHandler();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
        {getApis.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getApis.request} />
          </>
        )}

      {isLoading ? <Text>Loading...</Text> : 
      (
        <>
          <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.TextInput}>
              <TextInput
              placeholder="Search.." />
            </View>
          </View>
          <View style={{}}>
            <FlatList
              data={data.photo}
              numColumns= '2'
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Card
                  imageUrl = {item.url_s}
                />
              )}
            />
          </View>
        </>  
      )}        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: "10%",
    paddingLeft:5,
    paddingRight: 5
  },
  view: {
    marginBottom: 20
  },
    header: {  
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: "baseline",
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },  
  TextInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
  }
});