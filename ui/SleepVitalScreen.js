import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

const SleepVitalScreen = ({
    navigation
}) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, }}>No Data to show!</Text>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                <Text>Go Back...</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SleepVitalScreen;