import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Router from './ui/Router';
import { NavigationContainer } from '@react-navigation/native'
import googleFit, { Scopes, BucketUnit } from 'react-native-google-fit';
import {
    getHeartRateSamples,
    disconnetGFit
} from './wear_module/index'

const Entry = () => {


    return (
        <NavigationContainer>
            <Router />
        </NavigationContainer>
    );
}

export default Entry;