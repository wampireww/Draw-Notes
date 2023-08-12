import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home'
import { Notes } from '../pages/Notes';
import { NewNote } from '../pages/NewNote';
import { Noteid } from '../pages/Noteid';
import { Drawings } from '../pages/Drawings';
import { NewDrawing } from '../pages/NewDrawing';
import { Drawid } from '../pages/Drawid';


export const AppNavigation = () => {

    const Stack=createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{  cardStyle: { backgroundColor: 'transparent' },
    gestureEnabled: false,
    presentation: 'transparentModal',}} initialRouteName='Home' >
    <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
    <Stack.Screen name="Notes" component={Notes} />
    <Stack.Screen name="NewNote" component={NewNote} />
    <Stack.Screen name="Noteid" component={Noteid} />
    <Stack.Screen name="Drawings" component={Drawings} />
    <Stack.Screen name="NewDrawing" component={NewDrawing} />
    <Stack.Screen name="Drawid" component={Drawid} />

    </Stack.Navigator>
    </NavigationContainer>
  )
}
