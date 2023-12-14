import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Text, ImageBackground, Dimensions, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default draft = ({navigation}) => {
  const [isShaking, setShaking] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(false);
  const taskbarWidth = width / 2;
  const taskbarAnimation = new Animated.Value(showTaskbar ? -taskbarWidth : 0);

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
      setShowTaskbar(true);
      Animated.timing(taskbarAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      await delay(4000);
      navigation.navigate("CheckInPage");
    }, 3000);
  };

  const handleTaskbarPress = () => {
    setShowTaskbar(false);
    Animated.timing(taskbarAnimation, {
      toValue: -taskbarWidth,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 50, marginTop: -50 }}>
        <Text style={{ color: '#FF9900', fontSize: 20, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
          Chúc mừng bạn đã hoàn thành nhiệm vụ
        </Text>
      </View>
      <View>
        <Text style={{ color: "#fff", fontSize: 18, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
          - Nhấn vào hộp quà để mở -
        </Text>
      </View>
      <View style={{ height: 500, marginBottom: -300, marginTop: 200 }}>
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
      </View>
      <Animated.View
            style={[
            styles.taskbar,
            {
                transform: [
                {
                    translateX: taskbarAnimation,
                },
                ],
            },
            ]}
            >
            <TouchableOpacity onPress={handleTaskbarPress}>
            <Text style={{ color: '#fff', fontSize: 18, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
                Taskbar
            </Text>
            </TouchableOpacity>
            {/* Nội dung của taskbar */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
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
  taskbar: {
    position: 'absolute',
    top: 0,
    right: -(2*width) / 4,
    width: (2*width) / 3,
    height: '100%',
    backgroundColor: '#000',
    zIndex: 999,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
