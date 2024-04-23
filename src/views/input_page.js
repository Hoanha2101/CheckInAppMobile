import axios from 'axios';
import React,{ Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions,
    Alert,
    TextInput
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as config from "../views/config.js";



const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const Separator = () => <View style={{marginVertical: 8, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal:10, marginVertical:0.01*windowHeight}} />;

export default InputPage = ( {route ,navigation} ) => {
    
    const {num_rows_id} = route.params;

    // const [num_rows_id, set_num_rows_id] = useState("7");


    const [valueMajor, setValueMajor] = useState(null);
    const [Name, SetName] = useState('');
    const [Birthday, SetBirthday] = useState('')
    const [Phone, SetPhone] = useState('')
    const [guider, setGuider] = useState(true)
    const [Question, SetQuestion] = useState("")
    const [NodeColor_1, setNodeColor_1] = useState('black')
    const [NodeColor_2, setNodeColor_2] = useState('black')
    const [NodeColor_3, setNodeColor_3] = useState('black')
    const [NodeColor_4, setNodeColor_4] = useState('black')
    const [IconQuestion, setIconQuestion] = useState("")

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const QuestionSeting_1 = async () => {
        setGuider(false)
        setIconQuestion("1")
        await delay(500);
        SetQuestion("1")
    }

    const QuestionSeting_2 = async () => {
        setNodeColor_1("#33FF00"),
        SetQuestion("")
        setIconQuestion("2")
        await delay(500);
        SetQuestion("2")
    }

    const QuestionSeting_3 = async () => {
        setNodeColor_2("#33FF00"),
        SetQuestion("")
        setIconQuestion("3")
        await delay(500);
        SetQuestion("3")
    }

    const QuestionSeting_4 = async () => {
        setNodeColor_3("#33FF00"),
        SetQuestion("")
        setIconQuestion("4")
        await delay(500);
        SetQuestion("4")
    }

    const call_save_sever = async () => {
        console.log(number_id = num_rows_id,
            name_ = Name,
            birthday = Birthday,
            phone = Phone,
            major = valueMajor)
        setNodeColor_4("#33FF00")
        try {
          const response = await axios.post(config.url + '/save_new_people', {
            number_id : num_rows_id,
            name_ : Name,
            birthday : Birthday,
            phone : Phone,
            major: valueMajor
          });
          console.log(response.data.lock)
          if (response.data.lock === 5) {
            setValueMajor(null)
            SetName("")
            SetBirthday("")
            SetPhone("")
            navigation.navigate("GiftBox");
          } else {
            Alert.alert("Error", "Data is invalid. Please check again.");
          }                   

        } catch (error) {
          console.error(error);
        }
      };


    const data_major = [
        { label: 'Trí tuệ nhân tạo', value: 'Trí tuệ nhân tạo' },
        { label: 'Kĩ thuật phần mềm', value: 'Kĩ thuật phần mềm' },
        { label: 'Quản trị kinh doanh', value: 'Quản trị kinh doanh' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Thiết kế mĩ thuật số', value: 'Thiết kế mĩ thuật số' },
        { label: 'An toàn thông tin', value: 'An toàn thông tin' },
    ];
    
    const DropdownComponent_major = () => {
        return (
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data_major}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select major"
                searchPlaceholder="Search..."
                value={valueMajor}
                onChange={item => {
                    setValueMajor(item.value);
                }}
            />
        );
    };

    const data_year = [
        { label: '1995', value: '1995' },
        { label: '1996', value: '1996' },
        { label: '1997', value: '1997' },
        { label: '1998', value: '1998' },
        { label: '1999', value: '1999' },
        { label: '2000', value: '2000' },
        { label: '2001', value: '2001' },
        { label: '2002', value: '2002' },
        { label: '2003', value: '2003' },
        { label: '2004', value: '2004' },
        { label: '2005', value: '2005' },
        { label: '2006', value: '2006' },
        { label: '2007', value: '2007' },
        { label: '2008', value: '2008' },
        { label: '2009', value: '2009' },
        { label: '2010', value: '2010' },
        { label: '2011', value: '2011' },
        { label: '2012', value: '2012' },
        { label: '2013', value: '2013' },
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        
    ];
    
    const DropdownComponent_year = () => {
        return (
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data_year}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select year"
                searchPlaceholder="Search..."
                value={Birthday}
                onChange={item => {
                    SetBirthday(item.value);
                }}
            />
        );
    };

    
    return (
        <ImageBackground style = {{height: '100%', width: '100%'}} source={require('../images/CheckIn_bg.jpg')} resizeMode='stretch'>
            <StatusBar barStyle = "light-content"/>
            <SafeAreaView style ={{flex: 1}}>
                <View style ={{width: "100%", height:"100%", justifyContent:"center", alignItems:'center'}}>
                {guider&&(<View style ={styles.overlay}>
                            <View style ={styles.overlay_in}>
                            {/* content */}
                                <View style = {{height: "70%", marginHorizontal: 20, marginVertical: 10}}>
                                    <Text style={{fontWeight:800, fontSize: 20, }}>Hướng dẫn trò chơi</Text>

                                </View>
                            {/* Button */}
                            <View style ={{width: "100%",height:"20%",justifyContent:"center",alignItems:"center"}}>
                                <TouchableOpacity style = {{width:"50%",height:"40%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                                onPress={QuestionSeting_1}>
                                    <Text style={{fontSize:16, color:"#fff"}}>
                                        Play
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {{width:"50%",height:"40%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#0066FF",borderRadius:100, marginTop: 10}}
                                                onPress = {()=> 
                                                    {navigation.navigate("CheckInPage")}
                                                }>
                                    <Text style={{fontSize:16, color:"#fff"}}>
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                    {Question === "1" &&(<View style ={styles.overlay}>
                        <View style ={styles.overlay_in_question}>
                            {/* content */}
                            <View style = {{paddingTop:20,height: "60%", marginHorizontal: 20, marginVertical: 10}}>
                                <Text style={{fontWeight: 800,color:"#000", paddingLeft:20, marginBottom:6, fontSize:16}}>
                                        Tên của bạn
                                    </Text>
                                    <TextInput style={{height:38, width:"100%",borderWidth:2, borderColor:"#000", fontSize:20, paddingRight:10, paddingLeft:10, color:"#000"}}
                                                onChangeText={(text) => {
                                                    SetName(text)
                                                    }}
                                                    value = {Name}
                                                />

                            </View>
                            {/* Button */}
                            <View style ={{width: "100%",height:"40%",justifyContent:"center",alignItems:"center"}}>
                                <TouchableOpacity style = {{width:"50%",height:"50%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                                onPress={QuestionSeting_2}>
                                    <Text style={{fontSize:16, color:"#fff"}}>
                                        Summit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                    {Question === "2" &&(<View style ={styles.overlay}>
                        <View style ={styles.overlay_in_question}>
                            {/* content */}
                            <View style ={{paddingTop:20,height: "60%", marginHorizontal: 20, marginVertical: 10}}>
                                        <Text style={{fontWeight: 800,color:"#000", paddingLeft:20, marginBottom:6, fontSize:16}}>
                                        Năm sinh
                                        </Text>
                                        <View>
                                            <DropdownComponent_year/>
                                        </View>
                                    </View>
                            {/* Button */}
                            <View style ={{width: "100%",height:"40%",justifyContent:"center",alignItems:"center"}}>
                                <TouchableOpacity style = {{width:"50%",height:"50%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                                onPress={QuestionSeting_3}>
                                    <Text style={{fontSize:16, color:"#fff"}}>
                                        Summit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                    {Question === "3" &&(<View style ={styles.overlay}>
                        <View style ={styles.overlay_in_question}>
                            {/* content */}
                            <View style = {{paddingTop:20,height: "60%", marginHorizontal: 20, marginVertical: 10}}>
                                <Text style={{fontWeight: 800,color:"#000", paddingLeft:20, marginBottom:6, fontSize:16}}>
                                        Số điện thoại
                                    </Text>
                                    <TextInput style={{height:38, width:"100%",borderWidth:2, borderColor:"#000", fontSize:20, paddingRight:10, paddingLeft:10, color:"#000"}}
                                                onChangeText={(text) => {
                                                    SetPhone(text)
                                                    }}
                                                    value = {Phone}
                                                    keyboardType='numeric'
                                                />
                            </View>
                            {/* Button */}
                            <View style ={{width: "100%",height:"40%",justifyContent:"center",alignItems:"center"}}>
                                <TouchableOpacity style = {{width:"50%",height:"50%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                                onPress={QuestionSeting_4}>
                                    <Text style={{fontSize:16, color:"#fff"}}>
                                        Summit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                    {Question === "4" &&(<View style ={styles.overlay}>
                        <View style ={styles.overlay_in_question}>
                            {/* content */}
                            <View style ={{paddingTop:20,height: "60%", marginHorizontal: 20, marginVertical: 10}}>
                                        <Text style={{fontWeight: 800,color:"#000", paddingLeft:20, marginBottom:6, fontSize:16}}>
                                        Ngành học mà bạn đang quan tâm
                                        </Text>
                                        <View>
                                            <DropdownComponent_major/>
                                        </View>
                                    </View>
                            {/* Button */}
                            <View style ={{width: "100%",height:"40%",justifyContent:"center",alignItems:"center"}}>
                                <TouchableOpacity style = {{width:"50%",height:"50%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                                onPress={() => {call_save_sever()}}>
                                    <Text style={{fontSize:16, color:"#fff",}}>
                                        Summit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                    
                    {/* {input Text} */}
                    <View style = {{width: "100%",height:"8%", marginTop:0.01*windowWidth ,marginLeft:20,justifyContent:"center", }}>
                        <Text style={{fontSize:30, color:"#FFFF00",textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2}}>
                        Who are you?
                        </Text>
                    </View>

                    <Separator />

                    

                    {/* input Name - Year of Birth - Phone - Major */}
                    <View style = {{width :"90%", marginHorizontal:20}}>

                        {/* input Name - Year of Birth - Phone  */}
                            <View style ={{width: "100%"}}>
                                {/* name */}
                                <View style={{marginBottom:12,flexDirection:"row"}}>
                                    <View style={{backgroundColor: NodeColor_1,height:38, width:"10%",borderWidth:3, borderColor:"#fff", borderRadius:100,fontSize:20, paddingRight:10, paddingLeft:10, color:"#fff"}}>

                                    </View>
                                    {IconQuestion === "1" &&(<Icon name="rocket" style ={{marginLeft:10}} size={28} color="#900" />)}

                                </View>
                                {/* Year of birth */}
                                <View style={{marginBottom:12,flexDirection:"row"}}>
                                    <View style={{backgroundColor: NodeColor_2,marginLeft:50,height:38, width:"10%",borderWidth:3, borderColor:"#fff", borderRadius:100,fontSize:20, paddingRight:10, paddingLeft:10, color:"#fff"}}>

                                    </View>
                                    {IconQuestion === "2" &&(<Icon name="rocket" style ={{marginLeft:10}} size={28} color="#900" />)}
                                    
                            </View>
                            {/* Phone */}
                            <View style={{marginBottom:12,flexDirection:"row"}}>
                                <View style={{backgroundColor: NodeColor_3, marginLeft:100,height:38, width:"10%",borderWidth:3, borderColor:"#fff", borderRadius:100,fontSize:20, paddingRight:10, paddingLeft:10, color:"#fff"}}>

                                </View>
                                {IconQuestion === "3" &&(<Icon name="rocket" style ={{marginLeft:10}} size={28} color="#900" />)}
                                
                            </View>
                        </View>

                        {/*  Major */}
                        <View style ={{width:"100%",flexDirection:"row"}}>
                            <View style={{backgroundColor: NodeColor_4 ,marginLeft:150,height:38, width:"10%",borderWidth:3, borderColor:"#fff", borderRadius:100,fontSize:20, paddingRight:10, paddingLeft:10, color:"#fff"}}>

                            </View>

                            {IconQuestion === "4" &&(<Icon name="rocket" style ={{marginLeft:10}} size={28} color="#900" />)}

                            
                        </View>

                    </View>
                    {/* {Button Save - Back} */}
                    <View style ={{width: "100%",height:"20%",marginTop: 0.2 * windowHeight,justifyContent:"center",alignItems:"center"}}>
                        {/* <TouchableOpacity style = {{width:"50%",height:"40%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#003399",borderRadius:100}}
                                        onPress={() => {call_save_sever()}}>
                            <Text style={{fontSize:16, color:"#fff"}}>
                                Save
                            </Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style = {{width:"50%",height:"40%",justifyContent:"center",alignItems:"center",borderWidth: 2,borderColor:"white",backgroundColor:"#0066FF",borderRadius:100, marginTop: 10}}
                                        onPress = {()=> 
                                            {navigation.navigate("CheckInPage")}
                                        }>
                            <Text style={{fontSize:16, color:"#fff"}}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
        

    );
}
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        width: "100%", 
        height: "100%",
        zIndex:1,
        justifyContent:"center",
        alignItems:"center",
        },


    overlay_in:{
        justifyContent:"center",
        alignContent:"center",
        width: windowWidth - 80, 
        height: windowHeight - 200, 
        backgroundColor:"#fff",
        borderRadius:10,
        borderWidth:3,
        borderColor:"#000",
    },
    overlay_in_question:{
        justifyContent:"center",
        alignContent:"center",
        width: windowWidth - 80, 
        height: windowHeight - 500, 
        backgroundColor:"#fff",
        borderRadius:10,
        borderWidth:3,
        borderColor:"#000",
    },

    dropdown: {
      height: 42,
      border: '#000',
      borderWidth: 2,
      borderColor: "#000",
    },
    placeholderStyle: {
      fontSize: 16,
      paddingLeft:10
    },
    selectedTextStyle: {
      color:"#000",
      paddingHorizontal:10,
      fontSize: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 20,
    },
  });