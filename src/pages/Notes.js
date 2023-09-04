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
    FlatList,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/FontAwesome';
import { Notİtem } from '../components/Notİtem';
import { SearchNot } from '../components/SearchNot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

export const Notes = ({navigation}) => {

    const Navigation=useNavigation();
    const [MyNotes,SetMyNotes]=useState([]);
    const[Control1,SetControl1]=useState(false);

    useEffect(() => {   
    
      const focusHandler = navigation.addListener('focus', () => {
       getNotes();
      });
      return focusHandler;
  }, [navigation]);

    useEffect(()=>{
  
      navigation.setOptions({
        headerStyle:{backgroundColor:"#03A9F4"},
        headerTitleAlign:"center",
        headerTitleStyle:{fontWeight:"700",fontSize:21,fontFamily:"notoserif"},
        title:"",
        headerTintColor: "#C5E1A5",
        headerLeft:()=>(<TouchableOpacity style={{marginLeft:-5}} onPress={()=>Navigation.navigate("Home")} ><View style={{elevation:20,backgroundColor:"#FFF0B1",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}><Icon name="chevron-circle-left" size={28} color="#607D8B" /></View></TouchableOpacity>),
        headerRight:()=>(<Text></Text>)
    });
  
    })

    useEffect(()=>{
      getNotes();
    },[])


    const getNotes = async () => {
      SetControl1(true);
      try {
        const mynotes = await AsyncStorage.getItem('MyNotes')
        if (mynotes) {
          SetMyNotes(JSON.parse(mynotes));
            SetControl1(false);
        }
        else{
          SetControl1(false);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
        SetControl1(false);
      }
    };

    
  return (
    <SafeAreaView style={styles.main}> 
        <SearchNot SetMyNotes={SetMyNotes} />
        {Control1 ? 
        <ActivityIndicator size={38} animating={true} color="#03A9F4" />
      : 
        MyNotes.length==0 ? <View style={styles.NotFind}>
          <Text style={styles.TextSearch}>Couldn't find any note ...</Text>
        </View> : 
    <View style={{marginBottom:50}}>
      <FlatList
      data={MyNotes}
      numColumns={2}
      renderItem={({item})=><Notİtem SetMyNotes={SetMyNotes} item={item} />}
      keyExtractor={item=>item.id}
      
      />
       
    </View>
}

    <View style={styles.addButon}>
    <TouchableOpacity style={styles.TouchableOpacityAddButon} onPress={()=>Navigation.navigate("NewNote")} >
            <Icon name="plus" size={37} color="#FFF0B1" />
            </TouchableOpacity>
    </View>

    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    main:{flex:1,backgroundColor:"white",flexDirection:"column"},
    FlatlistView:{flex:1,},
    addButon:{position:"absolute",right:15,bottom:22,width:50,alignItems:"center",elevation:0},
    TouchableOpacityAddButon:{elevation:5,backgroundColor:"#03A9F4",
    paddingHorizontal:9,paddingVertical:4,borderRadius:10,
    borderColor:"#B0BEC5",borderWidth:1},
    TextSeachView:{flex:1,alignItems:"center",justifyContent:"center"},
    TextSearch:{fontSize:16,color:"#000000",width:"100%",textAlign:"center"},
    NotFind:{backgroundColor:"#03A9F4",width:"100%",
    alignItems:"center",justifyContent:"center",padding:10}

})