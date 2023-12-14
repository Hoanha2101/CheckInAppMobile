import React, { useState ,Component} from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Text, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default GiftBox = ({navigation}) => {
  const [isShaking, setShaking] = useState(false);
  const [isOpened, setOpened] = useState(false);

  const rewards = [
    'Bình nước',
    'Quạt cầm tay',
    'Cây viết',
    'Dây đeo',
    'Móc khóa',
    'Sổ tay nhỏ',
    'sổ tay lớn'
  ];

  const openGift = () => {
    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    if (isShaking || isOpened) return;

    setShaking(true);

    setTimeout(async () => {
      const randomRewardIndex = Math.floor(Math.random() * rewards.length);
      const randomReward = rewards[randomRewardIndex];
      Alert.alert('Chúc mừng!', `Bạn đã nhận được "${randomReward}" từ hộp quà.`);
      setShaking(false);
      setOpened(true);
      await delay(4000);
      navigation.navigate("CheckInPage")
    }, 3000);
  };

  return (
    <View style={styles.container}>
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
                  <Icon name="home" style ={{}} size={40} color="#33B8DC"/>
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
              <Text style={{ fontWeight:600,marginLeft:10,fontSize: 24, color: "#33B8DC",}}>
              Reward
              </Text>
          </View>
        </View> 
      </View>
      <View style={{height: "90%",width:"100%", top:200, alignItems:"center"}}>
        <View style={{height: "100%",width: 300, borderRadius: 130 ,
          borderBottomRightRadius: 50,borderBottomLeftRadius: 50,
          shadowBottomColor: "#000",
          shadowOffset: {
              width: 0,
              height: 15,
          },
          shadowBottomOpacity: 0.51,
          shadowBottomRadius: 16,
          elevation: 23,}}>
          <TouchableOpacity onPress={openGift}>
            <Animatable.View
              style={[styles.giftBox, isShaking && styles.shakingBox]}
              animation={isShaking ? 'swing' : null}
              iterationCount={isShaking ? 'infinite' : 1}
              duration={3000}
            >
              {isOpened ? (
                <Image source={require('../images/gift_open.png')} style={styles.giftImage} />
              ) : (
                <Image source={require('../images/gift.png')} style={styles.giftImage} />
              )}
            </Animatable.View>
          </TouchableOpacity>

          <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
              <Text style={{ fontWeight:800,marginLeft:10,fontSize: 15, color: "#33B8DC",}}>
              Chạm để mở
              </Text>
          </View>
          <View style={{flexDirection:"row", justifyContent: "center", alignItems:"center",marginRight:26,}}>
              <Text style={{ fontWeight:800,marginLeft:10,fontSize: 15, color: "#33B8DC",}}>
              Phần quà Check In
              </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  giftBox: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shakingBox: {
    transform: [{ rotate: '45deg' }],
  },
  giftImage: {

    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});


