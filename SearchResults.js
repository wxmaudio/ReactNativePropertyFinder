'use strict';

import React,{Component} from 'react';
import {View,
	Text,
	Image,
	StyleSheet,
	ListView,
	TouchableHighlight} from 'react-native';

var styles = StyleSheet.create({
  thumb:{
    width:80,
    height:80,
    marginRight:10},
  textContainer:{
    flex:1},
  separator:{
    height:1,
    backgroundColor:'#dddddd'},
  price:{
    fontSize:25,
    fontWeight:'bold',
    color:'#48BBEC'},
  title:{
    fontSize:20,
    color:'#656565'},
  rowContainer:{
    flexDirection:'row',
    padding:10}
});

class SearchResults extends Component{
	constructor(props){
		super(props);
		var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1.guid!==r2.guid});
		this.state = {
			dataSource : dataSource.cloneWithRows(this.props.listings)
		}
	}

	renderRow(rowData, sectionID,rowID){
		var price = rowData.price_formatted.split(' ')[0];
		return(<TouchableHighlight underlayColor='#dddddd' onPress={()=>this.rowPressed(rowData.guid)}>
				<View>
					<View style= {styles.rowContainer} >
						<Image style={styles.thumb} source={{uri:rowData.img_url}}/>
						<View style={styles.textContainer}>
							<Text style={styles.price}>£{price}</Text>
							<Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
						</View>				 
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>);
	}
	rowPressed(propertyGuid){
		var property = this.props.listings.filter((pro)=>pro.guid === propertyGuid)[0];
	}
	render(){
		return (
			<ListView dataSource = {this.state.dataSource} renderRow = {this.renderRow.bind(this)}/>
			);
	}
}

export default SearchResults;