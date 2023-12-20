import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet, Animated, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/Styles";
import ScaleInput from "./ui/ScaleInput";

export default function OptionsOutput({ options, updateValues, selectedOption, editValue }) {
  const navigation = useNavigation();
  const [optionsList, setOptionsList] = useState();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if(editValue === 'Add'){
        setOptionsList(options);
    }
     
  },[options, editValue])

  useEffect(() => {
    
    const fetchData = async () => { 
          const tempArr = options.slice(0,3);
          setOptionsList(tempArr)
      for (let i = 0; i < tempArr.length; i++) {
        if (selectedOption !== undefined) {
          setOptionsList([tempArr[i]]);  
  
          await delay(2000);
  
        }
      }

      setOptionsList(selectedOption);
      updateValues()

    };

    if (selectedOption) {
      fetchData();
    }
  
  }, [selectedOption, fadeAnim]);

  function optionPressHandler(itemId) {
    if(selectedOption){
        return
    }
    navigation.navigate("AddOption", {
      optionId: itemId,
    });
  }

  function renderOptionsItem(itemData) {
    return (   
        <Animated.View style={{opacity: fadeAnim}}> 
            <Pressable
                onPress={() => optionPressHandler(itemData.item.id)}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={styles.boxContainer}>
                    <View>
                        <Text style={styles.optionText}>{itemData.item.option}</Text>
                    </View>
                    <View style={styles.chanceBox}>
                        {/* <Text style={styles.chanceText}>{itemData.item.chance}</Text> */}
                       {optionsList !== selectedOption && <ScaleInput defaultValue={itemData.item.chance}/>}
                    </View>
                    </View>
            </Pressable>
      </Animated.View> 
  

    );
  }

  let content = <View style={styles.defaultTextContainer}><Text style={styles.defaultText}>Enter your options</Text></View>;

  if (options.length > 0) {
    content = (
      <FlatList
        data={optionsList}
        numColumns={2}
        keyExtractor={(option) => option.id}
        renderItem={(item) => renderOptionsItem(item)}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 20,
        alignItems:'center',
      },
      boxContainer:{
        margin:16,
        padding: 16,
        borderRadius:8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width:0, height: 2 },
        shadowRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 150,    
      },
      optionText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 8,
      },

      chanceText: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent:'center',
        fontWeight: "bold",
        color: "white", 
      },
      defaultTextContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      defaultText:{
        fontSize: 24,
      },
      pressed: {
        opacity: 0.7,
      },
});
