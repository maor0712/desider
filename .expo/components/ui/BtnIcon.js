import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/Styles";

export default function BtnIcon({icon, size, color, onPress}){
    return(
        <Pressable style={({ pressed }) => [pressed && styles.pressed, styles.pressable]} onPress={onPress}>
            <Ionicons name={icon} size={size} color={color}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable:{
        borderRadius: 50
    },
    button:{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed:{
        opacity: 0.7,
    }

})
