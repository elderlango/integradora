import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

const sizes = {
    small: {
      fontSize: 16,
      padding: 8,
      // Other style properties
    },
    // Define styles for other sizes
  };


const variations = {
    swapii: {
      color: '#ffffff',
      backgroundColor: '#3f51b5',
      // Other style properties
    },
    // Define styles for other variations
  };



const CustomButton = styled(TouchableOpacity)`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${(props) => props.size && sizes[props.size]}
  ${(props) => props.variation && variations[props.variation]}
`;


CustomButton.defaultProps = {
    variation: "primary",
    size: "medium",
  };
  
export default CustomButton;
