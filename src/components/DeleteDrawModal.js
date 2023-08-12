import React, { useState,useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
  import Icon from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';


export const DeleteDrawModal = ({Open,setOpen,Drawitem,SetDrawings}) => {


    const Delete=async()=>{
        try{
            const mydrawings = await AsyncStorage.getItem('MyDrawings')
            const Filtered=JSON.parse(mydrawings).filter(item=>item.id!=Drawitem.id);
            SetDrawings(Filtered)
            await AsyncStorage.setItem('MyDrawings', JSON.stringify(Filtered));
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

    // const shareImageDataUri = () => {
    //   Share.share({
    //     title: 'Resmi Paylaş',
    //     message: 'Resmi paylaşmak için seçin',
    //     url: Drawitem.Base64,
    //   })
    //     .then((res) => {
    //       if (res.action === Share.sharedAction) {
    //         console.log('Paylaşma işlemi başarılı:', res.activityType);
    //       } else if (res.action === Share.dismissedAction) {
    //         console.log('Paylaşma işlemi iptal edildi');
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('Paylaşma hatası:', err);
    //     });
    // };

    const shareBase64Image = () => {
    //  const imageDataUri = `data:image/png;base64,${base64Data}`;
    console.log(Drawitem.backgroundColor)
        const title=Drawitem.DrawTitle;
        const massage="selam dünya";
      Share.open({ title, massage, url: Drawitem.Base64 })
        .then((res) => console.log('Paylaşma başarılı:', res))
        .catch((err) => console.log('Paylaşma hatası:', err));
        setOpen(!Open)
    };

  return (
    
    <Modal onBackdropPress={()=>Close()} animationOutTiming={200} animationOut={"bounceOutDown"} animationIn={"bounceInUp"} isVisible={Open}>
      <View style={style.main}>
        {/* <Text style={style.TextQuestion}>Are you sure want to delete this note ?</Text> */}
        <View style={style.ViewModal}>
            <TouchableOpacity onPress={()=>shareBase64Image()} style={{flexDirection:"row",alignItems:"center",backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,elevation:5,borderRadius:5}}>
            <Icon  name="share" size={18} color="#388E3C" />
   <Text style={style.TextQuestionsAnswer1}>Share</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>Delete()} style={{flexDirection:"row",alignItems:"center",marginTop:0,backgroundColor:"#FFF0B1",paddingHorizontal:10,paddingVertical:5,marginLeft:20,elevation:5,borderRadius:5}}>
            <Icon name="remove" size={18} color="#FF7043" /><Text style={style.TextQuestionsAnswer2}>Delete Drawing</Text>
                </TouchableOpacity>
        </View>
      </View>
    </Modal>

  )
}

const style=StyleSheet.create({
    main:{flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#03A9F4",height:100,borderRadius:15,elevation:5},
    TextQuestion:{fontSize:16,color:"#1976D2",fontWeight:"500"},
    ViewModal:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
    TextQuestionsAnswer1:{fontSize:17,color:"#388E3C",fontWeight:"500",marginLeft:5},
    TextQuestionsAnswer2:{fontSize:17,color:"#FF7043",fontWeight:"500",marginLeft:5}
})


