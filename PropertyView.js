import React,{Component} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';

var styles = StyleSheet.create({
	container:{
	    marginTop:65},
	  header:{
	    backgroundColor:'#F8F8F8',},
	  separator:{
	    height:1,
	    backgroundColor:'#DDDDDD'},
	  image:{
	    width:400,
	    height:300},
	  price:{
	    fontSize:25,
	    fontWeight:'bold',
	    margin:5,
	    color:'#48BBEC'},
	  title:{
	    fontSize:20,
	    margin:5,
	    color:'#656565'},
	  description:{
	    fontSize:18,
	    margin:5,
	    color:'#656565'}

});

class PropertyView extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let property = this.props.property;
		let stats = property.bedroom_number + ' bed ' + property.property_type;
		if(property.bathroom_number){
			stat += ', ' + sproperty.bathroom_number + ' ' + (property.bathroom_number>1) ? 'bathrooms':'bathroom';
		}
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={{uri:property.img_url}}/>
				<View style={styles.header}>
					<Text style={styles.price}>{property.price}</Text>
					<Text style={styles.title}>{property.title}</Text>
					<View style={styles.separator}/>
				</View>
				<Text style={styles.description}>{stats}</Text>
				<Text style={styles.description}>{property.summary}</Text>

			</View>
			);
	}
}

export default PropertyView;