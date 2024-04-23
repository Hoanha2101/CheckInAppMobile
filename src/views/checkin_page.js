import React, { useEffect, useState, useRef } from "react";
import { Alert, StyleSheet, View, ScrollView,TouchableOpacity, Image, Dimensions, Animated,Text, ImageBackground, Button,ActivityIndicator } from "react-native";
import { Camera, CameraType } from "expo-camera";
import axios from 'axios';
import { Video } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { useScrollToTop } from '@react-navigation/native';
import * as config from "../views/config.js";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Separator = () => <View style={{marginVertical: 8, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal:10, marginVertical:0.01*windowHeight}} />;

export default CheckInPage = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const cameraRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);
    const video = React.useRef(null);

    const [showButtonEndV_ToShowInfo, setShowButtonEndV_ToShowInfo] = useState(false)
    const [showButtonEndV_ToInput, setShowButtonEndV_ToInput] = useState(false)

    const [fullname_exist,setfullname_exist] = useState(null)
    const [checkin_info_number,setcheckin_info_number] = useState(null)
    const [num_rows_id,setnum_rows_id] = useState(null)
    const [id_no_extract,setid_no_extract] = useState(null)
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [showTaskbarMini, setShowTaskbarMini] = useState(false);
    const taskbarAnimation = new Animated.Value(showTaskbar ? -(windowWidth/2) : 0);

    const taskbarAnimation_mini_ai = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);
    const taskbarAnimation_mini_ktpm = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);
    const taskbarAnimation_mini_dm = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);
    const taskbarAnimation_mini_ttdpt = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);
    const taskbarAnimation_mini_tkmts = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);
    const taskbarAnimation_mini_qtkd = new Animated.Value(showTaskbarMini ? -(windowWidth/2) : 0);

    
    const [ContentShowLoading, setContentShowLoading] = useState("Vui lòng đợi xử lí...")
    const [LoadingSpin, SetLoadingSpin] = useState("loading")
    const [ContentShowLoadingColor, SetContentShowLoadingColor] = useState("#FA0501")

    const rotateAnimValue = useRef(new Animated.Value(0)).current;
// ----------------------------------------------------------------Phần chuyển động của nút đăng kí tư vấn
  useEffect(() => {
    const shakeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnimValue, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(rotateAnimValue, { toValue: -1, duration: 300, useNativeDriver: true }),
        Animated.timing(rotateAnimValue, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
      { iterations: -1 }
    );

    shakeAnimation.start();

    return () => {
      shakeAnimation.stop();
    };
  }, [rotateAnimValue]);

  const rotateInterpolate = rotateAnimValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-25deg', '25deg'],
  });

  const animatedStyles_dangkituvan = {
    transform: [{ rotate: rotateInterpolate }],
  };
// ---------------------------------------------------------------- Phần animation của chữ "Đăng kí tư vấn"

const translateYAnimValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  const fadeInOutAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(translateYAnimValue, { toValue: -10, duration: 1000, useNativeDriver: true }),
      Animated.timing(translateYAnimValue, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]),
    { iterations: -1 }
  );

  fadeInOutAnimation.start();

  return () => {
    fadeInOutAnimation.stop();
  };
}, [translateYAnimValue]);

