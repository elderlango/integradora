import React, { useState, useEffect,useContext,useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, ScrollView, Dimensions, ActivityIndicator, PanResponder,Animated } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Importar BarChart de react-native-chart-kit
import styles from './graphicsScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../components/backButtonc';
import { ThemeContext } from "../../components/theme/themeManager";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/menu/menu';

const screenWidth = Dimensions.get("window").width; // Obtener el ancho de la pantalla para el gráfico

const categories = ['TODOS', 'GAS', 'ULTRASONICO', 'TEMPERATURA', 'HUMEDAD'];
const categoriesIcon = ['layer-group','cloud', 'wave-square', 'temperature-high', 'water'];
const categoriesIconColor = ['#DE784E','#A8A6AC', '#ffd128', '#FF5AA0', '#34c1fd'];
const categoriesColor = ['#a85c3d','#A8A6AC', '#bca91e', '#b03d6f', '#1f8cbf'];

const GraphicScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [graphData, setGraphData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataForSensor = async (sensorType = 'TODOS') => {
      setIsLoading(true);
      setError('');
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          throw new Error('User token not available');
        }
        const headers = { Authorization: `Bearer ${userToken}` };

        const endpoint = `http://${global.ipDireccion}:3000/api/devices/byAdmin`;
        const adminDevicesResponse = await fetch(endpoint, {
          method: 'GET',
          headers,
        });

        const adminDevicesData = await adminDevicesResponse.json();
        if (!adminDevicesResponse.ok) {
          throw new Error(adminDevicesData.message || 'Failed to fetch devices');
        }

        if (adminDevicesData && adminDevicesData.length > 0) {
          const deviceId = adminDevicesData[0]._id;

          let mappedSensorType = '';
          switch(sensorType.toUpperCase()) {
              case 'GAS': mappedSensorType = 'gasDetector'; break;
              //case 'GAS': mappedSensorType = 'gasDetector'; console.log(mappedSensorType); break;
              case 'ULTRASONICO': mappedSensorType = 'ultrasonic'; break;
              case 'TEMPERATURA': mappedSensorType = 'temperature'; break;
              case 'HUMEDAD': mappedSensorType = 'humidity'; break;
              default: throw new Error('Tipo de sensor no reconocido: ' + sensorType);
          }

          const endpoint2 = `http://${global.ipDireccion}:3000/api/devices/${deviceId}/sensors/${mappedSensorType}/data`;
          //console.log(endpoint2)
          const sensorDataResponse = await fetch(endpoint2, { method: 'GET', headers });
          const sensorData = await sensorDataResponse.json();

          //console.log(`Data for ${mappedSensorType}: ${sensorData}`)

          if (!sensorDataResponse.ok) {
            throw new Error(sensorData.message || `Failed to fetch data for sensor: ${sensorType}`);            
          }

          if (sensorData && sensorData.length > 0) {
            //console.log(sensorData)
            setGraphData(prevData => ({
              ...prevData,
              [sensorType]: sensorData
            }));
          } else {
            throw new Error(`No data found for sensor: ${sensorType}`);
          }
        } else {
          throw new Error('No devices found for this admin');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    
    if (selectedCategory === 'TODOS') {
      global.categories.forEach(category => {
        fetchDataForSensor(category);
      });
    } else {
      fetchDataForSensor(selectedCategory);
    }
  }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
      };
     
      const getChartData = (sensorData, sensorType) => {
        // Crear un arreglo de valores basado en el tipo de sensor
        let values;
        switch(sensorType) {
          case 'GAS':
            values = sensorData.map(item => item.value);
            break;
          case 'ULTRASONICO':
            values = sensorData.map(item => item.distance);
            break;
          case 'TEMPERATURA':
            values = sensorData.map(item => item.temperature);
            break;
          case 'HUMEDAD':
            values = sensorData.map(item => item.humidity);
            break;
          default:
            values = [];
        }
        return {
          labels: sensorData ? sensorData.map(item => new Date(item.timestamp).toLocaleTimeString()) : [],
          datasets: [{
            data: values,
          }],
          legend: ["Sensor Data"] // Esto es opcional
        };
      };
      
      const chartConfig = {
        backgroundGradientFrom: theme === 'light' ? "#F7F6FA" : "#202124",
        backgroundGradientTo: theme === 'light' ? "#F7F6FA" : "#202124",
        decimalPlaces: 2,
        barPercentage: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color del texto
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color del texto
        propsForLabels: { rotation: '0',fontSize: "14",},
        formatXLabel: (label, index, labels) => {
          const interval = 1;
          return index % interval === 0 ? label : '';
        },
        
      };
      
      const { theme } = useContext(ThemeContext);
      const dark ='../../assets/images/tile_background4.png';
      const light ='../../assets/images/tile_background9.png';

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

    return (
      <SafeAreaView style={{...(styles.backgroundImage),...(styles.container)}}>
        <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{...(styles.backgroundImage),...(styles.container)}}
      >  
        <View style={styles.headerContainer} {...panResponder.panHandlers}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Gráficas de Sensores</Text>
          </View>
          <BackButton navigation={navigation}/>
        </View>
        {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => {
        const iconName = categoriesIcon[categories.indexOf(category)];
        const iconColor = categoriesIconColor[categories.indexOf(category)];

        return (
          <TouchableOpacity key={category} onPress={() => handleCategorySelect(category)}
            style={[styles.categoryButton, selectedCategory === category && 
            {...styles.categoryButtonSelected, borderBottomColor: iconColor}]}
            >
            <Text 
            style={[styles.categoryButtonText, selectedCategory === category && {...styles.categoryButtonTextSelected, color: iconColor}]}
            >
              {category}
            </Text>
            <View 
            style={[styles.categoryIcon, selectedCategory === category && {...styles.categoryIconSelected, shadowColor: '#ffd128' }]}
            > 
              <FontAwesome5 name={iconName} size={30} color={iconColor} />
            </View>
        </TouchableOpacity>
          );
        })}
        </ScrollView>
  
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView >
  {selectedCategory === 'TODOS' ? (
    categories.filter(category => category !== 'TODOS').map((category) => {
      const iconColor = categoriesColor[categories.indexOf(category)];
      const labelColor = categoriesIconColor[categories.indexOf(category)];
      return graphData[category] ? (
        <View key={category} style={[{...styles.chartContainer, borderBottomColor: iconColor}]}>
          <Text style={{ textAlign: 'center',color:iconColor,fontWeight:'bold',fontSize:20 }}>{category}</Text>
          <BarChart
            data={getChartData(graphData[category], category)} // Asegúrate de pasar category aquí
            width={screenWidth}
            height={220}
            chartConfig={{ ...chartConfig,
              color: () => iconColor,
              labelColor: () => labelColor,
            }}
            fromZero={true}
          />
        </View>
      ) : null;
    })
  ) : 
  (
    

   graphData[selectedCategory] && (
      <View style={[{...styles.chartContainer, borderBottomColor: categoriesIconColor[categories.indexOf(selectedCategory)]}]}>
        <BarChart
          data={getChartData(graphData[selectedCategory], selectedCategory)}
          width={screenWidth}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: () => categoriesIconColor[categories.indexOf(selectedCategory)],
            labelColor: () => categoriesIconColor[categories.indexOf(selectedCategory)],
          }}
          fromZero={true}
        />
      </View>
    )
  )}
</ScrollView>

        )}
      </ImageBackground>
      </SafeAreaView>
    );
  };

/* const OfferCard = ({ type, value, alertType }) => {
  return(
    <Text style={styles.categoryButtonText}>{category}</Text>
  );
}; */

export default GraphicScreen;
