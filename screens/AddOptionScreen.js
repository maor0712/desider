import { View, StyleSheet } from "react-native";
import OptionForm from "../components/manageOptions/OptionForm";
import { useContext, useLayoutEffect, useState } from "react";
import { OptionsContext } from "../store/option-contex";
import { GlobalStyles } from "../constants/Styles";
import uuid from 'react-native-uuid';
import BtnIcon from "../components/ui/BtnIcon";

// const uuidv4 = require("uuid/v4")

export default function AddOptionScreen({route, navigation}){
    // const [isSubmit, setIsSubmit] = useState(false);
    const optionsCtx = useContext(OptionsContext);
    // const [error, setError] = useState();

    const editedOptionId = route.params?.optionId;
    const isEditing = !!editedOptionId;

    const currentOption = optionsCtx.options.find(option => option.id === editedOptionId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Option' : 'Add New Option'
        })
    }, [navigation, isEditing]);

    async function deleteOptionHandler(){
        // setIsSubmit(true)
            optionsCtx.deleteOption(editedOptionId);
            navigation.goBack();     
    };

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(optionDetails){
        if(isEditing){
            optionsCtx.updateOption(editedOptionId,optionDetails);
            navigation.goBack();
        }else{
            const id = uuid.v4();
            optionsCtx.addOption({...optionDetails, id: id});
            navigation.goBack();
        }    
    }

    return(
        <View style={styles.container}>
        <OptionForm 
        onCancle={cancelHandler}
        submitLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValue={currentOption}
        />

        {isEditing && (
            <View style={styles.deleteContainer}>
                <BtnIcon 
                icon='trash'
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteOptionHandler}/>
            </View>
        )  
        }
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        justifyContent: 'center'
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary100,
        alignItems: 'center',
    }
})