import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from "../components/theme/themeManager";
import HomeScreen from '../views/homeScreen/homeScreen';
import HomeScreenAdmin from '../views/homeScreen/homeScreenAdmin';
import LoginScreen from '../views/LoginScreenV/LoginScreen';
import RegisterScreen from '../views/registerScreen/RegisterScreen';
import MQTTComponent from '../views/comunication/comunicationScreen';
import CardsScreen from '../views/cards/cardsScreen';
import DashboardScreen from '../views/dashboard/dashBoardScreen';
import ProfileScreen from '../views/profile/profileScreen';
import NosotrosScreen from '../views/Nosotros/NosotrosScreen';
import GraphicScreen from '../views/graphics/graphicsScreen';
/* import Wallet from '../views/graphAd/sensorDataScreen.tsx'; */
import RequestsScreen from '../views/request/requesScreen';
import AdminDashboardScreen from '../views/adminDashboard/adminDashboardScreen';
import EditProfileScreen from '../views/editProfile/editProfileScreen';
import SesionExpired from '../views/SesionExpired/sesionExpired';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeAdmin" component={HomeScreenAdmin} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Api" component={MQTTComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="Cards" component={CardsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Graphic" component={GraphicScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Nosotros" component={NosotrosScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SesionExpired" component={SesionExpired} options={{ headerShown: false }}/>
        <Stack.Screen name="Request" component={RequestsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavWithTheme = () => {
  const { theme } = useContext(ThemeContext);

  return <AppNavigator theme={theme} />;
};

export default NavWithTheme