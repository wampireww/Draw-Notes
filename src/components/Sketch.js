import { SketchCanvas } from '@kichiyaki/react-native-sketch-canvas'
import React from 'react'
import {useEffect , useState} from "react"

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions 
  } from 'react-native';
export const Sketch = ({Bold,Pencil,SketchRef,backgroundColor}) => {

  const { width, height } = Dimensions.get('window');

  useEffect(()=>{
  console.log(backgroundColor+"ssssssssss")
  },[])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
     
    },
  });

  return (
    <View style={styles.container}>
    <View style={{ width:width,height:height,flex:1}}>
        <SketchCanvas
            ref={SketchRef}
             style={{width:width,height:height}}
             strokeColor={Pencil}
             strokeWidth={Bold}
          
      
        />
    </View>
    </View>
 
  )
}
