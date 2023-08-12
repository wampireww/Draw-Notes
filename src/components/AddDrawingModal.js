import React, { useState,useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions  } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export const AddDrawingModal = ({OpenModal,SetOpenModal,backgroundColor,SketchRef}) => {

    const[MyDrawings,SetMyDrawings]=useState([]);
    const[NewDrawing,SetNewDraw]=useState({id:"",backgroundColor:"",Draw64:null,DrawTitle:"",Time:0,Base64:null})

    const shortid = require('shortid');
 
    const Navigation=useNavigation();

    const getBase64Data = () => {
      return new Promise((resolve, reject) => {
        SketchRef.current.getBase64("jpg",false,false,true,true, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    const AddDraw=async()=>{

        try{

            if(NewDrawing.DrawTitle.length<30 && NewDrawing.DrawTitle.length!=0){

              //  var Resultart=await SketchRef.current.getBase64("png",false,false,false,false,(err,result)=>{
              //   Resultart=result

              // })
              const Resultart = await getBase64Data();

              const base64Data =Resultart; // base64 veriyi buraya geçirin
              const mimeType = 'image/png'; // verinin MIME türüne göre değiştirin
              const imageDataUri = `data:${mimeType};base64,${base64Data}`;
             // const uri = await SketchRef.current.save('png', false, 'MyDrawing');
          

                const paths = await SketchRef.current.getPaths();

              //  const drawingData = SketchRef.current.getBase64('png', 100, false, false);
          //     const base64Data = await SketchRef.current.getBase64("png");
                const currentTime = new Date().getTime();
                const id = shortid.generate();
                const updatedNewDrawing = { ...NewDrawing, Time: currentTime, id, backgroundColor: backgroundColor ,Draw64:paths,Base64:imageDataUri};
                SetNewDraw(updatedNewDrawing);
    
                const updatedDrawings = [...MyDrawings, updatedNewDrawing];
                SetMyDrawings(updatedDrawings);


                const mydrawings = await AsyncStorage.getItem('MyDrawings');

                if (!mydrawings) {
                    // Yeni notları AsyncStorage'e kaydet
                    await AsyncStorage.setItem('MyDrawings', JSON.stringify(updatedDrawings));
                    Navigation.navigate("Drawings")
                  } else {
                    // AsyncStorage'den çekilen veriyi JSON formatından çöz ve notlar state'ine set et
                    const parsedDrawings = JSON.parse(mydrawings);
                    SetMyDrawings(parsedDrawings); // Bu satırı eklemeyi unutmayın!
                    
                    // Yeni notları mevcut notların üzerine ekle ve AsyncStorage'e kaydet
                    const combinedDrawings = [...parsedDrawings, updatedNewDrawing];
                    await AsyncStorage.setItem('MyDrawings', JSON.stringify(combinedDrawings));
                    Navigation.navigate("Drawings")
                  
                  }
                
            }
            else{
                console.log("text hatasi")
            }
            
           
        }
        catch(error){
            console.log(error)
        }
    }

    const Close=()=>{
        SetOpenModal(!OpenModal)
    }

     const AddDrawTitle=(text)=>{
      
       const updatedDrawTitle = { ...NewDrawing, DrawTitle: text };
       SetNewDraw(updatedDrawTitle)
     }

  return (
    
    <Modal onBackdropPress={()=>Close()} animationOutTiming={200} animationOut={"bounceOutDown"} animationIn={"bounceInUp"} isVisible={OpenModal}>
      <View style={style.main}>
         <Text style={style.TextQuestion}>Enter a description for your drawing.</Text>
         <TextInput value={NewDrawing.DrawTitle} onChangeText={(text)=>AddDrawTitle(text)} style={{fontSize:16,elevation:5,width:"80%",backgroundColor:"white",height:40,borderRadius:5}} placeholder="max 30 character.."/>
        <View style={style.ViewModal}>
            <TouchableOpacity onPress={()=>AddDraw()} style={{flexDirection:"row",alignItems:"center",backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,elevation:5,borderRadius:5}}>
            <Icon  name="check" size={18} color="#388E3C" />
   <Text style={style.TextQuestionsAnswer1}>Save</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>Close()} style={{flexDirection:"row",alignItems:"center",marginTop:0,backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,marginLeft:20,elevation:5,borderRadius:5}}>
            <Icon name="remove" size={18} color="#FF7043" /><Text style={style.TextQuestionsAnswer2}>Cancel</Text>
                </TouchableOpacity>
        </View>
      </View>
    </Modal>

  )
}

const style=StyleSheet.create({
    main:{flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#03A9F4",height:250,borderRadius:15,elevation:5},
    TextQuestion:{fontSize:17,color:"#1976D2",fontWeight:"500",color:"black",marginBottom:5},
    ViewModal:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
    TextQuestionsAnswer1:{fontSize:17,color:"#388E3C",fontWeight:"500",marginLeft:5},
    TextQuestionsAnswer2:{fontSize:17,color:"#FF7043",fontWeight:"500",marginLeft:5}
})


