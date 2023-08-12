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

  const[MyDrawings,SetMyDrawings]=useState([]);
  const[NewDrawing,SetNewDraw]=useState({id:"",backgroundColor:"",Draw64:null,DrawTitle:"",Time:0,Base64:null})

    const[Bold,setBold]=useState(3);
    const[Pencil,setPencil]=useState("black")
 
    useEffect(()=>{
      
     // const screenHeight = Dimensions.get('window').height;
      //  ketchRef.current.updateLayout({ height: screenHeight });
    },[])

   
    useEffect(() => {
      
  
      SketchRef.current.clear();
    
      if (SketchRef.current && Draw64) {
        console.log("ssssssssssss")
        console.log("ssssssssssss")

        console.log(Draw64[0].path.data);
        
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
        bottom:70,
        right:0,
        width: "15%",
        backgroundColor: "white",
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
    bottom:70,
    right:0,
    width: "15%",
    backgroundColor: "white",
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

    Remove:{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#B0BEC5",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold3:Bold==7 ?{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}:
    {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold2:Bold==5?{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}:
    {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Bold1:Bold==3 ? {flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#03A9F4",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},



    Set1:Pencil=="black" ?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"black",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"black",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set2:Pencil=="red"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"red",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"red",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set3:Pencil=="#1976D2"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#1976D2",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#1976D2",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},

    Set4:Pencil=="green"?{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"green",width:45,height:45,marginRight:10,elevation:5,borderWidth:3,borderColor:"yellow",borderRadius:10}
    :{justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"green",width:45,height:45,marginRight:10,elevation:5,borderWidth:1,borderColor:"#90A4AE",borderRadius:10},





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
  
    useEffect(()=>{
  
      navigation.setOptions({
        headerStyle:{backgroundColor:"#03A9F4"},
        headerTitleAlign:"center",
        headerTitleStyle:{fontWeight:"700",fontSize:21,fontFamily:"notoserif"},
        title:"",
        headerTintColor: "#C5E1A5",
        headerLeft:()=>(<TouchableOpacity onPress={()=>Navigation.navigate("Drawings")} ><View style={{elevation:20,backgroundColor:"#FFF0B1",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}><Icon name="chevron-circle-left" size={27} color="#607D8B" /></View></TouchableOpacity>),
        headerRight:()=>(<><TouchableOpacity onPress={() => SetSettingsOpen(!SettingsOpen)}>
            <View style={{ marginRight: 10, elevation: 20, backgroundColor: "#FFF0B1", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 }}>
              {SettingsOpen ?<Icon name="chevron-circle-down" size={25} color="#43A047" /> : <Icon name="chevron-circle-up" size={25} color="#FF9800" /> }
                
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
      const base64Data =Resultart; // base64 veriyi buraya geçirin
      const mimeType = 'image/png'; // verinin MIME türüne göre değiştirin
    const imageDataUri = `data:${mimeType};base64,${base64Data}`;
       const paths = await SketchRef.current.getPaths();
      const updatedDraw = { ...NewDrawing, DrawTitle:DrawTitle,Time: currentTime, id:id, backgroundColor: ViewbackgroundColor,Draw64:paths,Base64:imageDataUri };
      SetNewDraw(updatedDraw);


        const mydraws = await AsyncStorage.getItem('MyDrawings');
        const parsedDraws = JSON.parse(mydraws);
       

        const updatedDrawFiltered = parsedDraws.filter((item) => item.id != id);
     //   SetNotes([...updatedNotesFiltered, updatedNotTime]);
      //  console.log(updatedNotesFiltered)
        // Yeni notları mevcut notların üzerine ekle ve AsyncStorage'e kaydet
        const combinedDraws = [updatedDraw,...updatedDrawFiltered];
        await AsyncStorage.setItem('MyDrawings', JSON.stringify(combinedDraws));
        Navigation.navigate("Drawings");
  
  } catch (error) {
    console.error('Error saving notes:', error);
  }
 }
        
  return (
    
    <SafeAreaView style={styles.main}>
   {/* <AddDrawingModal SketchRef={SketchRef} backgroundColor={ViewbackgroundColor} OpenModal={OpenModal} SetOpenModal={SetOpenModal} /> */}
   
        <View style={styles.View1}>
        <Sketch backgroundColor={ViewbackgroundColor} SketchRef={SketchRef} Bold={Bold} Pencil={Pencil}/>
        </View>
        <View style={styles.ArtSettings}>
        <TouchableOpacity onPress={()=>SketchRef.current.undo()} style={styles.Remove}>
        <Icon name="undo" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBold(7)} style={styles.Bold3}>
        <Text style={{fontSize:23,color:"white",marginBottom:0}}>B3</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>setBold(5)} style={styles.Bold2}>
         <Text style={{fontSize:23,color:"white",marginBottom:0}}>B2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBold(3)} style={styles.Bold1}>
        <Text style={{fontSize:23,color:"white",marginBottom:0}}>B1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setPencil("black")} style={styles.Set1}>
        <Icon name="pencil" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setPencil("red")} style={styles.Set2}>
        <Icon name="pencil" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setPencil("#1976D2")} style={styles.Set3}>
        <Icon name="pencil" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setPencil("green")} style={styles.Set4}>
        <Icon name="pencil" size={25} color="black" />
        </TouchableOpacity>
        </View>

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




