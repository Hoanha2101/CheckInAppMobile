import React, { Component, useState } from 'react';
import {
    View,
    Text, 
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions,
    Alert,Image
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as config from "../views/config.js";

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

export default ShowInfoPage = ( {route,navigation} ) => {
    const {id_no_extract} = route.params;
    const {num_rows_id} = route.params;
    const {fullname_exist} = route.params;
    const {checkin_info_number} = route.params;

    // const {id_no_extract} = "1";
    // const {num_rows_id} = "1";
    // const {fullname_exist} = "HHHHHHHHHH YYY";
    // const {checkin_info_number} = "3";

    const [InfoExist,setInfoExist] = useState(false)

    const call_change_sever = async () => {
        try {
          const response = await axios.post(config.url +'/change_no_check', {
            IdNoExtract:id_no_extract
          });
          
          if (response.data.lock === 6) {
            navigation.navigate("InputPage", { num_rows_id: num_rows_id })
          } else {
            Alert.alert("Error", "Data is invalid. Please check again.");
          }                   

        } catch (error) {
          console.error(error);
          
        }
      };

    const showInfoExist = async () => {
        setInfoExist(true)
    }

    const showInfoOFF = async () => {
        setInfoExist(false)
    }
    

    return ( 
        <View style ={{width: "100%", height:"100%", alignItems: 'center', backgroundColor:"#fff",justifyContent: "space-between"}}>
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
                                    onPress = {()=> {navigation.navigate("CheckInPage")}}>
                            <Icon name="arrow-left" style ={{}} size={30} color="#33B8DC"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                        <Icon name="cloud" style ={{}} size={28} color="#33B8DC" />
                        <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#33B8DC",}}>
                            Information
                        </Text>
                    </View>
                </View>                       
            </View>
            <View style={{width:"100%",justifyContent:"space-between",paddingHorizontal:14, height:"80%"}}>
                <View style={{width:"100%",justifyContent:"center",}}>
                    <Text style={{color:"#233742",fontWeight:700, fontSize:16}}>
                        Có thể đây là hồ sơ bạn đang quan tâm
                    </Text>
            
                    <View style ={{marginTop:20,width:"100%",height:100,backgroundColor:"#fff",
                            borderRadius:12,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,}}>  
                        <TouchableOpacity style = {{width:"100%",height:"100%",justifyContent:"center",alignItems:"center", flexDirection:"row"}}
                                                onPress = {showInfoExist}>
                            <View style={{height:"90%", borderRightColor:"#5864A1", borderRightWidth:1, justifyContent:"center", alignItems:"center", width:"30%"}}>
                                <Icon name="address-book" style ={{}} size={50} color="#33B8DC"/>
                            </View>
                            
                            <View style={{justifyContent:"space-between", height:"90%",width:"70%", justifyContent:"center", alignContent:"center"}}>
                                <View style={{justifyContent:"space-between", height:"100%",width:"100%", justifyContent:"center", alignContent:"center",paddingHorizontal:10}}>
                                    <Text style={{fontSize:16, color:"#191C69", fontWeight: 800,fontSize:18}}>
                                        {fullname_exist}
                                    </Text>
                                    <Text style={{fontSize:16, color:"#000", fontWeight: 600,fontSize:14,fontStyle: 'italic'}}>
                                        Đã từng đến đại học FPT Quy Nhơn
                                    </Text>
                                    <Text style={{fontSize:16, color:"#6EC2DB", fontWeight: 600,fontSize:14, opacity:0.8,fontStyle: 'italic'}}>
                                        Chọn để xem chi tiết
                                    </Text>
                                </View>
                            </View> 
                        </TouchableOpacity> 
                    </View>  
                    
                    <Text style={{color:"#233742",fontWeight:700, fontSize:16, paddingTop:20, justifyContent:"center", alignItems:"center"}}>
                        Vui lòng chọn <Text style={{color:"#FC1408",fontWeight:700, fontSize:20, paddingTop:20,fontStyle: 'italic'}}>
                            Tạo mới <Text style={{color:"#233742",fontWeight:700, fontSize:16, paddingTop:20}}>
                            để thực hiện check in <Text style={{color:"#233742",fontWeight:700, fontSize:16, paddingTop:20}}>
                            nếu thông tin tôi cung cấp không như mong muốn. 
                        </Text>
                        </Text>
                        </Text>
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style = {{width:160,height:60,justifyContent:"center",alignItems:"center",flexDirection:"row",
                    backgroundColor:"#fff",borderRadius:100,bottom:40,
                    borderRadius:12,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 10,
                    elevation: 10,}}
                                // onPress = {()=> Alert.alert('Chụp ảnh, chuyển ảnh sang dạng Base64 và gửi về sever')}
                                onPress = {call_change_sever}>
                        <Text style={{fontSize:20, color:"#33B8DC", fontWeight:900}}>
                            Tạo mới
                        </Text>
                        <Icon name="plus" style ={{paddingLeft:10}} size={30} color="#33B8DC"/>
                    </TouchableOpacity>
                </View>
            </View>

            { InfoExist && (
            <View style = {{width: "100%",height:"100%", backgroundColor:"#fff", zIndex:2, position: 'absolute',justifyContent:"space-between"}}>
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
                                        onPress = {showInfoOFF}>
                                <Icon name="arrow-left" style ={{}} size={30} color="#33B8DC"/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                            <Icon name="address-book" style ={{}} size={28} color="#33B8DC" />
                            <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#33B8DC",}}>
                            {fullname_exist}
                            </Text>
                        </View>
                    </View>                       
                </View>
                
                <View style={{width:"100%",justifyContent:"space-between",paddingHorizontal:14, height:"80%"}}>
                    <View style={{width:"100%",justifyContent:"center",}}>
                        <Text style={{color:"#233742",fontWeight:700, fontSize:16}}>
                            Thông tin
                        </Text>
                
                        <View style ={{marginTop:20,width:"100%",height:100,backgroundColor:"#fff",
                                borderRadius:12,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,

                                elevation: 10,}}>  
                            <View style = {{width:"100%",height:"100%",justifyContent:"center",alignItems:"center", flexDirection:"row"}}>
                                <View style={{height:"90%", borderRightColor:"#5864A1", borderRightWidth:1, justifyContent:"center", alignItems:"center", width:"30%"}}>
                                    <Icon name="folder-open" style ={{}} size={50} color="#33B8DC"/>
                                </View>
                                
                                <View style={{justifyContent:"space-between", height:"90%",width:"70%", justifyContent:"center", alignContent:"center"}}>
                                    <View style={{justifyContent:"space-between", height:"100%",width:"100%", justifyContent:"center", alignContent:"center",paddingHorizontal:10}}>
                                        <Text style={{fontSize:16, color:"#191C69", fontWeight: 800,fontSize:18}}>
                                            Đây là lần thứ {checkin_info_number}
                                        </Text>
                                        <Text style={{fontSize:16, color:"#000", fontWeight: 600,fontSize:14,fontStyle: 'italic'}}>
                                            Check In tại Đại học FPT Quy Nhơn
                                        </Text>
                                    </View>
                                </View> 
                            </View> 
                        </View>             
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style = {{width:160,height:60,justifyContent:"center",alignItems:"center",flexDirection:"row",
                            backgroundColor:"#fff",borderRadius:100,bottom:40,
                            borderRadius:12,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 10,
                            elevation: 10,}}
                                onPress = {()=> {navigation.navigate("CheckInPage")}}>
                            <Text style={{fontSize:20, color:"#33B8DC", fontWeight:900}}>
                                Home
                            </Text>
                        <Icon name="home" style ={{paddingLeft:10}} size={30} color="#33B8DC"/>
                    </TouchableOpacity>
                </View>
                </View>
            </View>)}
            
            {/* {Button Check In} */}
        </View>  
    );
}
