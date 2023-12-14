import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './buttonCamera';
import axios from 'axios';


export default function CameraPage ({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.front);
  // const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  // const cameraRef = useRef(null);
  const [showLoading,setshowLoading] = useState(false)


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const call_Url_base64img = async (base64img) => {
    try {
      const response = await axios.post('http://192.168.1.242:8000/find_target_face', {
        image_base64 : base64img
      });

    switch (response.data.lock) {
      case 0:
        setshowLoading(false)
        Alert.alert("Không phát hiện người trước camera","Try again!")
        break;
      case 1:
        setshowLoading(false)
        Alert.alert("Trong cùng một lần sử dụng", "Chỉ duy nhất một người trước camera!")
        break;
      case 2:
        const fullname_exist = response.data.fullname
        const checkin_info_number = response.data.checkin_info_number
        navigation.navigate("ShowInfoPage", {fullname_exist:fullname_exist,checkin_info_number:checkin_info_number})
        break;
      case 3:
        const num_rows_id = response.data.number_id
        navigation.navigate("InputPage", {num_rows_id:num_rows_id})
        break;
      default:setshowLoading(false)
        Alert.alert("Error", "Data is invalid. Please check again.");
        break;
    }                   

    } catch (error) {
      console.error(error);
    }
  };

  const takePicture = async () => {
    
    if (cameraRef) {
      try {
        const options = { base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const convertTo64 = await data.base64
        setshowLoading(true)
        call_Url_base64img(convertTo64)
      } catch (error) {
        Alert.alert("Error","---------");
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {showLoading && (
        <View style={{width:"100%", height:"100%", backgroundColor:(255,255,255,0.5), zIndex: 2, justifyContent:"center", alignItems:"center"}}>
          <Text style ={{color:"#fff", fontSize:25}}>Bạn đợi tôi kiểm tra xíu nha</Text>
          <Text style ={{color:"#fff", fontSize:20}}>Mất vài giây thôi</Text>
        </View>
      )}
      
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    height: '25%',
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
