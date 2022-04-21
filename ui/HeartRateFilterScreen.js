import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import GoogleFit, { Scopes, BucketUnit } from 'react-native-google-fit'
import { Grid } from 'react-native-svg-charts';
import { LineChart, AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape';
import { Line, Svg } from 'react-native-svg';
import { YAxis } from 'react-native-svg-charts';
import { XAxis } from 'react-native-svg-charts';
import googleFit from 'react-native-google-fit';
import { BarChart } from 'react-native-chart-kit';

const MINIMUM_THRESHOLD = 60;
const MAXIMUM_THRESHOLD = 112;

const HeartRateFilterScreen = ({
    navigation
}) => {
    const [heartRateSamples, setHeartRateSamples] = useState([]);
    const [BPMValues, setBPMValues] = useState([]);
    const [datesValues, setDatesValues] = useState([]);
    const [currentInterval, setCurrentInterval] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                        style={{ height: '100%', justifyContent: 'center', paddingHorizontal: 10, }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ height: '100%', justifyContent: 'center', paddingHorizontal: 10, }}
                        onPress={() => {
                            googleFit.disconnect()
                            navigation.replace("AUTHORIZESCREEN")
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const onBucketUnitPress = async (interval) => {
        setCurrentInterval(old => interval);
        setBPMValues(() => []);
        setHeartRateSamples(old => []);
        const today = new Date();
        const timestamp = new Date().getTime();
        const endDateTime = new Date(today.getTime());
        const startDateTime = new Date(timestamp - (interval * (24 * 60 * 60 * 1000)));

        console.log(startDateTime, ' \n\t', endDateTime);

        const samples = await GoogleFit.getHeartRateSamples({
            startDate: startDateTime,
            endDate: endDateTime,
            bucketInterval: 1,
            bucketUnit: "DAY"
        })

        setHeartRateSamples(old => samples)
    }

    useEffect(() => {
        onBucketUnitPress(1);
    }, [])

    useEffect(() => {
        if(heartRateSamples.length > 0) {
            let BPMArr = [];
            let DateArr = [];
            heartRateSamples.map((item, index) => {
                BPMArr.push(item.value);
                DateArr.push(item.startDate)
            })


            setBPMValues(old => BPMArr);
            setDatesValues(old => DateArr);
        }
    }, [heartRateSamples])

    return (
        <View style={ss.screen}>
            <View style={ss.pickerContainer}>
                <TouchableOpacity style={[ss.pickerItemContainer, { backgroundColor: currentInterval === 1 ? "gold" : '#000' }]} onPress={() => onBucketUnitPress(1)}>
                    <Text style={[ss.pickerTitle, { color: currentInterval === 1 ? "#000" : "#fff" }]}>Day</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[ss.pickerItemContainer, { backgroundColor: currentInterval === 7 ? "gold" : '#000' }]} onPress={() => onBucketUnitPress(7)}>
                    <Text style={[ss.pickerTitle, { color: currentInterval === 7 ? "#000" : "#fff" }]}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[ss.pickerItemContainer, { backgroundColor: currentInterval === 28 ? "gold" : '#000' }]} onPress={() => onBucketUnitPress(28)}>
                    <Text style={[ss.pickerTitle, { color: currentInterval === 28 ? "#000" : "#fff" }]}>Month</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[ss.pickerItemContainer, { backgroundColor: currentInterval === 365 ? "gold" : '#000' }]} onPress={() => onBucketUnitPress(365)}>
                    <Text style={[ss.pickerTitle, { color: currentInterval === 365 ? "#000" : "#fff" }]}>Year</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'stretch', }}>
                {BPMValues.length > 0 && (<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                    <View>
                        <Text style={{ color: '#000', textAlign: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, }}>{Math.min(...BPMValues)}</Text> 
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>-</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, }}>{Math.max(...BPMValues)}</Text> 
                            {'\t'}BPM (Beats Per Minute)
                        </Text>
                        <Text style={{ marginTop: 50, color: '#000', textAlign: 'center' }}>
                            Average: 
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{(Math.min(...BPMValues) + Math.max(...BPMValues)) / 2} BPM</Text>
                        </Text>
                    </View>

                    <View style={{
                        width: '100%',
                        height: 300,
                        backgroundColor: '#fff',
                        elevation: 2,
                        borderRadius: 10,
                        flexDirection: 'row',
                        padding: 5
                    }}>
                        <YAxis 
                            data={BPMValues}
                            contentInset={{ top: 0, bottom: 0 }}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}`}
                        />
                    
                        <View style={{ flex: 1, }}>
                                
                                <LineChart
                                    style={{ width: '100%', height: '100%' }}
                                    data={BPMValues}
                                    contentInset={{ top: 0, bottom: 0 }}
                                    svg={{ stroke: "rgba(134, 65, 244, 0.8)", }}
                                    animate={true}
                                    withDots={true}
                                    withHorizontalLabels={true}
                                    withInnerLines={false}
                                    withOuterLines={false}
                                    withVerticalLines={false}
                                    withHorizontalLines={false}
                                    numberOfTicks={20}
                                    curve={shape.curveNatural}
                                >
                                    <Grid direction='HORIZONTAL' />
                                </LineChart>
                        </View>
                        </View>
                    </View>)}

                {BPMValues.length === 0 && (
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.3)' }}>No data yet.</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default HeartRateFilterScreen;

const ss = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#efefef' },

    pickerContainer: {
        width: '100%',
        height: 50,
        backgroundColor: 'grey',
        flexDirection: 'row'
    },

    pickerItemContainer: { justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#000' },

    pickerTitle: { fontSize: 13, fontWeight: 'bold' }
})