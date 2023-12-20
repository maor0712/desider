import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/Styles";


export default function Input({label, invalid, style, textInputConfig}){
    let inputStyles = [styles.input]

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }

    if(invalid){
        inputStyles.push(styles.invalidInput)
    }

    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.lable, invalid && styles.invalidLable]}>{label}</Text>
            {textInputConfig && textInputConfig.multiline ? (
        <ScrollView style={styles.scrollView}>
          <TextInput
            style={inputStyles}
            {...textInputConfig}
            multiline={true}
            numberOfLines={5} // Set the number of lines before scrolling
          />
        </ScrollView>
      ) : (
        <TextInput style={inputStyles} {...textInputConfig} />
      )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8,
    },
    lable:{
        fontSize:17,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline:{
        // minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLable:{
        color: GlobalStyles.colors.error500
    },
    invalidInput:{
        backgroundColor: GlobalStyles.colors.error50
    },
    scrollView: {
        maxHeight: 150, // Set the maximum height for the scrollable TextInput
      },
})