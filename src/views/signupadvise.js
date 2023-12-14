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

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const Separator = () => <View style={{marginVertical: 8, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal:10, marginVertical:0.01*windowHeight}} />;

export default SignUpAdvisePage = ( {navigation} ) => {
    
    const [valueMajor, setValueMajor] = useState('');
    const [valueProvince, setValueProvince] = useState('');
    const [valueSchool, setValueSchool] = useState('');
    const [Name, SetName] = useState('');
    const [Birthday, SetBirthday] = useState('')
    const [Phone, SetPhone] = useState('')
    const [emailValue, SetEmailValue] = useState('')

    const [SuccessScreen, SetSuccessScreen] = useState(false)

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    
    const call_save_sever = async () => {  
        SetSuccessScreen(true)
        try {
          const response = await axios.post('http://192.168.1.241:8000/signup_advise', {
            name_ : Name,
            phone : Phone,
            email: emailValue,
            birthday : Birthday,
            province:valueProvince,
            school:valueSchool,
            major: valueMajor
          });
          console.log(response.data.lock)
          if (response.data.lock === 7) {
            SetEmailValue('')
            setValueMajor('')
            setValueProvince('')
            setValueSchool('')
            SetName('')
            SetBirthday('')
            SetPhone('')
            await delay(2000);
            navigation.goBack();
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
                placeholder="---Select---"
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
                placeholder="Select"
                searchPlaceholder="Search..."
                value={Birthday}
                onChange={item => {
                    SetBirthday(item.value);
                }}
            />
        );
    };

    const data_province = [
        { label: 'Hà Giang', value: 'Hà Giang' },
        { label: 'Cao Bằng', value: 'Cao Bằng' },
        { label: 'Lạng Sơn', value: 'Lạng Sơn' },
        { label: 'Tuyên Quang', value: 'Tuyên Quang' },
        { label: 'Bắc Kạn', value: 'Bắc Kạn' },
        { label: 'Thái Nguyên', value: 'Thái Nguyên' },
        { label: 'Yên Bái', value: 'Yên Bái' },
        { label: 'Sơn La', value: 'Sơn La' },
        { label: 'Phú Thọ', value: 'Phú Thọ' },
        { label: 'Vĩnh Phúc', value: 'Vĩnh Phúc' },
        { label: 'Bắc Ninh', value: 'Bắc Ninh' },
        { label: 'Hải Dương', value: 'Hải Dương' },
        { label: 'Hải Phòng', value: 'Hải Phòng' },
        { label: 'Hưng Yên', value: 'Hưng Yên' },
        { label: 'Thái Bình', value: 'Thái Bình' },
        { label: 'Hà Nam', value: 'Hà Nam' },
        { label: 'Nam Định', value: 'Nam Định' },
        { label: 'Ninh Bình', value: 'Ninh Bình' },
        { label: 'Thanh Hóa', value: 'Thanh Hóa' },
        { label: 'Nghệ An', value: 'Nghệ An' },
        { label: 'Hà Tĩnh', value: 'Hà Tĩnh' },
        { label: 'Quảng Bình', value: 'Quảng Bình' },
        { label: 'Quảng Trị', value: 'Quảng Trị' },
        { label: 'Thừa Thiên-Huế', value: 'Thừa Thiên-Huế' },
        { label: 'Đà Nẵng', value: 'Đà Nẵng' },
        { label: 'Quảng Nam', value: 'Quảng Nam' },
        { label: 'Quảng Ngãi', value: 'Quảng Ngãi' },
        { label: 'Bình Định', value: 'Bình Định' },
        { label: 'Phú Yên', value: 'Phú Yên' },
        { label: 'Khánh Hòa', value: 'Khánh Hòa' },
        { label: 'Ninh Thuận', value: 'Ninh Thuận' },
        { label: 'Bình Thuận', value: 'Bình Thuận' },
        { label: 'Kon Tum', value: 'Kon Tum' },
        { label: 'Gia Lai', value: 'Gia Lai' },
        { label: 'Đắk Lắk', value: 'Đắk Lắk' },
        { label: 'Đắk Nông', value: 'Đắk Nông' },
        { label: 'Lâm Đồng', value: 'Lâm Đồng' },
        { label: 'Bình Phước', value: 'Bình Phước' },
        { label: 'Tây Ninh', value: 'Tây Ninh' },
        { label: 'Bình Dương', value: 'Bình Dương' },
        { label: 'Đồng Nai', value: 'Đồng Nai' },
        { label: 'Bà Rịa-Vũng Tàu', value: 'Bà Rịa-Vũng Tàu' },
        { label: 'TP. Hồ Chí Minh', value: 'TP. Hồ Chí Minh' },
        { label: 'Long An', value: 'Long An' },
        { label: 'Tiền Giang', value: 'Tiền Giang' },
        { label: 'Bến Tre', value: 'Bến Tre' },
        { label: 'Trà Vinh', value: 'Trà Vinh' },
        { label: 'Vĩnh Long', value: 'Vĩnh Long' },
        { label: 'Đồng Tháp', value: 'Đồng Tháp' },
        { label: 'An Giang', value: 'An Giang' },
        { label: 'Kiên Giang', value: 'Kiên Giang' },
        { label: 'Cần Thơ', value: 'Cần Thơ' },
        { label: 'Hậu Giang', value: 'Hậu Giang' },
        { label: 'Sóc Trăng', value: 'Sóc Trăng' },
        { label: 'Bạc Liêu', value: 'Bạc Liêu' },
        { label: 'Cà Mau', value: 'Cà Mau' },
        { label: 'Tuyên Quang', value: 'Tuyên Quang' },
        { label: 'Bắc Kạn', value: 'Bắc Kạn' },
        { label: 'Thái Nguyên', value: 'Thái Nguyên' },
        { label: 'Lào Cai', value: 'Lào Cai' },
        { label: 'Điện Biên', value: 'Điện Biên' },
        { label: 'Lai Châu', value: 'Lai Châu' },
        { label: 'Sơn La', value: 'Sơn La' },
        { label: 'Yên Bái', value: 'Yên Bái' },
        { label: 'Hòa Bình', value: 'Hòa Bình' },
        { label: 'Thái Bình', value: 'Thái Bình' },
        { label: 'Hải Dương', value: 'Hải Dương' },
        { label: 'Hưng Yên', value: 'Hưng Yên' },
        { label: 'Hải Phòng', value: 'Hải Phòng' },
        { label: 'Hà Nam', value: 'Hà Nam' },
        { label: 'Nam Định', value: 'Nam Định' },
        { label: 'Ninh Bình', value: 'Ninh Bình' },
        { label: 'Thanh Hóa', value: 'Thanh Hóa' },
        { label: 'Nghệ An', value: 'Nghệ An' },
        { label: 'Hà Tĩnh', value: 'Hà Tĩnh' },
        { label: 'Quảng Bình', value: 'Quảng Bình' },
        { label: 'Quảng Trị', value: 'Quảng Trị' },
        { label: 'Thừa Thiên-Huế', value: 'Thừa Thiên-Huế' },
        { label: 'Đà Nẵng', value: 'Đà Nẵng' },
        { label: 'Quảng Nam', value: 'Quảng Nam' },
        { label: 'Quảng Ngãi', value: 'Quảng Ngãi' },
        { label: 'Bình Định', value: 'Bình Định' },
        { label: 'Phú Yên', value: 'Phú Yên' },
        { label: 'Khánh Hòa', value: 'Khánh Hòa' },
        { label: 'Ninh Thuận', value: 'Ninh Thuận' },
        { label: 'Bình Thuận', value: 'Bình Thuận' },
        { label: 'Kon Tum', value: 'Kon Tum' },
        { label: 'Gia Lai', value: 'Gia Lai' },
        { label: 'Đắk Lắk', value: 'Đắk Lắk' },
        { label: 'Đắk Nông', value: 'Đắk Nông' },
        { label: 'Lâm Đồng', value: 'Lâm Đồng' },
        { label: 'Bình Phước', value: 'Bình Phước' },
        { label: 'Tây Ninh', value: 'Tây Ninh' },
        { label: 'Bình Dương', value: 'Bình Dương' },
        { label: 'Đồng Nai', value: 'Đồng Nai' },
        { label: 'Bà Rịa-Vũng Tàu', value: 'Bà Rịa-Vũng Tàu' },
        { label: 'TP. Hồ Chí Minh', value: 'TP. Hồ Chí Minh' },
        { label: 'Long An', value: 'Long An' },
        { label: 'Tiền Giang', value: 'Tiền Giang' },
        { label: 'Bến Tre', value: 'Bến Tre' },
        { label: 'Trà Vinh', value: 'Trà Vinh' },
        { label: 'Vĩnh Long', value: 'Vĩnh Long' },
        { label: 'Đồng Tháp', value: 'Đồng Tháp' },
        { label: 'An Giang', value: 'An Giang' },
        { label: 'Kiên Giang', value: 'Kiên Giang' },
        { label: 'Cần Thơ', value: 'Cần Thơ' },
        { label: 'Hậu Giang', value: 'Hậu Giang' },
        { label: 'Sóc Trăng', value: 'Sóc Trăng' },
        { label: 'Bạc Liêu', value: 'Bạc Liêu' },
        { label: 'Cà Mau', value: 'Cà Mau' },
 
    ];
    
    const DropdownComponent_province = () => {
        return (
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data_province}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                searchPlaceholder="Search..."
                value={valueProvince}
                onChange={item => {
                    setValueProvince(item.value);
                }}
            />
        );
    };

    const data_school_BinhDinh = [
        { label: 'Trường THPT Số 1 Tuy Phước', value: 'Trường THPT Số 1 Tuy Phước' },
        { label: 'Trường THPT Số 2 Tuy Phước', value: 'Trường THPT Số 2 Tuy Phước' },
        { label: 'Trường THPT Nguyễn Diêu', value: 'Trường THPT Nguyễn Diêu' },
        { label: 'Trường THPT Xuân Diệu', value: 'Trường THPT Xuân Diệu' },
        { label: 'Trường THPT Quốc Học', value: 'Trường THPT Quốc Học' },
        { label: 'Trường THPT Trưng Vương', value: 'Trường THPT Trưng Vương' },
        { label: 'Trường THPT Chuyên Lê Quý Đôn', value: 'Trường THPT Chuyên Lê Quý Đôn' },
        { label: 'Trường THPT Hùng Vương', value: 'Trường THPT Hùng Vương' },
        { label: 'Trường THPT DTNT Tỉnh', value: 'Trường THPT DTNT Tỉnh' },
        { label: 'Trường THPT Trần Cao Vân', value: 'Trường THPT Trần Cao Vân' },
        { label: 'Trường THPT Nguyễn Thái Học', value: 'Trường THPT Nguyễn Thái Học' },
        { label: 'Trường THPT Chu Văn An', value: 'Trường THPT Chu Văn An' },
        { label: 'Trường THPT Quy Nhơn', value: 'Trường THPT Quy Nhơn' },
        { label: 'Trường THPT An Lão', value: 'Trường THPT An Lão' },
        { label: 'Trường THPT Số 2 An Lão', value: 'Trường THPT Số 2 An Lão' },
        { label: 'Trường THPT Hoài Ân', value: 'Trường THPT Hoài Ân' },
        { label: 'Trường THPT Võ Giữ', value: 'Trường THPT Võ Giữ' },
        { label: 'Trường THPT Nguyễn Bỉnh Khiêm', value: 'Trường THPT Nguyễn Bỉnh Khiêm' },
        { label: 'Trường THPT Trần Quang Diệu', value: 'Trường THPT Trần Quang Diệu' },
        { label: 'Trường THPT Tăng Bạt Hổ', value: 'Trường THPT Tăng Bạt Hổ' },
        { label: 'Trường THPT Nguyễn Trân', value: 'Trường THPT Nguyễn Trân' },
        { label: 'Trường THPT Nguyễn Du', value: 'Trường THPT Nguyễn Du' },
        { label: 'Trường THPT Lý Tự Trọng', value: 'Trường THPT Lý Tự Trọng' },
        { label: 'Trường THPT Phan Bội Châu', value: 'Trường THPT Phan Bội Châu' },
        { label: 'Trường THPT Tam Quan', value: 'Trường THPT Tam Quan' },
        { label: 'Trường THPT Số 1 Phù Mỹ', value: 'Trường THPT Số 1 Phù Mỹ' },
        { label: 'Trường THPT Số 2 Phù Mỹ', value: 'Trường THPT Số 2 Phù Mỹ' },
        { label: 'Trường THPT An Lương', value: 'Trường THPT An Lương' },
        { label: 'Trường THPT Nguyễn Trung Trực', value: 'Trường THPT Nguyễn Trung Trực' },
        { label: 'Trường THPT Bình Dương', value: 'Trường THPT Bình Dương' },
        { label: 'Trường THPT Mỹ Thọ', value: 'Trường THPT Mỹ Thọ' },
        { label: 'Trường THPT Số 1 Phù Cát', value: 'Trường THPT Số 1 Phù Cát' },
        { label: 'Trường THPT Số 2 Phù Cát', value: 'Trường THPT Số 2 Phù Cát' },
        { label: 'Trường THPT Số 3 Phù Cát', value: 'Trường THPT Số 3 Phù Cát' },
        { label: 'Trường THPT Ngô Mây', value: 'Trường THPT Ngô Mây' },
        { label: 'Trường THPT Nguyễn Hữu Quang', value: 'Trường THPT Nguyễn Hữu Quang' },
        { label: 'Trường THPT Nguyễn Hồng Đạo', value: 'Trường THPT Nguyễn Hồng Đạo' },
        { label: 'Trường THPT Vĩnh Thạnh', value: 'Trường THPT Vĩnh Thạnh' },
        { label: 'Trường THPT DTNT Vĩnh Thạnh', value: 'Trường THPT DTNT Vĩnh Thạnh' },
        { label: 'Trường THPT Quang Trung', value: 'Trường THPT Quang Trung' },
        { label: 'Trường THPT Tây Sơn', value: 'Trường THPT Tây Sơn' },
        { label: 'Trường THPT Võ Lai', value: 'Trường THPT Võ Lai' },
        { label: 'Trường THPT Nguyễn Huệ', value: 'Trường THPT Nguyễn Huệ' },
        { label: 'Trường THPT DTNT Vân Canh', value: 'Trường THPT DTNT Vân Canh' },
        { label: 'Trường THPT Vân Vanh', value: 'Trường THPT Vân Vanh' },
        { label: 'Trường THPT Số 1 An Nhơn', value: 'Trường THPT Số 1 An Nhơn' },
        { label: 'Trường THPT Số 2 An Nhơn', value: 'Trường THPT Số 2 An Nhơn' },
        { label: 'Trường THPT Số 3 An Nhơn', value: 'Trường THPT Số 3 An Nhơn' },
        { label: 'Trường THPT Hòa Bình', value: 'Trường THPT Hòa Bình' },
        { label: 'Trường THPT Nguyễn Đình Chiểu', value: 'Trường THPT Nguyễn Đình Chiểu' },
        { label: 'Trường THPT Nguyễn Trường Tộ', value: 'Trường THPT Nguyễn Trường Tộ' },
    ];
    const [dataSchool, setDataSchool] = useState(data_school_BinhDinh)
    const DropdownComponent_school = () => {
        return (
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataSchool}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="---Select---"
                searchPlaceholder="Search..."
                value={valueSchool}
                onChange={item => {
                    setValueSchool(item.value);
                }}
            />
        );
    };
    
    return (
    <View style ={{width: "100%", height:"100%", backgroundColor:"#fff"}}>
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
                            onPress = {()=> {navigation.goBack()}}>
                    <Icon name="arrow-left" style ={{}} size={40} color="#f26f21"/>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
                <Text style={{ fontWeight:800,marginLeft:10,fontSize: 24, color: "#f26f21",}}>
                ĐĂNG KÍ TƯ VẤN
                </Text>
            </View>
            </View> 
        </View>

        <View style= {{width: "100%",padding:20, marginBottom:30}}>
            <View style={{marginBottom:10}}>
                <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                    Họ và tên *
                </Text>
                <TextInput style={{height:38, width:"100%",borderWidth:2, borderColor:"#f26f21", fontSize:20, paddingHorizontal:10,}}
                                    onChangeText={(text) => {
                                        SetName(text)
                                        }}
                                        value = {Name}
                                    />
            </View>
            <View style={{marginBottom:10}}>
                <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                    Số điện thoại *
                </Text>
                <TextInput style={{height:38, width:"100%",borderWidth:2, borderColor:"#f26f21", fontSize:20, paddingRight:10, paddingLeft:10,}}
                                    onChangeText={(text) => {
                                        SetPhone(text)
                                        }}
                                        value = {Phone}
                                        keyboardType='numeric'
                                    />                            
            </View>
            <View style={{marginBottom:10}}>
                <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                    Email *
                </Text>
                <TextInput style={{height:38, width:"100%",borderWidth:2, borderColor:"#f26f21", fontSize:20, paddingHorizontal:10,}}
                                    onChangeText={(text) => {
                                        SetEmailValue(text)
                                        }}
                                        value = {emailValue}
                                    />
            </View>

            <View style={{flexDirection:"row", width:"100%",justifyContent:"space-between",marginBottom:10}}>
                <View style={{width:"28%",}}>
                    <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                        Năm sinh *
                    </Text>
                    <View>
                        <DropdownComponent_year/>
                    </View>
                </View>

                <View style={{width:"68%"}}>
                    <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                        Tỉnh thành *
                    </Text>
                    <View style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                        <DropdownComponent_province/>
                    </View>
                </View>
            </View>

            <View style={{marginBottom:10}}>
                <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                    Trường *
                </Text>
                <View>
                    <DropdownComponent_school/>
                </View>
            </View>

            <View>
                <Text style={{color:"#f26f21", fontSize:18, fontWeight:700}}>
                    Chuyên ngành *
                </Text>
                <View>
                    <DropdownComponent_major/>
                </View>
            </View>

        </View> 

        <View style={{width:"100%", height:50,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity style={{width:150,flexDirection:"row", height:"100%", justifyContent:"center",alignItems:"center", backgroundColor:"#0066b2", borderRadius:25}}
                    onPress={call_save_sever}>  
                <Text style={{fontSize:20, fontWeight:800,color:"#fff",marginRight:7}}>
                    Đăng ký 
                </Text>
                <Icon name="caret-right" style ={{}} size={28} color="#fff"/>
            </TouchableOpacity>
        </View>
        {SuccessScreen && (
        <View style={{width:"100%", height:"100%", zIndex: 1, backgroundColor: 'rgba(86, 86, 86, 0.9)',position: 'absolute', alignItems:"center",justifyContent:"center"}}>
            <Icon name="check-circle-o" style ={{}} size={100} color="#00FF00"/>
            <Text style={{marginTop:20, fontSize:26, fontWeight:700, color:"#fff"}}>Đăng kí thành công</Text>
        </View>)}
    </View>
    );
}
const styles = StyleSheet.create({

    dropdown: {
      height: 42,
      borderWidth: 2,
      borderColor:"#f26f21"
    },

    placeholderStyle: {
      fontSize: 16,
      paddingLeft:10,
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