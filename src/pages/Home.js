import React from 'react'
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
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';


export const Home=()=> {

  const Navigation=useNavigation();
  

  return (
   <SafeAreaView style={styles.main}>
   
    <View style={styles.NoteView}>
    <TouchableOpacity onPress={()=>Navigation.navigate("Notes")}>
      <View style={styles.View1}>
      <Image resizeMode="contain" source={require("../images/image9.png")} />
      </View>
    <View style={styles.View2}>
    <Text style={styles.NoteViewText}>My Notes</Text>
    </View>
    </TouchableOpacity>
    </View>
   
    
    <View style={styles.SketchView}>
    <TouchableOpacity onPress={()=>Navigation.navigate("Drawings")}>
    <View style={styles.View1}>
      <Image resizeMode="contain" source={require("../images/image10.png")} />
      </View>
      <View style={styles.View2}>
    <Text style={styles.NoteViewText}>My Drawings</Text>
    </View>
    </TouchableOpacity>
    </View>
   
   </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  main:{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center",flexDirection:"column"},
  NoteView:{backgroundColor:"#03A9F4",height:"34%",width:"70%",marginBottom:"15%",elevation:10,borderRadius:15,flexDirection:"column",borderColor:"#607D8B",borderWidth:0.5},
  View1:{width:"100%",height:"80%",alignItems:"center",justifyContent:"center"},
  View2:{width:"100%",height:"20%",alignItems:"center",justifyContent:"center",backgroundColor:"#FFF0B1",borderBottomLeftRadius:15,borderBottomRightRadius:15},
  SketchView:{backgroundColor:"#03A9F4",height:"34%",width:"70%",elevation:10,borderRadius:15,flexDirection:"column",borderColor:"#607D8B",borderWidth:0.5},
  NoteViewText:{fontWeight:"400",fontSize:30,textAlign:"center",color:"#000000"},

})