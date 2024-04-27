import React, { useContext } from "react";
import { Text,Switch,View } from "react-native";
import { ThemeContext } from "./theme/themeManager";
import styles from "./switchThemeStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Toggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <View style={[styles[`switch${theme}`]]}>
      <Ionicons name={theme === 'light' ? 'sunny' : 'moon'} style={theme === 'light' ? styles.iconlight : styles.icondark}/>
      <Text style={theme === 'light' ? styles.textlight : styles.textdark}>Modo Oscuro</Text> 
      <Switch
        trackColor={styles.trackColor}
        thumbColor={styles.thumbColor}
        style={styles.switch}
        value={theme === 'dark'}
        onValueChange={toggleTheme} 
      />
    </View>
  );
};

export default Toggle
