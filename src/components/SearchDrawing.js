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

  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import AsyncStorage from '@react-native-async-storage/async-storage';


export const SearchDrawing = ({SetDrawings}) => {

  const[MyOldNotes,SetMyOldNotes]=useState([]);
  const[Value,setValue]=useState("");

  const getNotes = async () => {
    try {
      const mynotes = await AsyncStorage.getItem('MyDrawings')
      if (mynotes) {
        SetMyOldNotes(JSON.parse(mynotes));
        
       
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  useEffect(()=>{
    getNotes()
  },[Value])
 
  useEffect(() => {
    Notfind();
 }, [Value]);


  const Notfind=()=>{
      
    if(Value===""){
      SetDrawings(MyOldNotes);
     
    }
    else{
      const lowercaseValue = Value.toLowerCase();
       const foundNotes = MyOldNotes.filter(
          (item) =>
          item.DrawTitle.toLowerCase().startsWith(lowercaseValue) 
          
        );
        SetDrawings(foundNotes);
  }
 
  }  


  return (
    <View style={styles.main}>
        <TextInput value={Value} onChangeText={(text)=>setValue(text)} placeholder='Search in drawings...' style={styles.TextInputSeach}/>
        <Icon style={styles.Icon} name="search" size={23} color="#607D8B" />
    </View>
  )
}

const styles=StyleSheet.create({
    main:{width:"100%",backgroundColor:"white",flexDirection:"row",alignItems:"center",
    justifyContent:"flex-start",marginBottom:10,borderBottomColor:"#90A4AE",borderBottomWidth:0.5,elevation:5},
    TextInputSeach:{width:"93%",height:45,backgroundColor:"white",fontSize:16,marginRight:5,color:"#000000"},
    Icon:{marginLeft:-5}
})