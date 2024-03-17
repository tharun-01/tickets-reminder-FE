import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Image,
  ViewBase,
  PermissionsAndroid,
  Button,
  Platform
} from 'react-native';
import {CSK, WhistleOff, WhistleOn} from './images';
import LocalNotification from './LockalNotfication';

import RemoteNotification from './RemoteNotification';

function NotificationPreference() {
  const [notificationState, setNotificationState] = useState(true);
  useEffect(()=>{
    //callAPi
    setNotificationState(false);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  },[])

  const OnNotficationPreferencePress=()=>{
    //callApi
    setNotificationState(!notificationState);
  }


  useEffect(async()=>{
    if(Platform.OS="android"){
      try{
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      }catch(error){
        console.error(error);
      }
    }
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.user}>Hiii USER</Text>
      </View>
      
      <RemoteNotification/>
      
      
      <Image
        source={CSK}
        style={{width: 300, height: 300}}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={LocalNotification}>
        <Image
          source={notificationState ? WhistleOn : WhistleOff}
          style={{borderBottomLeftRadius: 40, borderBottomRightRadius: 40, width:150,height:150}}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Button title={"click here"} onPress={()=>{
         setNotificationState(!notificationState);
         LocalNotification()
      }} />
    </View>
  );
}

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginContainerStyles: {flex: 1, backgroundColor: 'red'},
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor:"white"
  },
  user: {
    color: '#FFD700',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 1},
    textShadowRadius: 1,
  },
});

export default NotificationPreference;
