import React from 'react'
import {useEffect , useState,useRef} from "react"
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
  import { useNavigation } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/FontAwesome';
import { Sketch } from '../components/Sketch';
import {useRoute} from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';



export const Drawid = ({navigation}) => {

    const SketchRef = useRef(null);

    
  const Route=useRoute();
  const {id}=Route.params;
  const {DrawTitle}=Route.params;
  const {Draw64}=Route.params;
  const {backgroundColor}=Route.params;
  // const {Time}=Route.params;

  const[ViewbackgroundColor,SetViewbackgroundColor]=useState(backgroundColor);
  const[SettingsOpen,SetSettingsOpen]=useState(false);

  const[NewDrawing,SetNewDraw]=useState({id:"",backgroundColor:"",Draw64:null,DrawTitle:"",Time:0,Base64:null})

    const[Bold,setBold]=useState(3);
    const[Pencil,setPencil]=useState("black")
 
    const[Erase,SetErase]=useState(false);
   
    useEffect(() => {
      
  
      SketchRef.current.clear();
    
      if (SketchRef.current && Draw64) {
        
        
        Draw64.forEach((draw) => {
         
          SketchRef.current.addPath(draw);
       
        });
      }
      
    }, [Draw64]);
    
  const styles=StyleSheet.create({

    main:{flex:1,width:"100%",backgroundColor:ViewbackgroundColor,marginTop:0,flexDirection:"column"},
    View1:{flex:1,width:"100%",height:"100%",backgroundColor:ViewbackgroundColor,marginTop:0,marginLeft:0,alignItems: "flex-start",elevation:1,
    justifyContent: "flex-star"},
    TextInputView1:{fontSize:16,color:"#000000",width:"100%",marginLeft:5},
   
    ArtSettings: SettingsOpen ? {
      display: "flex",
      position: "absolute",
      bottom:60,
      right:0,
      width: "15%",
      backgroundColor: "#ECEFF1",
      height: "auto",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      flexDirection: "column",
      paddingBottom:20,
      paddingTop:20,
      elevation:20,
      borderTopRightRadius:10,
      borderTopLeftRadius:10
  } : {  display: "none",
  position: "absolute",
  bottom:60,
  right:0,
  width: "15%",
  backgroundColor: "#ECEFF1",
  height: "auto",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  flexDirection: "column",
  paddingBottom:20,
  paddingTop:20,
  elevation:20,
  borderTopRightRadius:10,
  borderTopLeftRadius:10 },
    // settings list

    Remove:{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#B0BEC5",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Erase:Erase==false ?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#B0BEC5",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10} :
    {justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#B0BEC5",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10},

    Bold4:Bold==12 ?{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}:
    {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold3:Bold==7 ?{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}:
    {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold2:Bold==5 ?{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}:
    {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold1:Bold==3 ? {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},



    Set1:Pencil=="black" ?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"black",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"black",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set2:Pencil=="red"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"red",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"red",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set3:Pencil=="#1976D2"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#1976D2",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#1976D2",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set4:Pencil=="green"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"green",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"green",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},
    
    //////

    Set5:Pencil=="yellow"?{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"yellow",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"black",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"yellow",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set6:Pencil=="#795548"?{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#795548",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#795548",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set7:Pencil=="#D500F9"?{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#D500F9",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#D500F9",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set8:Pencil=="#FF9800"?{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#FF9800",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#FF9800",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set9:Pencil=="#B0BEC5"?{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#B0BEC5",width:43,height:43,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:0,backgroundColor:"#B0BEC5",width:43,height:43,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

 


    ColorPick: SettingsOpen
    ? {
        display: "flex",
        position: "relative",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ECEFF1",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }
    : {
        display: "none",
        position: "relative",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ECEFF1",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      },
    
    ScrollView1:{flex:1,width:"100%",backgroundColor:ViewbackgroundColor,marginTop:0,flexDirection:"column"},

})
 
  
    const Navigation=useNavigation();
  
    useEffect(()=>{
  
      navigation.setOptions({
        headerStyle:{backgroundColor:"#03A9F4"},
        headerTitleAlign:"center",
        headerTitleStyle:{fontWeight:"700",fontSize:21,fontFamily:"notoserif"},
        title:"",
        headerTintColor: "#C5E1A5",
        headerLeft:()=>(<TouchableOpacity style={{marginLeft:-5}} onPress={()=>Navigation.navigate("Drawings")} ><View style={{elevation:20,backgroundColor:"#FFF0B1",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}><Icon name="chevron-circle-left" size={28} color="#607D8B" /></View></TouchableOpacity>),
        headerRight:()=>(<><TouchableOpacity onPress={() => SetSettingsOpen(!SettingsOpen)}>
            <View style={{ marginRight: 10, elevation: 20, backgroundColor: "#FFF0B1", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 }}>
              {SettingsOpen ?<Icon name="chevron-circle-down" size={26} color="#43A047" /> : <Icon name="chevron-circle-up" size={26} color="#FF9800" /> }
                
            </View>
        </TouchableOpacity><TouchableOpacity onPress={() => UpdateDraw()}>
                <View style={{ elevation: 20, backgroundColor: "#FFF0B1", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 }}>
                    <Icon name="check" size={27} color="#43A047" />
                </View>
            </TouchableOpacity></>)
    });
  
    })

    const getBase64Data = () => {
      return new Promise((resolve, reject) => {
        SketchRef.current.getBase64("png",false,false,true,true, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

 const UpdateDraw=async()=>{

  try {

      const currentTime = new Date().getTime();
      const Resultart = await getBase64Data();
      const base64Data =Resultart; 
      const mimeType = 'image/png'; 
    const imageDataUri = `data:${mimeType};base64,${base64Data}`;

       const paths = await SketchRef.current.getPaths();
       if(paths.length==0){  
        return;
       }
      const updatedDraw = { ...NewDrawing, DrawTitle:DrawTitle,Time: currentTime, id:id, backgroundColor: ViewbackgroundColor,Draw64:paths,Base64:imageDataUri };
      SetNewDraw(updatedDraw);


        const mydraws = await AsyncStorage.getItem('MyDrawings');
        const parsedDraws = JSON.parse(mydraws);
       

        const updatedDrawFiltered = parsedDraws.filter((item) => item.id != id);
    

        const combinedDraws = [updatedDraw,...updatedDrawFiltered];
        await AsyncStorage.setItem('MyDrawings', JSON.stringify(combinedDraws));
        Navigation.navigate("Drawings");
  
  } catch (error) {
    console.error('Error saving notes:', error);
  }
 }

 const EraseSketch=()=>{

  SetErase(true);
  setPencil(ViewbackgroundColor);
  setBold(Bold);
}


const SetBlack=()=>{
setPencil("black");
SetErase(false);

}

const SetRed=()=>{

setPencil("red");
SetErase(false);
}

const SetBlue=()=>{

setPencil("#1976D2");
SetErase(false);
}

const SetGreen=()=>{

setPencil("green");
SetErase(false);
}

const SetYellow=()=>{

setPencil("yellow");
SetErase(false);
}

const SetBrown=()=>{

setPencil("#795548");
SetErase(false);

}

const SetPurple=()=>{

setPencil("#D500F9");
SetErase(false);
}

const SetOrange=()=>{

setPencil("#FF9800");
SetErase(false);

}

const SetGray=()=>{

setPencil("#B0BEC5");
SetErase(false);

}


        
  return (
    
    <SafeAreaView style={styles.main}>
   
        <View style={styles.View1}>
        <Sketch backgroundColor={ViewbackgroundColor} SketchRef={SketchRef} Bold={Bold} Pencil={Pencil}/>
        </View>

        <View style={styles.ArtSettings}>
        <TouchableOpacity onPress={()=>SketchRef.current.undo()} style={styles.Remove}>
        <Icon name="undo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>EraseSketch()} style={styles.Erase}>
        <Icon name="eraser" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBold(12)} style={styles.Bold4}>
        <Text style={{fontSize:21,color:"white",marginBottom:0}}>B4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBold(7)} style={styles.Bold3}>
        <Text style={{fontSize:21,color:"white",marginBottom:0}}>B3</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>setBold(5)} style={styles.Bold2}>
         <Text style={{fontSize:21,color:"white",marginBottom:0}}>B2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBold(3)} style={styles.Bold1}>
        <Text style={{fontSize:21,color:"white",marginBottom:0}}>B1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetBlack()} style={styles.Set1}>
        <Icon name="pencil" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetRed()} style={styles.Set2}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetBlue()} style={styles.Set3}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetGreen()} style={styles.Set4}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        </View>
       
        <View style={styles.ColorPick}>
        <TouchableOpacity onPress={()=>SetYellow()} style={styles.Set5}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetBrown()} style={styles.Set6}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetPurple()} style={styles.Set7}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetOrange()} style={styles.Set8}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetGray()} style={styles.Set9}>
        <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
        
        </View>
     
    
    </SafeAreaView>
  
  )
}




