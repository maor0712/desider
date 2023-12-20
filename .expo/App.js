import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import AllOptionsScreen from './screens/AllOptionsScreen';
import AddOptionScreen from './screens/AddOptionScreen';
import BtnIcon from './components/ui/BtnIcon'
import OptionsContexProvider from './store/option-contex';
import Button from './components/ui/Button';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="light" />
    <OptionsContexProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='AllOptions' component={AllOptionsScreen}  options={() => ({ 
             headerTransparent: true , 
             headerTitle: '',
           })}/>
          <Stack.Screen name='AddOption' component={AddOptionScreen} 
          options={{ 
            headerShown: false,
             presentation: 'modal'  }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </OptionsContexProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
