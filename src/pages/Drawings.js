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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { Drawİtem } from '../components/Drawİtem';
import { SearchDrawing } from '../components/SearchDrawing';

export const Drawings = ({navigation}) => {

    const Navigation=useNavigation();
    const [MyDrawings,SetDrawings]=useState([]);
    const[Control1,SetControl1]=useState(false);

    useEffect(() => {   
    
      const focusHandler = navigation.addListener('focus', () => {
        getDrawings();
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
      getDrawings();
    },[])


    // const sil=async()=>{
    //   try {
    //     await AsyncStorage.removeItem("MyDrawings");
    //     console.log(`Anahtar '${key}' başarıyla silindi.`);
    //   } catch (error) {
    //     console.log('Hata:', error);
    //   }
    // }

    const getDrawings = async () => {
      SetControl1(true);
      try {
        const mydrawings = await AsyncStorage.getItem('MyDrawings')
        if (mydrawings) {
          SetDrawings(JSON.parse(mydrawings));
            SetControl1(false);
            console.log(MyDrawings)
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
        <SearchDrawing SetDrawings={SetDrawings} />
        {Control1 ? 
        <ActivityIndicator size={38} animating={true} color="#03A9F4" />
      : 
      MyDrawings.length==0 ? <View style={styles.NotFind}>
          <Text style={styles.TextSearch}>Couldn't find any drawing ...</Text>
        </View> : 
    <View style={{marginBottom:50}}>
      <FlatList
      data={MyDrawings}
      numColumns={2}
      renderItem={({item})=><Drawİtem SetDrawings={SetDrawings} item={item} />}
      keyExtractor={item=>item.id}
      
      />
       
    </View>
}

    <View style={styles.addButon}>
    <TouchableOpacity style={styles.TouchableOpacityAddButon} onPress={()=>Navigation.navigate("NewDrawing")} >
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