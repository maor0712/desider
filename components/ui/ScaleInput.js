import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/Styles';

const ScaleInput = ({ label, onValueChange, defaultValue }) => {
  const [selectedPart, setSelectedPart] = useState();


  useEffect(() => {
      setSelectedPart(defaultValue)
  
  },[defaultValue])
// console.log(selectedPart);

  const handlePress = (part) => {
    if(!onValueChange){
      return
    }
    setSelectedPart(part);
    onValueChange(part);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.scaleContainer}>
        <TouchableOpacity
          style={[styles.scalePart, styles.firstScalePart]}
          onPress={() => handlePress(1)}
        />
        <TouchableOpacity
          style={[styles.scalePart, selectedPart >= 2 && styles.secondScalePart]}
          onPress={() => handlePress(2)}
        />
        <TouchableOpacity
          style={[styles.scalePart, selectedPart == 3 && styles.thirdScalePart]}
          onPress={() => handlePress(3)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%'
  },
  label: {
    fontSize:17,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scalePart: {
    flex:1,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
  },
  firstScalePart: {
    backgroundColor: GlobalStyles.colors.scale100,
  },
  secondScalePart: {
    backgroundColor: GlobalStyles.colors.scale200,
  },
  thirdScalePart: {
    backgroundColor: GlobalStyles.colors.scale300,
  },
});

export default ScaleInput;
