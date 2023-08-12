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
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
import { Deletemodal } from './Deletemodal';

export const Notİtem = ({SetMyNotes,item}) => {

   const[Open,setOpen]=useState(false);

   const Navigation=useNavigation();

   const styles=StyleSheet.create({
    main:{flex:1,backgroundColor:item.backgroundColor,width:"43%",flexDirection:"column",padding:10,borderRadius:15,marginLeft:10,elevation:5,marginBottom:20,marginRight:5},
    TextBaslik:{fontSize:16,color:"#000000",fontWeight:"400",marginBottom:5},
    TextGovde:{fontSize:15,color:"#000000",fontWeight:"400",lineHeight:19},
    TextTarih:{fontSize:14,color:"#000000",fontWeight:"400"},
    View2:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}
})

const OpenModal=()=>{
  setOpen(true)
}

  return (
      <TouchableOpacity  onPress={()=>Navigation.navigate("Noteid",{id:item.id,NotBody:item.NotBody,NotTitle:item.NotTitle,backgroundColor:item.backgroundColor})} onLongPress={()=>OpenModal()}  style={styles.main}>
        <Deletemodal SetMyNotes={SetMyNotes} Notitem={item} setOpen={setOpen} Open={Open} />
        {item.NotTitle.trim().length !== 0 && (
  <Text numberOfLines={1} style={styles.TextBaslik}>
    {item.NotTitle.trim().replace(/\s/g, '').length > 50
      ? item.NotTitle.trim().substring(0, 50) + "..."
      : item.NotTitle.trim()}
  </Text>
)}
     <Text numberOfLines={2} style={styles.TextGovde}>
  {item.NotBody.trim().length > 150
    ? item.NotBody.trim().substring(0, 150) + "..."
    : item.NotBody.trim()}
</Text>
        <View style={styles.View2}>
        <Text style={styles.TextTarih}> {new Date(item.Time).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24 saatlik format
  })}</Text>
        {/* <TouchableOpacity onPress={()=>CopyContent()} style={{elevation:5}}><Icon name="copy" size={18} color="#263238" /></TouchableOpacity> */}
        </View>   
        </TouchableOpacity> 

    
  )

}

// const styles=StyleSheet.create({
//     main:{backgroundColor:backgroundColor,width:"95%",flexDirection:"column",padding:10,borderRadius:15,marginLeft:10,elevation:5,marginBottom:20},
//     TextBaslik:{fontSize:15,color:"#000000",fontWeight:"400"},
//     TextGovde:{fontSize:14,color:"#000000",fontWeight:"400"},
//     TextTarih:{fontSize:14,color:"#455A64",fontWeight:"400"},
//     View2:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5}
// })
