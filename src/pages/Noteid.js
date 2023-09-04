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
    TextInput
  } from 'react-native';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import AsyncStorage from '@react-native-async-storage/async-storage';


export const Noteid = ({navigation}) => {


  const Route=useRoute();
 const {id}=Route.params;
 const {NotBody}=Route.params;
 const {NotTitle}=Route.params;
 const {backgroundColor}=Route.params;

  const[Notes,SetNotes]=useState([]);
  const[NewNot,SetNewNot]=useState({id:id,backgroundColor:backgroundColor,NotBody:NotBody,NotTitle:NotTitle,Time:0})
  const[ViewbackgroundColor,SetViewbackgroundColor]=useState(backgroundColor);
  const[SettingsOpen,SetSettingsOpen]=useState(false);


  const styles=StyleSheet.create({    // styles 
    main:{flex:1,width:"100%",backgroundColor:ViewbackgroundColor,marginTop:0,flexDirection:"column"},
    View1:{flex:0,width:"100%",backgroundColor:ViewbackgroundColor,minHeight:50,marginTop:5,marginLeft:0,alignItems: "flex-start",elevation:1,
    justifyContent: "flex-star"},
    TextInputView1:{fontSize:16,color:"#000000",width:"100%",marginLeft:5},
    View2:{flex:0,width:"100%",backgroundColor:ViewbackgroundColor,height:"100%",marginTop:5,marginLeft:0,alignItems: "flex-start",
    justifyContent: "flex-start",elevation:1,marginBottom:0},
    TextInputView2:{fontSize:16,color:"#000000",width:"100%",marginBottom:0,height:"100%", textAlignVertical: 'top',lineHeight:20,marginLeft:5},
    ViewHr:{backgroundColor:"whitesmoke",height:3},
    ColorPick: SettingsOpen
    ? {
        display: "flex",
        position: "relative",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }
    : {
        display: "none",
        position: "relative",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      },
   
    /// Color-List
    Color1:{backgroundColor:"#FFF0B1",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},
    Color2:{backgroundColor:"#ECEFF1",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},
    Color3:{backgroundColor:"#E1BEE7",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},
    Color4:{backgroundColor:"#C0EB6A",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},
    Color5:{backgroundColor:"#B3E5FC",width:45,height:45,elevation:10,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    ScrollView1:{flex:1,width:"100%",backgroundColor:ViewbackgroundColor,marginTop:0,flexDirection:"column"},

})

  
    const Navigation=useNavigation();
  
    useEffect(()=>{   // navigation ayarları
  
      navigation.setOptions({
        headerStyle:{backgroundColor:"#03A9F4"},
        headerTitleAlign:"center",
        headerTitleStyle:{fontWeight:"700",fontSize:21,fontFamily:"notoserif"},
        title:"",
        headerTintColor: "#C5E1A5",
        headerLeft:()=>(<TouchableOpacity style={{marginLeft:-5}} onPress={()=>Navigation.navigate("Notes")} ><View style={{elevation:20,backgroundColor:"#FFF0B1",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}><Icon name="chevron-circle-left" size={28} color="#607D8B" /></View></TouchableOpacity>),
        headerRight:()=>(<><TouchableOpacity onPress={() => SetSettingsOpen(!SettingsOpen)}>
          <View style={{ marginRight: 10, elevation: 20, backgroundColor: "#FFF0B1", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 }}>
              {SettingsOpen ?<Icon name="chevron-circle-down" size={26} color="#43A047" /> : <Icon name="chevron-circle-up" size={26} color="#FF9800" /> }
                
            </View>
        </TouchableOpacity><TouchableOpacity onPress={() => Addnote()}>
            <View style={{ elevation: 20, backgroundColor: "#FFF0B1", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 }}>
              <Icon name="check" size={27} color="#43A047" />
            </View>
          </TouchableOpacity></>)
    });
  
    })

    const Addnote = async () => {
      try {
        if (NewNot.NotBody !== "") {
          const currentTime = new Date().getTime();
       //   const newid = shortid.generate();
          const updatedNotTime = { ...NewNot, Time: currentTime, id:id, backgroundColor: ViewbackgroundColor };
          SetNewNot(updatedNotTime);
    
       
            const mynotes = await AsyncStorage.getItem('MyNotes');
            const parsedNotes = JSON.parse(mynotes);
           

            const updatedNotesFiltered = parsedNotes.filter((item) => item.id != id);
        
            const combinedNotes = [updatedNotTime,...updatedNotesFiltered];
            await AsyncStorage.setItem('MyNotes', JSON.stringify(combinedNotes));
            Navigation.navigate("Notes");
        }
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    };

    const AddNoteTitle=(text)=>{
      
      const updatedNotTitle = { ...NewNot, NotTitle: text };
      SetNewNot(updatedNotTitle)
    }

    const AddNoteBody=(text)=>{

     // const currentTime = new Date().getTime();

      const updatedNotBody = { ...NewNot, NotBody: text };
      SetNewNot(updatedNotBody)
    }

   
  return (
    
    <SafeAreaView style={styles.main}>
   
        <View style={styles.View1}>
            <TextInput onChangeText={(text)=>AddNoteTitle(text)} value={NewNot.NotTitle} style={styles.TextInputView1} multiline={false} placeholder='Add a title...'/>
        </View>
        {/* <View style={styles.ViewHr}/> */}
      
        <ScrollView contentContainerStyle={styles.View2}> 
            <TextInput onChangeText={(text)=>AddNoteBody(text)} value={NewNot.NotBody} style={styles.TextInputView2} multiline={true} placeholder='Add a description...'/>
        </ScrollView>
       
        {/* <View style={styles.ViewHr}/> */}
        <View style={styles.ColorPick}>
          <TouchableOpacity onPress={()=>SetViewbackgroundColor("#FFF0B1")} style={styles.Color1}>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>SetViewbackgroundColor("#ECEFF1")} style={styles.Color2}>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetViewbackgroundColor("#E1BEE7")} style={styles.Color3}>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetViewbackgroundColor("#C0EB6A")} style={styles.Color4}>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetViewbackgroundColor("#B3E5FC")} style={styles.Color5}>
        </TouchableOpacity>
        </View>
    
    </SafeAreaView>
  
  )
}




