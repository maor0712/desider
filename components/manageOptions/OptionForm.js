import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/Styles";

import Input from "./Input";
import Button from "../ui/Button";
import ScaleInput from "../ui/ScaleInput";

export default function OptionForm({onCancle, onSubmit, submitLabel, defaultValue}){

    const [inputs, setInputs] = useState({
        chance:{
            value: defaultValue ? defaultValue.chance.toString() : '1',
            isValid: true
        },
        option:{
            value: defaultValue ? defaultValue.option.toString() : '',
            isValid: true
        }
    })


    function valuesChangeHandler(inputIdentifier, enteredValues){
        setInputs((currentInput) => {
            return{
                ...currentInput,
                [inputIdentifier]: {value: enteredValues, isValid: true}
            }
        })
    }

    function submitHandler(){
        const optionData = {
            chance: +inputs.chance.value,
            option: inputs.option.value.trimEnd()
        }
        const chanceIsValid = !isNaN(optionData.chance) && optionData.chance > 0;
        const optionIsValid = optionData.option.trim().length > 0;
    
        if(!chanceIsValid || !optionIsValid){
            setInputs((currentInput) => {
                return{
                    chance: {value: currentInput.chance.value, isValid: chanceIsValid},
                    option: {value: currentInput.option.value, isValid: optionIsValid}
                }
            })
            return;
        }

        onSubmit(optionData)
    }

    let formIsValid = !inputs.chance.isValid || !inputs.option.isValid;



    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your option</Text>

            <Input 
                label={'Option'} 
                invalid={!inputs.option.isValid}
                textInputConfig={{
                multiline: true,
                onChangeText: valuesChangeHandler.bind(this, 'option'),
                value: inputs.option.value
                //autoCapitalize=""
                //autoComplete=false
            }}/>
             <View style={styles.inputsRow}>
                <ScaleInput 
                label={'Chance'}
                onValueChange={(value) => valuesChangeHandler('chance', value)}
                defaultValue={inputs.chance.value}/>
            </View>
            {formIsValid && <Text style={styles.errorText}>Invalid input - Please check your inputs</Text>
            }

            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancle}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitLabel}</Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    form:{
        marginTop: 40,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical:24,
        textAlign: 'center'
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex: 1
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8,
    },
})