import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {
    Line
} from 'react-native-svg'

const { width, height } = Dimensions.get('window');
const HeartRateCard = ({
    heartRateSamples
}) => {
    const [heartRateValues, setHeartRateValues] = useState([]);

    useEffect(() => {
        if(heartRateSamples.length > 0) {
            setHeartRateValues(() => [])
            heartRateSamples.map(heartRateObj => {
                // endDate
                // startDate
                // value
                // day
                setHeartRateValues(old => [...old, heartRateObj.value]);
            })
        }
    }, [])

    return (
        <View style={ss.container}>
            {
                heartRateValues.length > 0 ? (
                    <LineChart
                        style={{ width: '100%', height: '100%' }}
                        data={heartRateValues}
                        contentInset={{ top: 0, bottom: 20 }}
                        svg={{ stroke: "rgba(134, 65, 244, 0.8)", }}
                        animate={true}
                        yMin={50}
                        yMax={110}
                        withDots={true}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={false}

                    >
                        <Line 
                            x1={0} 
                            y1={(width - 150) / 3}
                            x2={width - 50} 
                            y2={(width - 150) / 3}
                            stroke="red" 
                            strokeWidth="2" 
                        />
                        <Line 
                            x1={0} 
                            y1={(width - 150) / 1.2} 
                            x2={width - 50} 
                            y2={(width - 150) / 1.2} 
                            stroke="red" 
                            strokeWidth="2" 
                        />

                        <Grid svg={null} />
                    </LineChart>
                    // <LineChart 
                    //     data={heartRateValues}
                    //     width={'100%'}
                    //     height={'100%'}
                    //     yAxisLabel={"BPM"}
                    //     yAxisSuffix={"K"}
                    //     yAxisInterval={10}
                    //     chartConfig={{
                    //         backgroundColor: "#e26a00",
                    //         backgroundGradientFrom: "#fb8c00",
                    //         backgroundGradientTo: "#ffa726",
                    //         decimalPlaces: 2, // optional, defaults to 2dp
                    //         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    //         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    //         style: {
                    //             borderRadius: 16
                    //         },
                    //         propsForDots: {
                    //             r: "6",
                    //             strokeWidth: "2",
                    //             stroke: "#ffa726"
                    //         }
                    //     }}
                    //     bezier
                    //     style={{
                    //         backgroundColor: 'red'
                    //     }}
                    // />
                ) : (
                    <ActivityIndicator
                        color="red"
                        size={24}
                    />
                )
            }
        </View>
    );
}

export default HeartRateCard;

const ss = StyleSheet.create({
    container: {
        width: width - 50,
        height: width - 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
})