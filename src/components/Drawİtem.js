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
import { DeleteDrawModal } from './DeleteDrawModal';

export const Drawİtem = ({SetDrawings,item}) => {

   const[Open,setOpen]=useState(false);

   const Navigation=useNavigation();

   const styles=StyleSheet.create({
    main:{flex:1,backgroundColor:item.backgroundColor,width:"43%",flexDirection:"column",padding:10,borderRadius:15,marginLeft:10,elevation:5,marginBottom:20,marginRight:5},
    TextBaslik:{fontSize:16,color:"#000000",fontWeight:"400",marginBottom:5},
    TextGovde:{fontSize:15,color:"#000000",fontWeight:"400",lineHeight:19,width:"100%",marginTop:5},
    TextTarih:{fontSize:14,color:"#000000",fontWeight:"400"},
    View2:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5},
    View1:{flexDirection:"column",alignItems:"center",justifyContent:"flex-start"}
})

const OpenModal=()=>{
  setOpen(true)
}

  return (
      <TouchableOpacity  onPress={()=>Navigation.navigate("Drawid",{id:item.id,DrawTitle:item.DrawTitle,backgroundColor:item.backgroundColor,Draw64:item.Draw64,Time:item.Time})} onLongPress={()=>OpenModal()}  style={styles.main}>
       <DeleteDrawModal SetDrawings={SetDrawings} Drawitem={item} setOpen={setOpen} Open={Open} /> 
            <View style={styles.View1}>
              <View style={{alignItems:"center",justifyContent:"center"}}>
          {/* <Image source={{ uri: item.Base64 }} resizeMode="contain" style={{width:150, height: 100, borderWidth:0.5,
            borderColor:"#03A9F4",borderRadius: 10}} /> */}
             <Image style={{borderRadius:5}} resizeMode="contain" source={require("../images/draw8.png")} /> 
            </View>
            <Text numberOfLines={2} style={styles.TextGovde}>
  {item.DrawTitle.trim().length > 30
    ? item.DrawTitle.trim().substring(0, 30) + "..."
    : item.DrawTitle.trim()}
</Text>
            </View>
        <View style={styles.View2}>
        <Text style={styles.TextTarih}> 
  {new Date(item.Time).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  }).replace(',', '')}
</Text>
        </View>   
        </TouchableOpacity> 

    
  )

}


