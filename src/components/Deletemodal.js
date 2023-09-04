import React, { useState,useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
  import Icon from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';


export const Deletemodal = ({Open,setOpen,Notitem,SetMyNotes}) => {


    const Delete=async()=>{
        try{
            const mynotes = await AsyncStorage.getItem('MyNotes')
            const Filtered=JSON.parse(mynotes).filter(item=>item.id!=Notitem.id);
            SetMyNotes(Filtered)
            await AsyncStorage.setItem('MyNotes', JSON.stringify(Filtered));
            setOpen(!Open);
            

        }
        catch(error){
            console.error('Error removing item:', error);
        }
       
    }
    
    const Close=()=>{
        setOpen(!Open)
    }

    const CopyContent=()=>{

      const CopytText = Notitem.NotBody; 
      Clipboard.setString(CopytText);
      setOpen(!Open);
    }


  return (
    
    <Modal onBackdropPress={()=>Close()} animationOutTiming={200} animationOut={"bounceOutDown"} animationIn={"bounceInUp"} isVisible={Open}>
      <View style={style.main}>
        {/* <Text style={style.TextQuestion}>Are you sure want to delete this note ?</Text> */}
        <View style={style.ViewModal}>
            <TouchableOpacity onPress={()=>CopyContent()} style={{flexDirection:"row",alignItems:"center",backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,elevation:5,borderRadius:5}}>
            <Icon  name="copy" size={18} color="#388E3C" />
   <Text style={style.TextQuestionsAnswer1}>Copy Clipboard</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>Delete()} style={{flexDirection:"row",alignItems:"center",marginTop:0,backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,marginLeft:20,elevation:5,borderRadius:5}}>
            <Icon name="remove" size={18} color="#FF7043" /><Text style={style.TextQuestionsAnswer2}>Delete Note</Text>
                </TouchableOpacity>
        </View>
      </View>
    </Modal>

  )
}

const style=StyleSheet.create({
    main:{flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#03A9F4",height:80,borderRadius:15,elevation:5},
    TextQuestion:{fontSize:16,color:"#1976D2",fontWeight:"500"},
    ViewModal:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
    TextQuestionsAnswer1:{fontSize:17,color:"#388E3C",fontWeight:"500",marginLeft:5},
    TextQuestionsAnswer2:{fontSize:17,color:"#FF7043",fontWeight:"500",marginLeft:5}
})


