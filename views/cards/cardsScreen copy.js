import React, { useState, useEffect, useContext, useRef } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ScrollView, ImageBackground, PanResponder,Animated } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './cardsScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackButton from '../../components/backButtonc';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from "../../components/theme/themeManager";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/menu/menu';

const categories = ['TODOS', 'GAS', 'ULTRASONICO', 'TEMPERATURA', 'HUMEDAD'];
const categoriesIcon = ['layer-group','cloud', 'wave-square', 'temperature-high', 'water'];
const categoriesIconColor = ['#DE784E','#A8A6AC', '#ffd128', '#FF5AA0', '#34c1fd'];

const CardsScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  
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

  const sensorTypeMapping = {
    'TODOS': ['gasDetector', 'ultrasonic', 'temperature','humidity'],
    'GAS': 'gasDetector',
    'ULTRASONICO': 'ultrasonic',
    'TEMPERATURA': 'temperature',
    'HUMEDAD': 'humidity',
  };

  useEffect(() => {
    const loadSensorAlerts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        if (!userToken || !userId) {
          throw new Error('User token or user ID not available');
        }

        const deviceResponse = await axios.get(`http://${global.ipDireccion}:3000/api/devices/byAdmin`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (deviceResponse.data.length === 0) {
          throw new Error('No devices found for this user');
        }
        const deviceId = deviceResponse.data[0]._id; // Asumiendo que el usuario tiene al menos un dispositivo
        const mappedSensorTypes = selectedCategory === 'TODOS' ? sensorTypeMapping['TODOS'] : [sensorTypeMapping[selectedCategory]]; // Asegúrate de que esto sea un array


        let allAlerts = [];
        for (const sensorType of mappedSensorTypes) {
          console.log(deviceId)
          const alertsResponse = await axios.get(`http://${global.ipDireccion}:3000/api/devices/${deviceId}/sensors/${sensorType}/alerts`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          const sensorAlerts = alertsResponse.data.map(alert => ({
            ...alert,
            id: alert._id,
            category: sensorType.toUpperCase(),
            alertType: alert.messageType,
            value: alert.message,
          }));
          //console.log(sensorAlerts)

          allAlerts = [...allAlerts, ...sensorAlerts];
        }

        setMessages(allAlerts);
      } catch (error) {
        console.error('Error fetching sensor alerts:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
  };

    loadSensorAlerts();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredMessages = messages; // Si ya están correctamente filtrados, esto podría ser todo lo que necesitas
  
  const { theme } = useContext(ThemeContext);
  const dark ='../../assets/images/tile_background4.png';
  const light ='../../assets/images/tile_background9.png';
  

  return (
    <SafeAreaView style={{...(styles.safeArea),...(styles.backgroundImage),...(styles.container),
    //  ...{ marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }
     }}>
      <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{...(styles.backgroundImage),...(styles.container)}}
      >  
        <Header navigation={navigation} panResponder={panResponder}/>
        {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 
        <CategoriesMenu categories={categories} categoriesIcon={categoriesIcon} categoriesIconColor={categoriesIconColor} selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
        <FlatList data={filteredMessages}  keyExtractor={(item) => item.id} renderItem={({ item }) => <OfferCard {...item}/>}/>
      </ImageBackground>
    </SafeAreaView>
    );
  };

const Header = ({ navigation, panResponder }) => (
  <View style={styles.headerContainer} {...panResponder.panHandlers}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Estados y Avisos</Text>
    </View>
    <BackButton navigation={navigation}/>
  </View>
);

  const CategoriesMenu = ({ categories, selectedCategory, categoriesIcon, categoriesIconColor, onSelectCategory }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
      {categories.map((category) => {
        const iconName = categoriesIcon[categories.indexOf(category)];
        const iconColor = categoriesIconColor[categories.indexOf(category)];

        return (
          <TouchableOpacity key={category} onPress={() => onSelectCategory(category)}
            style={[styles.categoryButton, selectedCategory === category && 
            {...styles.categoryButtonSelected, borderBottomColor: iconColor}]}
            >
            <Text 
            style={[styles.categoryButtonText, selectedCategory === category && {...styles.categoryButtonTextSelected, color: iconColor}]}
            >
              {category}
            </Text>
            {/* {selectedCategory === category && ( */}
            <View 
            style={[styles.categoryIcon, selectedCategory === category && {...styles.categoryIconSelected, shadowColor: '#ffd128' }]}
            > 
              <FontAwesome5 name={iconName} size={30} color={iconColor} />
            </View>
            {/* )} */}
        </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
    //history, sliders, bug, info-circle



    /*<TouchableOpacity key={category} onPress={() => onSelectCategory(category)}>
    <LinearGradient colors={['#8c9494', '#5d5e69', '#1b1e28']} locations={[0, 0.3, 1]}
      style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonSelected]}
    >
      <Text style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextSelected]}>
        {category}
      </Text>
      <View 
      style={[styles.categoryIcon, selectedCategory === category && {...styles.categoryIconSelected, shadowColor: iconColor}]}
    >
        <FontAwesome5 name={iconName} size={30} color={iconColor} />
        </View>
    </LinearGradient>
  </TouchableOpacity>*/






  const getAlertStyles = (alertType) => {
    switch (alertType) {
      case "Alerta":
        return { borderColor: '#fb5b5a', icon: 'times-rectangle', backgroundColor: '#fb5b5a', iconColor: '#fb5b5a', buttonText: 'Resolver' };
      case "Advertencia":
        return { borderColor: '#F5BE2E', icon: 'warning', backgroundColor: '#F5BE2E', iconColor: '#F5BE2E', buttonText: 'Detalles' };
      case "Error":
        return { borderColor: '#6A969D', icon: 'bug', backgroundColor: '#6A969D', iconColor: '#6A969D', buttonText: 'Más Info' };
      default:
        // Un estilo por defecto para tipos de alerta no esperados
        return { borderColor: 'grey', icon: 'question-circle', buttonText: '' };
    }
  };

  const OfferCard = ({ id, category, alertType, value, timestamp }) => {
    const { borderColor, icon, iconColor, backgroundColor, buttonText } = getAlertStyles(alertType);
    const formattedTimestamp = new Date(timestamp).toLocaleString();
  
    const humanReadableCategory = {
      gasdetector: 'GAS',
      ultrasonic: 'ULTRASONICO',
      temperature: 'TEMPERATURA',
      humidity:'HUMEDAD',
    }[category.toLowerCase()] || 'Desconocido';
  
    return (
      <Card containerStyle={[styles.cardContainer, { borderColor }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={icon} size={40} color={iconColor} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardTimestamp}>{formattedTimestamp}</Text>
            <Text style={styles.cardTitle}>{humanReadableCategory}</Text>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardValue}>{alertType}</Text>
          </View>
        </View>
        {buttonText && (
          <TouchableOpacity style={[styles.cardActionButton, { backgroundColor }]}>
            <Text style={styles.cardActionButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </Card>
    );
  };
  
const copyToClipboard = (code) => {
    // Utilizaría el Clipboard API de React Native o algún paquete externo
    console.log(`Código ${code} copiado al portapapeles`);
  };

export default CardsScreen;

/* /hugo/humo/max
{
  advertencia
}
 */