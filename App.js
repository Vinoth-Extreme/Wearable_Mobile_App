import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import googleFit, { Scopes } from 'react-native-google-fit';

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
  ]
};

const App = () => {

  useEffect(() => {
    authorize();
  }, [])

  const authorize = () => {
    googleFit.authorize().then(isAuth => console.log('========>', isAuth ,'<======='))
  }

  const disconnect = () => {
    googleFit.disconnect();
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title={"Connect"}
        onPress={authorize}
      />
      
      <Button 
        title={"Disconnect"}
        onPress={disconnect}
      />
    </View>
  );
}

export default App;