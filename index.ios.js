/**
 *  Property Finder
 * @author wuxm
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  text:{
    color:'red',
    backgroundColor:'white',
    fontSize:30,
    margin:80}
});

class ReactNativePropertyFinder extends Component {
  render() {   
      //return React.createElement(React.Text,{style: styles.text},"Hello World!");
      return (
        <Text style={styles.text}>
          Hello World!
        </Text>);
  }
}


AppRegistry.registerComponent('ReactNativePropertyFinder',()=>(return ReactNativePropertyFinder);
