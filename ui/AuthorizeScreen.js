import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import googleFit from 'react-native-google-fit';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
      Scopes.FITNESS_HEART_RATE_READ,
      Scopes.FITNESS_HEART_RATE_WRITE,
    ],
  };

const AuthroizeScreen = ({
    navigation
}) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if(isAuthorized === true) {
            navigation.replace("VITALSELECTION")
        } else {
            authorize();
        }
    }, [isAuthorized])

    const authorize = async () => {
        const res = await googleFit.authorize(options)
        setIsAuthorized(old => res.success)
    }

    const onDisconenct = () => {
        console.log('onDisconnected');
        GoogleFit.disconnect()
    }

    return (
        <View style={{
            backgroundColor: '#efefef',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>
            <Button 
                title={"Authorize Google Fit"}
                onPress={authorize}
                color={"#000"}
            />

            {/* <Text>{'\n'}</Text>
            
            <Button 
                title={"Disconnect Google Fit"}
                onPress={onDisconenct}
                color={"#000"}
            /> */}
        </View>
    );
}

export default AuthroizeScreen;