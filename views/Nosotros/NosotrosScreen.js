import React, { useState,useRef,useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground,PanResponder,Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './NosotrosScreenStyle';
import Gon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../../components/menu/menu';
import { ThemeContext } from "../../components/theme/themeManager";

const NosotrosScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  const menuPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        menuPosition.setValue({ x: gesture.dx, y: gesture.dy });
      },
      
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > 50) {
          setMenuVisible(true);
        } else {
          setMenuVisible(false);
        }
        Animated.spring(menuPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  return (
    <View style={styles.container} >
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
    
      <View style={styles.header} {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
        <Gon name="menu" size={40} color="#F7F6FA"/>
        </TouchableOpacity>
        <Text style={styles.logo}>AirGuard</Text>
      </View>

      {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 
      
      
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={theme === 'light' ? styles.brandsSection : styles.brandsSectionDark}>
          <Text style={theme === 'light' ? styles.titleText : styles.titleTextDark}>Equipo</Text>
          <View style={styles.profileItem}>
          <Imagen nombre={'hugo'} />
            <Nombres theme={theme} nombre={'Hugo'}/>
          </View>
          <View style={styles.profileItem}>
            <Imagen nombre={'salvador'} />
            <Nombres theme={theme} nombre={'Salvador'}/>
          </View>
          <View style={styles.profileItem}>
            <Imagen nombre={'axel'} />
            <Nombres theme={theme} nombre={'Axel'}/>
          </View>
          <View style={styles.profileItem}>
          <Imagen nombre={'gerardo'} />
            <Nombres theme={theme} nombre={'Gerardo'}/>
          </View>
          <View style={styles.profileItem}>
          <Imagen nombre={'miguel'} />
            <Nombres theme={theme} nombre={'Miguel'}/>
          </View>
          <View style={styles.profileItem}>
          <Imagen nombre={'esparza'} />
            <Nombres theme={theme} nombre={'Andy'}/>
          </View>
          <View style={styles.profileItem}>
          <Imagen nombre={'Andrea'} />
            <Nombres nombre={'Andrea'} theme={theme} />
          </View>
      </View>  

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AirGuard. Todos los derechos reservados.</Text>
          {/* Aquí se pueden añadir más elementos al footer si es necesario */}
        </View>
      
      </ScrollView>
    </View>
    </ImageBackground>
    </View>  
  );
};

const Nombres = ({ theme,nombre }) => (
  <Text style={theme === 'light' ? styles.profileText : styles.profileTextDark}>{nombre}</Text>
);


const Imagen = ({ nombre }) => {
  let imageSource;
  switch (nombre) {
    case 'andrea': imageSource = require('../../assets/images/andrea.png'); break;
    case 'esparza': imageSource = require('../../assets/images/esparza.png'); break;
    case 'miguel': imageSource = require('../../assets/images/miguel.png'); break;
    case 'gerardo': imageSource = require('../../assets/images/gerardo.png'); break;
    case 'axel': imageSource = require('../../assets/images/axel.png'); break;
    case 'chava': imageSource = require('../../assets/images/chava.png'); break;
    case 'hugo': imageSource = require('../../assets/images/yo.jpg'); break;
    default:imageSource = require('../../assets/images/andrea.png');break;
  }
  return <Image source={imageSource} style={styles.profileImage} />;
};

export default NosotrosScreen;
