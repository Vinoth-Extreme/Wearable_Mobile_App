import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sleepData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
        {
            data: [9, 6, 6.5, 8, 4, 7, 8],
            baseline: 8
        }
    ]
};

const HeartRateScreen = ({
    naivgation
}) => {

    return (
        <View style={{ backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            
        </View>
    );
}

export default HeartRateScreen;