const animatedStyles = {
  transform: [{ translateY: translateYAnimValue }],
};
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const handleTaskbarPressOn = async () => {
    Animated.timing(taskbarAnimation, {
      toValue: windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarPressOff = async () => {
    Animated.timing(taskbarAnimation, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
// {--------------------------------------------------------}
  const handleTaskbarMiniPressOn_ai = async () => {
    Animated.timing(taskbarAnimation_mini_ai, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_ai = async () => {
    Animated.timing(taskbarAnimation_mini_ai, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start()
  };

  const handleTaskbarMiniPressOn_ktpm = async () => {
    Animated.timing(taskbarAnimation_mini_ktpm, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_ktpm = async () => {
    Animated.timing(taskbarAnimation_mini_ktpm, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTaskbarMiniPressOn_dm = async () => {
    Animated.timing(taskbarAnimation_mini_dm, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_dm = async () => {
    Animated.timing(taskbarAnimation_mini_dm, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTaskbarMiniPressOn_ttdpt = async () => {
    Animated.timing(taskbarAnimation_mini_ttdpt, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_ttdpt = async () => {
    Animated.timing(taskbarAnimation_mini_ttdpt, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTaskbarMiniPressOn_tkmts = async () => {
    Animated.timing(taskbarAnimation_mini_tkmts, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_tkmts = async () => {
    Animated.timing(taskbarAnimation_mini_tkmts, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTaskbarMiniPressOn_qtkd = async () => {
    Animated.timing(taskbarAnimation_mini_qtkd, {
      toValue: windowWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const handleTaskbarMiniPressOff_qtkd = async () => {
    Animated.timing(taskbarAnimation_mini_qtkd, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // {--------------------------------------------------------}
  const SkipToInput = async () => {
    setShowVideo(false)
    setShowButtonEndV_ToInput(false)
    setContentShowLoading("Vui lòng đợi xử lí...")
    SetLoadingSpin("loading")
    SetContentShowLoadingColor("#FA0501")
    navigation.navigate("InputPage", { num_rows_id: num_rows_id });
  };

  const SkipToShowInfo = async () => {
    setShowVideo(false)
    setShowButtonEndV_ToShowInfo(false)
    setContentShowLoading("Vui lòng đợi xử lí...")
    SetLoadingSpin("loading")
    SetContentShowLoadingColor("#FA0501")
    navigation.navigate("ShowInfoPage", { fullname_exist: fullname_exist, checkin_info_number: checkin_info_number,num_rows_id: num_rows_id,id_no_extract:id_no_extract });
  };

  const call_Url_base64img = async (base64img) => {
    try {
      const response = await axios.post(config.url + "/compare_face", {
        image_base64: base64img
      });
      switch (response.data.lock) {
        case 0:
            setShowVideo(false)
            Alert.alert("Không phát hiện người","\"Nếu có khẩu trang hãy bỏ nó xuống để hệ thống biết bạn\"");
            break;
        case 1:
            setShowVideo(false)
            Alert.alert("Trong cùng một lần check In", "Chỉ duy nhất một người!");
            break;
        case 2:
            setnum_rows_id(response.data.number_id)
            setid_no_extract(response.data.id_no_extract)
            setfullname_exist(response.data.fullname);
            setcheckin_info_number(response.data.checkin_info_number);
            SetLoadingSpin("success")
            SetContentShowLoadingColor("#2ADE2D")
            setContentShowLoading("Đã tải dữ liệu hoàn tất")
            setShowButtonEndV_ToShowInfo(true)
            break;
        case 3:
            setnum_rows_id(response.data.number_id);
            SetLoadingSpin("success")
            SetContentShowLoadingColor("#2ADE2D")
            setContentShowLoading("Đã tải dữ liệu hoàn tất")
            setShowButtonEndV_ToInput(true)
            break;
        default:
            setShowVideo(false)
            Alert.alert("Error", "Data is invalid. Please check again.");
            break;
          }

    } catch (error) {
      console.error(error);
    }
    };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const convertTo64 = await data.base64;
        setShowVideo(true)
        call_Url_base64img(convertTo64);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {showVideo && (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#000", zIndex: 1 , justifyContent:"center", alignItems:"center"}}>
          <Video
            ref={video}
            source={require('../videos/loadingvideo.mp4')}
            shouldPlay
            useNativeControls
            resizeMode="contain"
            isLooping
            style={{ flex: 1, alignSelf: 'stretch' }}
          />
          <View style={styles.overlay_}>
              <View style={{ height: 30, width: "100%", top: -150,zIndex: 2,alignItems:"center"}}>
                <View style={{top:-20,width:"90%",height:50,flexDirection:"row",justifyContent:"space-around", 
                alignItems:"center",backgroundColor:"#fff",
                borderBottomWidth:2,borderRightWidth:2, borderBottomColor:"#F4D18E",borderRightColor:"#F4D18E",borderStyle: "solid",borderBottomRightRadius:200, borderTopRightRadius:200,borderBottomLeftRadius:60, borderTopLeftRadius:60}}>
                  <Text style={{ color: ContentShowLoadingColor, fontSize: 16,fontWeight:800,textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1}}>{ContentShowLoading}</Text>
                  {LoadingSpin === "loading" &&(<ActivityIndicator style={{}} size={"small"} color = "#FA0501"/>)}
                  {LoadingSpin === "success" && (<Icon name="check-square-o" style ={{textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2}} size={20} color="#2ADE2D"/>)}
                </View>
                {showButtonEndV_ToShowInfo && (
                <View style={{zindex:3,width:"100%", height:40, bottom: 100 - (windowHeight/2),justifyContent: "center", alignItems: "center",right: -((windowWidth/2)-100),}}>
                  <TouchableOpacity
                    style={{flexDirection:"row", backgroundColor: "#fff", height: 40, width: 150, justifyContent: "center", alignItems: "center", borderRadius: 20,borderBottomWidth:2,borderRightWidth:2, borderBottomColor:"#F4D18E",borderRightColor:"#F4D18E" }}
                    onPress={SkipToShowInfo}>
                    <Text style={{ fontSize: 20, color: "#C01EFA", fontWeight: "bold",marginRight:5 }}>Skip</Text>
                    <Icon name="forward" style ={{}} size={22} color="#FA002E" />
                  </TouchableOpacity>
                </View> )}

                {showButtonEndV_ToInput && (
                <View style={{zindex:3,width:"100%", height:40, bottom: 100 - (windowHeight/2),justifyContent: "center", alignItems: "center",right: -((windowWidth/2)-100)}}>
                  <TouchableOpacity
                    style={{flexDirection:"row", backgroundColor: "#fff", marginBottom: 0.1 * windowHeight, height: 40, width: 150, justifyContent: "center", alignItems: "center", borderRadius: 20,borderBottomWidth:2,borderRightWidth:2, borderBottomColor:"#F4D18E",borderRightColor:"#F4D18E" }}
                    onPress={SkipToInput}>
                    <Text style={{ fontSize: 20, color: "#C01EFA", fontWeight: "bold" , marginRight:5}}>Skip</Text>
                    <Icon name="forward" style ={{}} size={22} color="#FA002E" />
                  </TouchableOpacity>
                </View>)}
              </View>

            
          
          </View>
        </View>
      )}
      
      {isFocused && (
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
      />)}
      {/* <View style={styles.overlay} /> */}
      <View style={styles.controlsContainer}>
        <ImageBackground style={{ height: '100%', width: '100%', backgroundColor:"#000"}} source={require('../images/CheckIn_bg.jpg')} resizeMode='stretch'>
          <View style={{ height: '100%', width: '100%',justifyContent: "space-between",}}>
            {/* {Greeting} */}
            <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", marginTop:28, height:50,}}>
              <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginLeft:26}}>
                <Icon name="mortar-board" style ={{}} size={28} color="#fff" />
                <Text style={{ fontWeight:800,marginLeft:10,fontSize: 24, color: "#f26f21", textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                  ĐẠI HỌC FPT
                </Text>
              </View>

              <View>
                <TouchableOpacity style={{}}
                onPress={handleTaskbarPressOn}>
                    <Icon name="bars" style ={{marginLeft:-60}} size={30} color="#fff"/>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ marginLeft:26}}>
              <Text style={{ fontSize: 30,fontWeight:900, color: "#fff", textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                Cùng đi tới thành công
              </Text>
              <Text style={{ fontSize: 30,fontWeight:900, color: "#fff", textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                Tiếp nguồn sinh khí
              </Text>
      
              <Text style={{ paddingTop:20,fontSize: 18,fontWeight:500, color: "#fff", textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                Trường đại học công nghệ hàng đầu Việt Nam
              </Text>
              <Text style={{ fontSize: 18, color: "#fff",fontWeight:500, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                Trẻ trung, năng động
              </Text>

            </View>
            <View style={{height:180, marginBottom:50,justifyContent: "space-between",width:"100%", paddingHorizontal:26}}>
              {/* {check In Button} */}
              <TouchableOpacity
                style={{ backgroundColor: "#fff", height: 70, width: 200, borderRadius: 14,borderColor:"white",flexDirection:"row", justifyContent: "center", alignItems:"center"}}>
                  <Icon name="search" style ={{marginRight:6}} size={30} color="#5900CC"/>
                  
                <Text style={{ fontSize: 26, color: "#000", fontWeight: "bold", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,marginRight:6 }}>Tra Cứu</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 70, width: '100%', }}>
                <TouchableOpacity
                  style={{ backgroundColor: "#fff", height: 70, width: 200, borderRadius: 14,borderColor:"white",flexDirection:"row", justifyContent: "center", alignItems:"center"}}
                  onPress={takePicture}>
                    <Icon name="location-arrow" style ={{marginRight:6, }} size={30} color="#5900CC"/>
                    
                  <Text style={{ fontSize: 26, color: "#000", fontWeight: "bold", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,marginRight:6 }}>Check In</Text>
                </TouchableOpacity>
                
                <View style={{top:-200, alignItems:"center",}}>
                  <Animated.View style={animatedStyles}>
                    <View style={{ height:150,width:50,alignItems:"center",backgroundColor:"#f26f21", justifyContent:"center", borderTopRightRadius:10,borderTopLeftRadius:10, borderBottomRightRadius:60,borderBottomLeftRadius:60}}>
                      <Text style={{fontSize:18,color:"#fff", fontWeight:700}}>Đăng</Text>
                      <Text style={{fontSize:18,color:"#fff", fontWeight:700}}>kí</Text>
                      <Text style={{fontSize:18,color:"#fff", fontWeight:700}}>Tư</Text>
                      <Text style={{fontSize:18,color:"#fff", fontWeight:700}}>Vấn</Text>
                      <Icon name="caret-down" style ={{}} size={30} color="#5900CC"/>
                    </View>
                  </Animated.View>
                  <TouchableOpacity style={{backgroundColor:"#fff", width:70, height:70, borderRadius:35, alignItems:"center", justifyContent:"center", marginTop:20}}
                    onPress = {()=> {navigation.navigate("SignUpAdvisePage")}}>
                    <Animated.View style={animatedStyles_dangkituvan}>
                      <Icon name="edit" style ={{}} size={36} color="#5900CC"/>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Animated.View style={[ styles.taskbar,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation,
                    },
                    ],
                },
                ]}>
            
              <View style={{width:((windowWidth*4)/5), height:"100%", backgroundColor:"#fff", paddingBottom:30, paddingHorizontal:18, paddingTop:70, borderRightWidth:2,borderRightColor:"#f26f21" }}>
                <View style= {{width:"100%",height:"100%",justifyContent:"space-between"}}>
                  <View style={{width:"100%",height:40, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:"#f26f21", fontSize:28, fontWeight:900}}>
                      NGÀNH ĐÀO TẠO
                    </Text>
                  </View>

                  <View>
                    <View style={{height:50}}>
                      <TouchableOpacity  onPress={handleTaskbarMiniPressOn_ai}>
                        <Text style={{fontSize:18, fontWeight:700}} >
                          Trí tuệ nhân tạo
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height:50}}>
                      <TouchableOpacity onPress={handleTaskbarMiniPressOn_ktpm}>
                        <Text style={{fontSize:18, fontWeight:700}}>
                          Kĩ thuật phần mềm
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height:50}}>
                      <TouchableOpacity onPress={handleTaskbarMiniPressOn_dm}>
                        <Text style={{fontSize:18, fontWeight:700}}>
                          Digital marketing
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height:50}}>
                      <TouchableOpacity onPress={handleTaskbarMiniPressOn_ttdpt}>
                        <Text style={{fontSize:18, fontWeight:700}}>
                          Truyền thông đa phương tiện
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height:50}}>
                      <TouchableOpacity onPress={handleTaskbarMiniPressOn_tkmts}>
                        <Text style={{fontSize:18, fontWeight:700}}>
                          Thiết kế mĩ thuật số
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height:50}}>
                      <TouchableOpacity onPress={handleTaskbarMiniPressOn_qtkd}>
                        <Text style={{fontSize:18, fontWeight:700}}>
                          Kinh doanh quốc tế
                        </Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                  <View style={{width:"100%",alignItems:"center"}}>
                    <View style={{width:"60%", aspectRatio: 1,}}>
                      <Image source={require('../images/logofpt.png')} style={{flex: 1, width: undefined, height: undefined}} resizeMode="contain" />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style = {{width:((windowWidth)/5),height:"100%",}} onPress={handleTaskbarPressOff}></TouchableOpacity>
              
            </Animated.View>

            <Animated.View
              style={[
                styles.taskbar_mini,
                {
                  transform: [
                    {
                      translateX: taskbarAnimation_mini_ai,
                    },
                  ],
                },
              ]}>
              <View style={{backgroundColor: "#fff",
                  width: "100%",
                  height: 80,
                  justifyContent: "flex-end",
                  borderBottomRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 11,
                  },
                  shadowOpacity: 0.51,
                  shadowRadius: 16,
                  elevation: 23,
                }}
              >
              <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
                <View>
                  <TouchableOpacity
                    style={{
                      width: 60,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 4,
                    }}
                    onPress={handleTaskbarMiniPressOff_ai}>
                    <Icon name="arrow-left" style={{}} size={40} color="#f26f21" />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight: 26,}}>
                  <Text style={{fontWeight: "600",marginLeft: 10,fontSize: 24,color: "#f26f21",}}>
                    Trí tuệ nhân tạo
                  </Text>
                </View>
              </View>
              </View>

            <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biattnt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:20}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:20}}>
                TRIỂN VỌNG NGHỀ NGHIỆP
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
                Trong bối cảnh Cách mạng Công nghiệp 4.0 phát triển không ngừng, Trí tuệ
                Nhân tạo là lĩnh vực quan trọng. Sinh viên ngành Trí tuệ Nhân tạo là nhân
                tố ưu tú được các nhà tuyển dụng săn đón với mức lương lý tưởng.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:10}}>
                Cử nhân ngành Trí tuệ Nhân tạo làm việc tại Trung tâm phát triển Trí tuệ Nhân tạo;
                Trung tâm điều tra, khảo sát, phân tích/xử lý dữ liệu lớn của các Tập đoàn
                công nghệ, Ngân hàng; Viện nghiên cứu về Trí tuệ nhân tạo, các doanh nghiệp
                với đa dạng vị trí: Chuyên viên phát triển ứng dụng AI; Chuyên gia dữ liệu;
                Chuyên gia xử lý hình ảnh; Chuyên viên quản trị dữ liệu lớn; Chuyên viên
                phân tích hệ thống; Kỹ sư phát triển hệ thống tự động hóa, Robot. Ngoài ra,
                sinh viên Khởi nghiệp trong lĩnh vực cung cấp, phát triển các chương
                trình/giải pháp phân tích dữ liệu và ứng dụng Trí tuệ Nhân tạo trong cuộc
                sống.
              </Text>
              <Video
                source={require("../videos/ttnt_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 200, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                    Kỹ sư phát triển ứng dụng AI
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                    Kỹ sư phát triển hệ thống tự động hóa, robot
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                    Kiến trúc sư dữ liệu
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                    Chuyên gia nghiên cứu chuyên sâu về AI
                  </Text>
                </View>
              </View>
              
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
          </Animated.View>

            <Animated.View style={[styles.taskbar_mini,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation_mini_ktpm,
                    },
                    ],
                },
                ]}>
                <View style={{backgroundColor:"#fff",width:"100%",height:80,justifyContent: 'flex-end',
                borderBottomRightRadius: 12,borderBottomLeftRadius: 12,
                shadowBottomColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowBottomOpacity: 0.51,
                shadowBottomRadius: 16,
                elevation: 23,}}>
                  <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", }}>
                    <View>
                        <TouchableOpacity style = {{width:60,height:60,justifyContent:"center",alignItems:"center",marginLeft:4,}}
                                    onPress={handleTaskbarMiniPressOff_ktpm}>
                            <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                        Kĩ thuật phần mềm
                        </Text>
                    </View>
                  </View> 
              </View>
              <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biaktpm.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:10}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:10}}>
                ĐỊNH HƯỚNG ĐÀO TẠO
              </Text>

              <Text style={{ fontSize: 22, marginBottom:20}}>
              Tốt nghiệp ngành Kỹ thuật phần mềm, sinh viên làm việc liên quan đến công nghệ phần mềm ở đa dạng các lĩnh vực: lập trình - xây dựng, giải pháp, phân tích, kiểm thử, quản lý chất lượng... phần mềm nói riêng và ứng dụng Công nghệ thông tin vào vận hành doanh nghiệp nói chung. 
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Hiện tại, sinh viên Đại học FPT đã và đang làm việc tại Mỹ, Đức, Nhật Bản, Singapore – những thị trường Công nghệ Thông tin hàng đầu của thế giới.
              </Text>
              <Video
                source={require("../videos/ktpm_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 200, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giám đốc kỹ thuật
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Quản lý dự án (PM)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Lập trình viên (Coder)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Kỹ sư cầu nối (BrSE)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Kiểm thử phần mềm (Tester)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Kỹ sư đảm bảo chất lượng phần mềm
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Quản lý dự án Công nghệ Thông tin
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Quản lý kỹ thuật
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Quản trị viên dự án phần mềm và CNTT
                  </Text>
                </View>
              </View>
              
              
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
            </Animated.View> 
            <Animated.View style={[styles.taskbar_mini,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation_mini_dm,
                    },
                    ],
                },
                ]}>
                <View style={{backgroundColor:"#fff",width:"100%",height:80,justifyContent: 'flex-end',
                borderBottomRightRadius: 12,borderBottomLeftRadius: 12,
                shadowBottomColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowBottomOpacity: 0.51,
                shadowBottomRadius: 16,
                elevation: 23,}}>
                  <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", }}>
                    <View>
                        <TouchableOpacity style = {{width:60,height:60,justifyContent:"center",alignItems:"center",marginLeft:4,}}
                                    onPress={handleTaskbarMiniPressOff_dm}>
                            <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                       Digital marketing 
                        </Text>
                    </View>
                  </View> 
              </View>
              <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biadm.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:10}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:10}}>
              TRIỂN VỌNG NGHỀ NGHIỆP
              </Text>

              <Text style={{ fontSize: 22, marginBottom:20}}>
              Theo nghiên cứu đến năm 2030, gần 2 tỷ thanh niên trên toàn thế giới có thể rơi vào tình trạng thất nghiệp do tác động từ cuộc Cách mạng công nghiệp 4.0. Máy móc, robot được sử dụng thay thế cho con người ngày càng nhiều. Trong khi đó, kỷ nguyên số này lại mở ra cho nhân sự Digital Marketing một tương lai rộng mở với mức thu nhập đáng mơ ước.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Tại Việt Nam, We are social đã khảo sát và chỉ ra tỷ lệ sử dụng Internet là 64 triệu người, chiếm 67% dân số. Người dùng các thiết bị di động chiếm 73% dân số là 70,03 triệu người. Việt Nam hiện đang là quốc gia có tỷ lệ sử dụng các nền tảng mạng xã hội cao với 50 triệu người hiện đang sử dụng chiếm 52%. Thống kê, trung bình một ngày, người dùng Việt Nam dành ra 6 giờ 52 phút để truy cập mạng Internet. Trong đó, 2 giờ 37 phút để sử dụng mạng xã hội, 2 giờ 43 phút để xem các stream hoặc video online, và dùng 1 giờ 21 phút để nghe nhạc trực tuyến.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Với sự chiếm hữu mạnh mẽ của Internet với người dùng này, các hình thức Marketing truyền thống dần mất đi hiệu quả. Thay vào đó, Digital Marketing trở thành phương pháp tiếp cận khách hàng tất yếu của mọi doanh nghiệp. 
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Đứng trước nhu cầu nguồn nhân lực chất lượng cao ngày càng bức thiết, ĐH FPT Quy Nhơn chính thức đưa ngành Digital Marketing thành một ngành đào tạo chính quy tại trường. 
              </Text>
              <Video
                source={require("../videos/dm_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 200, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên phát triển và quản trị thương hiệu
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giảng dạy, nghiên cứu về Marketing, quản trị Marketing
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên tại các công ty hoạt động trong lĩnh vực Marketing
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên nghiên cứu thị trường
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên chăm sóc khách hàng, quan hệ công chúng
                  </Text>
                </View>
              </View>
              
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
            </Animated.View>

            <Animated.View style={[styles.taskbar_mini,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation_mini_ttdpt,
                    },
                    ],
                },
                ]}>
                <View style={{backgroundColor:"#fff",width:"100%",height:80,justifyContent: 'flex-end',
                borderBottomRightRadius: 12,borderBottomLeftRadius: 12,
                shadowBottomColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowBottomOpacity: 0.51,
                shadowBottomRadius: 16,
                elevation: 23,}}>
                  <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", }}>
                    <View>
                        <TouchableOpacity style = {{width:60,height:60,justifyContent:"center",alignItems:"center",marginLeft:4,}}
                                    onPress={handleTaskbarMiniPressOff_ttdpt}>
                            <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                       Truyền thông đa phương tiện 
                        </Text>
                    </View>
                  </View> 
              </View>
              <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biattdpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:10}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:10}}>
                TRIỂN VỌNG NGHỀ NGHIỆP
              </Text>

              <Text style={{ fontSize: 22, marginBottom:20}}>
              Theo Trung tâm Dự báo Nhu cầu Nhân lực và Thông tin Thị trường lao động, từ năm 2015 – 2025, mỗi năm sẽ cần đến 21.600 người trong nhóm ngành Truyền thông – Quảng cáo. Tuy nhiên, số lượng học viên đăng ký ngành mỗi năm theo thống kê chỉ khoảng 5.000 – 6.000/ năm. Như vậy,<Text style={{fontWeight:800}}> sinh viên học ngành Truyền thông đa phương tiện luôn trong tình trạng “khan hiếm” và được các doanh nghiệp chào đón.</Text>
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
                <Text style={{fontWeight:800}}>Ngành Truyền thông đa phương tiện trong bối cảnh cách mạng công nghiệp 4.0 bùng nổ mang nhiều điểm khác biệt</Text> so với giai đoạn trước. Những chuyên gia của ngành Truyền thông đa phương tiện trong thời đại số cần ứng dụng và kết hợp thông thạo các phương tiện truyền thông, nhạy bén về thông điệp, sáng tạo để có được những sản phẩm truyền thông ấn tượng mạnh, hướng đến đúng đối tượng mục tiêu và đúng thời điểm.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Các doanh nghiệp hoạt động trong lĩnh vực truyền thông – quảng cáo trong nước cũng dần bắt kịp các xu hướng thế giới, các doanh nghiệp nước ngoài cũng đang để mắt đến nguồn nhân lực từ Việt Nam. Tận dụng Internet là cách quảng bá các sản phẩm truyền thông nhanh nhất và theo thống kê của We Are Social, năm 2018, Việt Nam có 64 triệu người sử dụng Internet đạt 67% dân số. Điều này cho thấy <Text style={{fontWeight:800}}>ngành Truyền thông đa phương tiện trong tương lai vẫn là một ngành thời thượng, có tính cạnh tranh cao và rất hấp dẫn với những ai đam mê đổi mới, thử thách.</Text>
              </Text>
              <Video
                source={require("../videos/ttdpt_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 300, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giám đốc Sản xuất, Giám đốc Sáng tạo, Đạo diễn
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Biên tập viên báo chí/ đài truyền hình
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Phóng viên
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Quản trị truyền thông trực tuyến
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên sản xuất Video
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên quản trị mạng xã hội (Admin)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên đối ngoại và quan hệ công chúng (PR)
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên Marketing trực tuyến/ quảng cáo
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên Tổ chức sự kiện
                  </Text>
                </View>
              </View>
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
            </Animated.View> 
            <Animated.View style={[styles.taskbar_mini,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation_mini_tkmts,
                    },
                    ],
                },
                ]}>
                <View style={{backgroundColor:"#fff",width:"100%",height:80,justifyContent: 'flex-end',
                borderBottomRightRadius: 12,borderBottomLeftRadius: 12,
                shadowBottomColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowBottomOpacity: 0.51,
                shadowBottomRadius: 16,
                elevation: 23,}}>
                  <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", }}>
                    <View>
                        <TouchableOpacity style = {{width:60,height:60,justifyContent:"center",alignItems:"center",marginLeft:4,}}
                                    onPress={handleTaskbarMiniPressOff_tkmts}>
                            <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                       Thiết kế mĩ thuật số 
                        </Text>
                    </View>
                  </View> 
              </View>
              <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biatkmts.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:10}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:10}}>
                TRIỂN VỌNG NGHỀ NGHIỆP
              </Text>

              <Text style={{ fontSize: 22, marginBottom:20}}>
                Với sự phát triển nhanh chóng của truyền thông và quảng cáo tại Việt Nam, Thiết kế Mỹ thuật số (Digital Art & Design) đang trở thành một trong những chuyên ngành hấp dẫn giới trẻ. Đặc biệt đối với bạn trẻ đam mê sáng tạo và thích làm việc trong những môi trường năng động.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
                Từ nền tảng đồ họa căn bản và kỹ năng ứng dụng CNTT trong đồ họa sinh viên được học sâu hơn về quá trình từ hình thành ý tưởng, phác thảo, chỉnh sửa, lựa chọn công nghệ và kỹ thuật; thực hành tạo ra sản phẩm. Sinh viên tốt nghiệp có khả năng kết hợp giữa thiết kế với truyền thông, mỹ thuật, thương mại để đáp ứng tốt những yêu cầu của nền công nghiệp hiện đại. Sinh viên có cơ hội áp dụng kiến thức và kỹ năng vào thiết kế thương hiệu, thiết kế web, thiết kế game, phim, 2D, 3D, thiết kế các ứng dụng cho các thiết bị di động,…
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
                Khác biệt lớn nhất tại Đại học FPT là ngành Thiết kế Mỹ thuật số được xác định phát triển theo định hướng Đồ họa động & tương tác - DIGITAL ART & DESIGN, ứng dụng CÔNG NGHỆ HIỆN ĐẠI trên NỀN TẢNG THẨM MỸ để tạo ra những sản phẩm đột phá, ấn tượng, mang tính ứng dụng và hội nhập, bao gồm các chuyên ngành hẹp về Hoạt hình 2D, Hoạt hình 3D, Thiết kế tương tác, Thực tế ảo (VR), Thực tế tăng cường (AR), Thiết kế game, Thiết kế truyền thông.
              </Text>
              <Video
                source={require("../videos/tkmts_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 300, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giám đốc sản xuất phim hoạt hình, game
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giám đốc sản xuất tại các Production House
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giám đốc tạo hình, Giám đốc diễn hoạt 2D - 3D, Giám đốc sáng tạo.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:60,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Sinh viên trở thành Chuyên viên Thiết kế Diễn hoạt tạo hình nhân vật 2D, 3D cho phim hoạt hình, game, quảng cáo.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Thiết kế giao diện Game, Ứng dụng di động trên điện thoại thông minh.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:60,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Giảng dạy về thiết kế tại các cơ sở có đào tạo Đồ hoạ kỹ thuật số. Chuyên viên nghiên cứu trải nghiệm người dùng.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên gia dựng hình 3D, Chuyên gia diễn hoạt 3D, xử lý vật liệu, chất liệu.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:60,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên gia kĩ xảo hình ảnh; Chuyên gia công nghệ thực tế ảo(VR), thực tế tăng cường(AR); Khởi nghiệp các studio sản xuất và hậu kỳ.
                  </Text>
                </View>
              </View>
              
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
            </Animated.View>

            <Animated.View style={[styles.taskbar_mini,
                {
                    transform: [
                    {
                        translateX: taskbarAnimation_mini_qtkd,
                    },
                    ],
                },
                ]}>
                <View style={{backgroundColor:"#fff",width:"100%",height:80,justifyContent: 'flex-end',
                borderBottomRightRadius: 12,borderBottomLeftRadius: 12,
                shadowBottomColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowBottomOpacity: 0.51,
                shadowBottomRadius: 16,
                elevation: 23,}}>
                  <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", }}>
                    <View>
                        <TouchableOpacity style = {{width:60,height:60,justifyContent:"center",alignItems:"center",marginLeft:4,}}
                                    onPress={handleTaskbarMiniPressOff_qtkd}>
                            <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                       Kinh doanh quốc tế
                        </Text>
                    </View>
                  </View> 
              </View>
              <ScrollView style={{width: "100%",height: windowHeight - 80,paddingHorizontal: 10,paddingTop: 20,paddingBottom:40}}>
              <Image
                source={require("../images/biakdqt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginBottom:10}}/>
              <Text style={{fontSize: 24,color: "#f26f21",fontWeight:600, marginBottom:10}}>
              TRIỂN VỌNG NGHỀ NGHIỆP
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Theo trung tâm dự báo nhu cầu nhân lực và Thông tin thị trường lao động, nhu cầu tuyển dụng của nước ta với nhóm ngành Kinh tế - Quản trị - Marketing – xuất nhập khẩu – Logistics chiếm khoảng 40% tổng nhu cầu tuyển dụng. Cũng theo Trung tâm dự báo quốc gia và Thông tin thị trường lao động, <Text style={{fontWeight:700}}>trong 5 năm tới, tăng tưởng Việt Nam đang trong thời kỳ hội nhập sâu rộng, tạo cơ hội tốt cho các ngành nghề trong lĩnh vực kinh doanh quốc tế.</Text>
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Trên thực tế, từ năm 2016, nhiều hiệp định kinh tế được ký kết như TPP, WTO… thúc đẩy nền kinh tế Việt Nam tăng trưởng vượt trội.
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              <Text style={{fontWeight:800}}>Ngành Kinh doanh quốc tế là toàn bộ các hoạt động giao dịch kinh doanh được thực hiện giữa các quốc gia,</Text> nhằm thoả mãn các mục tiêu kinh doanh của doanh nghiệp, cá nhân và các tổ chức kinh tế. Kinh doanh quốc tế là lĩnh vực năng động, mang tính toàn cầu và cơ hội việc làm mở rộng. 
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Toàn cầu hoá và hội nhập đang là xu hướng phát triển chủ yếu trong các quan hệ quốc tế trên tất cả các lĩnh vực đặc biệt là lĩnh vực kinh tế trong nước và quốc tế. Việt Nam trở thành thành viên của Cộng đồng kinh tế ASEAN (AEC), Hiệp định thương Mại tự do (FTA) giữa EU và Việt Nam, Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương (CPTPP)… Đây là những yếu tố quan trọng góp phần thúc đẩy nền kinh tế Việt Nam phát triển, đặc biệt là lĩnh vực kinh doanh. Các hoạt động trao đổi, mua bán trong nước và quốc tế cũng từ đó được đẩy mạnh. 
              </Text>
              <Text style={{ fontSize: 22, marginBottom:20}}>
              Cùng với nó là sự phát triển của ngành xuất nhập khẩu, logistic/ hậu cần, tiếp vận. Tại Việt Nam, <Text style={{fontWeight:800}}>các ngành nghề trong lĩnh vực kinh doanh quốc tế còn khá mới mẻ nhưng lại có nhu cầu về nguồn nhân lực rất lớn.</Text> Sinh viên lựa chọn ngành Kinh doanh quốc tế này sẽ có cơ hội phát triển bản thân và vươn ra thị trường quốc tế.
              </Text>
              <Video
                source={require("../videos/kdqt_video.mp4")}
                shouldPlay={false}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ width: "100%", height: 300, marginBottom:20 }}
              />
              <Text style={{ fontSize: 22, marginBottom:20,color: "#f26f21", fontWeight:700}}>
                HỌC NGÀNH NÀY - LÀM NGHỀ GÌ?
              </Text>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Nhà tư vấn quản trị kinh doanh quốc tế
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên hoạch định tài chính quốc tế
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên nghiên cứu thị trường quốc tế
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên Marketing quốc tế
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên quản trị chuỗi cung ứng
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên tư vấn đầu tư quốc tế
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Chuyên viên xúc tiến thương mại
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Nhân viên xuất nhập khẩu
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:50,alignItems:"center", marginBottom:10}}>
                <Icon name="check" style ={{width:"4%",marginRight:3}} size={16} color="#66CC00"/>
                <View style={{width:"96%"}}>
                  <Text style={{ fontSize: 16,color: "#000", fontWeight:600}}>
                  Nhân viên kinh doanh cước tàu biển, hàng không
                  </Text>
                </View>
              </View>
              
              <Image
                source={require("../images/logofpt.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain", marginVertical:30 }}/>
                
            </ScrollView>
            </Animated.View> 

          </View>
          

        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskbar: {
    flexDirection:"row",
    position: 'absolute',
    top: 0,
    left: -windowWidth,
    width: "100%",
    height: '100%',
    zIndex: 3,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  taskbar_mini: {
    position: 'absolute',
    left: -(windowWidth+10),
    width: "100%",
    height: '100%',
    zIndex: 4,
    justifyContent: 'space-between',
    backgroundColor:"#fff",
    
  },
  camera: {
    flex: 1,
    zIndex: -1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  overlay_:{
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  },
});
