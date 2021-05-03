import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, ScrollView,  View, Button, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import Card from "../component/Card";
import Constants from "expo-constants";
import useApi from "../hooks/useApi";
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { Footer } from 'native-base';

export default ImagesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('cat');
  const [page, setPage] = useState(1);

  const openMenu = () => {
    navigation.openDrawer();
  }

  const perPage = page * 6;
  
  const val = search;
  const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=" + val + "?page= " + page + "&per_page=" + perPage;
  const getApis = useApi(url)

  useEffect(() => {
    getApis.request();
  })

  
  function clickHandler(){
     setLoading(true)
     fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json.photos))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    clickHandler();
  }, []);

  function clickHandlerMore(){
     setPage(page + 1)
    //  fetch(url)
    // .then((response) => response.json())
    // .then((json) => setData(json.photos))
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));
  };

  useEffect(() => {
    clickHandlerMore();
  }, []);

  // const loadMore = () => {
  //   setPage(page + 1);
  // } 
  
  const renderFooter = () => {
    return(
      <View style={styles.footer}>
        <ActivityIndicator color="black" size="large"/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
        {getApis.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={() => {clickHandler()}} />
          </>
        )}

      {isLoading ? <Text>Loading...</Text> : 
      (
        <>
          <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.TextInput}>
              <TextInput
                placeholder="Search.."
                onChangeText={(text) => setSearch(text)}
               />
            </View>
            <Icon name = "search" onPress= {() => {clickHandler()}}/>  
          </View>

          
          <ScrollView style={styles.list} onMomentumScrollEnd={() => {clickHandler()}} >
            <FlatList
              data={data.photo}
              numColumns= '2'
              ListFooterComponent={renderFooter}
              onEndReached={() => {console.log("reached")}}
              onEndReachedThreshold ={0.3}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Card
                  imageUrl = {item.url_s}
                />
              )}
            />
          </ScrollView>
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
    display: 'flex',  
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
  },
  icon: {
    left: 6,
  },  
  TextInput: {
    width: "70%",
    height: "70%",
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 20,
    fontSize: 16,
    borderRadius: 15,
    backgroundColor: "#f7f3f3",
    borderWidth: 0.5
  },
  footer: {
    marginTop: 10,
    alignItems: "center"
  },
  list: {
    paddingBottom: 65
  }
});