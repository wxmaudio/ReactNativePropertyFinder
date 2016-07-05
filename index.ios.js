/**
 *  Property Finder
 * @author wuxm
 */
'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import SearchPage from './SearchPage';

const { Component} = React;

const styles = StyleSheet.create({
  text:{
    color:'red',
    backgroundColor:'white',
    fontSize:30,
    margin:80
  },
  container:{
    flex:1
  }
});



class ReactNativePropertyFinder extends Component{
 
  render(){
    return (<NavigatorIOS 
      style={styles.container}
      initialRoute = {{
        title:'Property Finder',
        component:SearchPage
      }}/>
    );
  }
}


AppRegistry.registerComponent('ReactNativePropertyFinder',function(){return ReactNativePropertyFinder});
