import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './OptionsScreenStyle';
import IconSocial from '../../components/iconSocialUs';
import upperText from '../../components/upperText';
import contentContainer from '../../components/contentContainer';
import Gon from 'react-native-vector-icons/MaterialIcons';

const OptionsScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
    
      <View style={styles.header}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
        <Gon name="menu" size={40} color="#F7F6FA"/>
        </TouchableOpacity>
        <Text style={styles.logo}>AirGuard</Text>
      </View>
      
      
      <ScrollView contentContainerStyle={styles.scrollView}>
      
      </ScrollView>
    </View>
    </ImageBackground>
    </View>
    
  );
};

export default OptionsScreen;
