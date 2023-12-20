import OptionsOutput from '../components/OptionsOutput'
import { useContext, useEffect, useState } from 'react'
import { OptionsContext } from '../store/option-contex'
import Button from '../components/ui/Button'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { arrayMaker } from '../utils/logic'
import { GlobalStyles } from '../constants/Styles'

export default function AllOptionsScreen({navigation}){
    const optionsCtx = useContext(OptionsContext);
    const [optionsArr, setOptionsArr] = useState(optionsCtx.options);
    const [addOrEdit, setAddOrEdit] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState();

 
    useEffect(() => {
        setOptionsArr(optionsCtx.options)
        setAddOrEdit('Add')
        setSelectedOption(null)
    },[optionsCtx.options])


    function onPressHandler(){
        if(optionsCtx.options.length <= 1){
            const message = optionsCtx.options.length === 0
            ? 'You did not add any option. You should add some options.'
            : 'This is all your options? You should add some more options.';
          Alert.alert('Invalid Operation', message);
            return
        }
        // setAddOrEdit('Edit');
        setIsLoading(true)

       const choosenOption = arrayMaker(optionsCtx.options);
       setSelectedOption(choosenOption)
    }

    function updateHandler(){
        setAddOrEdit('Edit');
        setIsLoading(false);
    }

    function editOrAddHandler(){
        if(addOrEdit === 'Add'){
            navigation.navigate('AddOption')
        }else if(addOrEdit === 'Edit'){
            setSelectedOption(null)
            setAddOrEdit('Add');
        }

    }

    return(
        <View style={styles.container}>
            <View style={styles.buttons}>
            {!isLoading && <Button style={[styles.button, styles.editBtn]} onPress={editOrAddHandler}>{addOrEdit}</Button>}
            {!isLoading && <Button style={[styles.button, styles.desiderBtn]} onPress={onPressHandler}>Desider</Button>}
            </View>
            {(addOrEdit === 'Edit' && !isLoading) && <Text style={styles.text}>The choosen option is:</Text>}
            <OptionsOutput options={optionsArr} selectedOption={selectedOption} updateValues={updateHandler} editValue={addOrEdit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 100,
        backgroundColor: GlobalStyles.colors.primary400
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button:{
        alignItems: 'center',
        borderRadius: 50,
        marginHorizontal: 5,
    }, 
    editBtn:{
        paddingHorizontal: 31,
        paddingVertical:34,
        justifyContent: 'center',
        borderRadius: 50,
    },
    desiderBtn:{
        paddingHorizontal: 20,
        paddingVertical:35,
        justifyContent: 'center',
        borderRadius: 50
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 40
    }
})