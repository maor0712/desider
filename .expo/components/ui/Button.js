import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

export default function Button({ children, onPress, mode, style }) {
  const containerStyle = Array.isArray(style) ? style[0] : style;

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            Array.isArray(style) && style[1], // Check if style is an array and has a second element
          ]}
        >
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    // color: GlobalStyles.colors.primary200
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 50,
  },
});
