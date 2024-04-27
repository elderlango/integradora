import React, { useContext } from "react";
import { TouchableOpacity} from "react-native";
import { ThemeContext } from "./theme/themeManager";
import styles from "./backButton";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Toggle = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
  <TouchableOpacity onPress={() => navigation.goBack()} style={theme === 'dark' ? styles.backButton : styles.backButtonDark}>
        <AntDesign name="caretleft" style={theme === 'dark' ? styles.navBack : styles.navBackDark} />
      </TouchableOpacity>
  );
};

export default Toggle
