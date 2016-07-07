'use strict';

import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
} from 'react-native';

import SearchResults from './SearchResults';

const styles = StyleSheet.create({
  description:{
    marginBottom:20,
    fontSize:18,
    textAlign:'center',
    color:'#656565'},
  container:{
    padding:30,
    marginTop:65,
    alignItems:'center'},

  flowRight:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'stretch'},
  buttonText:{
    fontSize:18,
    color:'white',
    alignSelf:'center'},
  button:{
    height:36,
    flex:1,
    flexDirection:'row',
    backgroundColor:'#48BBEC',
    borderColor:'#48BBEC',
    borderWidth:1,
    borderRadius:8,
    marginBottom:10,
    alignSelf:'stretch',
    justifyContent:'center'},
  searchInput:{
    height:36,
    padding:4,
    marginRight:5,
    flex:4,
    fontSize:18,
    borderWidth:1,
    borderColor:'#48BBEC',
    borderRadius:8,
    color:'#48BBEC'},
    image:{
    	width:217,
    	height:138
    } 
});

function urlForQueryAndPage(key,value,pageNo){
	var data ={
      country:'uk',
      pretty:'1',
      encoding:'json',
      listing_type:'buy',
      action:'search_listings',
      page: pageNo
    };
    data[key]=value;

    var querystring = Object.keys(data)
    .map(key=> key+'='+encodeURIComponent(data[key]))
    .join('&');

    return 'http://api.nestoria.co.uk/api?'+querystring;
}


class SearchPage extends React.Component{
	constructor(props){
	  super(props);
	  this.state = {
	  	searchString:'London',
	  	isLoading:false,
	  	message:'' 
	  };
	  //this.onChange.bind(this);
	}
	onChange(e){
		this.setState({searchString:e.nativeEvent.text});
	}

	_handleResponse(res){
		console.log(res);
		let response = res.response;
		this.setState({isLoading:false,message:''});
		if(response.application_response_code.substr(0,1) === '1'){
			//console.log('Properties found:'+response.listings.length);
			this.props.navigator.push({
				title:'Result',
				component:SearchResults,
				passProps:{listings:response.listings}
			});	
		}else{
			this.setState({message:'Location not recognized;'});
		}
	}

	_executeQuery(query){
		console.log(query);

		fetch("http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=London")
		.then(res => res.json())
		.then(json => this._handleResponse(json))
		.catch(error=> this.setState({
			isLoading:false,
			message:'Something bad happened:'+error
		}));

		this.state.isLoading = true;
	}

	onSearchPressed(){
		var query = urlForQueryAndPage('place_name',this.state.searchString,1);
		this._executeQuery(query);
	}
	 
	render(){
		var spinner = this.state.isLoading?(<ActivityIndicator size='large'/>):(<View/>);

		return (
			<View
			style = {styles.container}>
				<Text style={styles.description}> Search for house to buy</Text>
				<Text style={styles.description}> Search by place-name, postcode or search near your location.</Text>
				<View style={styles.flowRight}>
					<TextInput value={this.state.searchString} onChange={this.onChange.bind(this)} style={styles.searchInput} placeholder='Search via name or postcode'/>
				    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
						<Text style={styles.buttonText} onPress={this.onSearchPressed.bind(this)}>Go</Text>
				    </TouchableHighlight>
			    </View>
			    <TouchableHighlight style={styles.button}
			    underlayColor='#99d9f4'>
			    <Text style={styles.buttonText}>Location</Text>
			    </TouchableHighlight>
			    <Image source={require('./Resources/house.png')} style={styles.image}/>
			    {spinner}
			    <Text style={styles.description}>{this.state.message}</Text>
			</View>
			);
	}
}

export default SearchPage;