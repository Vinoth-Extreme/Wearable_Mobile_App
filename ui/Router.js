import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AuthroizeScreen from './AuthorizeScreen';
import HeartRateFilterScreen from './HeartRateFilterScreen';
import HeartRateScreenTwo from './HeartRateScreen';
import VitalSelectionScreen from './VitalSelectionScreen';
import StepsVitalScreen from './StepsVitalScreen';

const Stack = createStackNavigator();

const Router = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#fff' },
                headerStyle: { backgroundColor: '#000' }
            }}
        >
            <Stack.Screen 
                name={"AUTHORIZESCREEN"}
                component={AuthroizeScreen}
                options={{
                    headerTitle: "Authorize"
                }}
            />

            <Stack.Screen 
                name={"VITALSELECTION"}
                component={VitalSelectionScreen}
                options={{
                    headerTitle: "Select Vital",
                    headerLeft: null
                }}
            />
            
            <Stack.Screen 
                name={"HEARTRATE"}
                component={HeartRateScreenTwo}
                options={{
                    headerTitle: "HeartRates",
                    headerLeft: null,
                }}
            />
            
            <Stack.Screen 
                name={"STEPS"}
                component={StepsVitalScreen}
                options={{
                    headerTitle: "Track your steps",
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    );
}

export default Router;