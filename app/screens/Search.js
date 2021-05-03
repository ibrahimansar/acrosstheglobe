import React, { Component } from 'react';
import { StyleSheet, Alert, Dimensions, Platform, View,TouchableOpacity,TouchableHighlight,FlatList  } from 'react-native'
import { Button,Header, Icon, Input, Item, Left, Right, Text,Thumbnail } from 'native-base'
import { ListItem, Avatar } from 'react-native-elements'


const { width, height } = Dimensions.get('window')
class Search extends Component {
  constructor(){
    super();
    this.state = {
      searchResult: [],
    };
  }

   static navigationOptions = {
   title: "Search Results",
             headerStyle: {
              backgroundColor: '#4050B5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
    }
  };

  getSearchResult(searchURL){
    console.log("Search URL is => "+searchURL);
    return fetch(searchURL)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({searchResult:responseJson.result});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  configureSearchURL(props){
    const { navigation } = props;
    let selectedTitles = navigation.getParam('selectedTitles');
    let searchKeyword = navigation.getParam('searchKeyword');
    console.log("selectTitles => "+selectedTitles);
    console.log("searchKeyword => "+searchKeyword);
    let searchURL = 'https://imas-go.com/test_item_search.php?';
    let titleParameter = "";

    if(selectedTitles != null || selectedTitles != ""){
       for (let i=0;i<selectedTitles.length;i++){
        if(i==0){
          titleParameter+="vers[]="+selectedTitles[i];
        } else {
          titleParameter+="&vers[]="+selectedTitles[i];
        }
      }
      searchURL+=titleParameter;
    }

    if(searchKeyword.trim().length > 0){
      searchURL+="&name="+searchKeyword;
    }
    console.log("final search url => "+searchURL);
    this.getSearchResult(searchURL);
  }

  componentDidMount(){
   this.configureSearchURL(this.props);
  }

  keyExtractor = (item, index) => item.sno+item.name;

renderItem = ({ item }) => (
 <ListItem
      title= {item.name}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>Ver: {item.ver}</Text>
          <Text style={styles.ratingText}>Price: {item.price}</Text>
          <Text style={styles.ratingText}>Stock: {item.stock}</Text>
        </View>
      }
     avatar={<Avatar
                large
                medium
                source={{uri: `https://imas-go.com/card_image/ws/front/${item.ver}/${item.cid}.jpg`}}
                onPress={() => console.log("Works!")}
              />}
    />
)   
  render() {

      return(
        <FlatList
      keyExtractor={this.keyExtractor}
      data={this.state.searchResult}
      renderItem={this.renderItem}
    />

        );
  }
}

styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})

export default Search;