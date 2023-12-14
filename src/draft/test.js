import React, { useEffect, useState, useRef } from "react";
import { Alert, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getCameraPermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
import axios from 'axios';

export default ({navigation}) => {
  const [type, setType] = useState(CameraType.front);
  const [isHidden, setIsHidden] = useState(false);
  const cameraRef = useRef();

  const call_Url_base64img = async (base64img) => {
    try {
      const response = await axios.post('http://192.168.1.241:8000/find_target_face', {
        image_base64 : base64img
      });

    switch (response.data.lock) {
      case 0:
        // setshowLoading(false)
        Alert.alert("Không phát hiện người trước camera","Try again!")
        break;
      case 1:
        // setshowLoading(false)
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
      default:
        // setshowLoading(false)
        Alert.alert("Error", "Data is invalid. Please check again.");
        break;
    }                   

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissions Required!",
        "You need to provide the permissions to access the camera",
        [{ text: "Got it" }]
      );
    }

    await requestMicrophonePermissionsAsync();
  };

  const getPermissions = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    const microphonePermission = await getMicrophonePermissionsAsync();
    return cameraPermission.granted && microphonePermission.granted;
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const convertTo64 = await data.base64
        // setshowLoading(true)
        call_Url_base64img(convertTo64)
      } catch (error) {
        Alert.alert("Error");
      }
    }
  };
    
  if (!getPermissions()) {
    return null;
  }

  return (
    <View style={styles.container}>
      {!isHidden && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
        />
      )}
      <View style={styles.overlay} />
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.takePictureButton}
            onPress={takePicture}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    zIndex:-1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  controlsContainer: {
    height: "100%",
    backgroundColor: "#0909",
    alignItems:"center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    left: 0,
    position: "absolute",
    right: 0,
  },
  takePictureButton: {
    backgroundColor: "#fff",
    borderRadius: 35,
    height: 70,
    marginVertical: 10,
    width: 70,
  },
  previewImage: {
    flex: 1,
  },
});
