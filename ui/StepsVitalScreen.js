import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native'
import googleFit from 'react-native-google-fit';
import { LineChart, Grid, BarChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { BucketUnit } from 'react-native-google-fit';

const StepsVitalScreen = ({ navigation }) => {
    const [stepsSample, setStepsSample] = useState([]);
    const [stepsNumberArray, setStepsNumberArray] = useState([]);
    const [interval, setInterval] = useState(7);
    const [startDateFromResponse, setStartDateFromResponse] = useState("");
    const [endDateFromResponse, setEndDateFromResponse] = useState("");

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

    useEffect(() => {
        changeInterval(interval);
    }, [interval])

    useEffect(() => {
        setStepsNumberArray(old => []);
        if(stepsSample.length > 0) {
            let arr = [];
            setStartDateFromResponse(() => stepsSample[0].date)
            setEndDateFromResponse(() => stepsSample[stepsSample.length - 1].date)
            stepsSample.map(item => {
                arr.push(item.value);
            })
            setStepsNumberArray(old => arr);
        }
    }, [stepsSample])
    
    const getStepsCount = async (num) => {
        const rightNow = new Date().getTime();
        const endTime = new Date(rightNow);
        const startTime = new Date(rightNow - (num * (24 * 60 * 60 * 1000)));
        console.log(num, ' is the interval');
        console.log(startTime);
        console.log(endTime);

        const stepsData = await googleFit.getDailyStepCountSamples({
            startDate: startTime,
            endDate: endTime,
            bucketInterval: 1,
            bucketUnit: BucketUnit.DAY
        });

        const entimated_steps = stepsData.filter(item => item.source === "com.google.android.gms:estimated_steps");
        setStepsSample(old => entimated_steps[0].steps);
    }

    const changeInterval = (num) => {
        setInterval(old => num);
        getStepsCount(num);
    }

    return (<View style={{ flex: 1, backgroundColor: '#efefef' }}>
        <View style={{
            width: '100%', height: 50, flexDirection: 'row', backgroundColor: '#000'
        }}>
            <TouchableOpacity 
                onPress={() => changeInterval(1)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: interval === 1 ? 'gold' : '#000' }}
            >
                <Text style={{ color: interval === 1 ? '#000' : '#fff', fontWeight: 'bold' }}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeInterval(7)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: interval === 7 ? 'gold' : '#000' }}
            >
                <Text style={{ color: interval === 7 ? '#000' : '#fff', fontWeight: 'bold' }}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeInterval(28)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: interval === 28 ? 'gold' : '#000' }}
            >
                <Text style={{ color: interval === 28 ? '#000' : '#fff', fontWeight: 'bold' }}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeInterval(365)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: interval === 365 ? 'gold' : '#000' }}
            >
                <Text style={{ color: interval === 365 ? '#000' : '#fff', fontWeight: 'bold' }}>Year</Text>
            </TouchableOpacity>
        </View>


        {/* If No data is available */}
        {
            stepsSample.length === 0 && (<View style={{ backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No data availble!</Text>
            </View>)
        }

        {/* If interval is 1  i.e. today */}
        {
            stepsSample.length > 0 && interval === 1 && (<View style={{ flex: 1, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000' }}>Last Recorded: </Text>
                <Text style={{ fontSize: 25, color: '#000', fontWeight: 'bold' }}>{stepsSample[0].date}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, color: '#000' }}>{stepsSample[0].value} Steps</Text>
            </View>)
        }

        {
            (stepsNumberArray.length > 0 && interval !== 1) && (<View style={{ flex: 1, backgroundColor: '#efefef' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>
                        Average: 
                        {'\t\t'}<Text style={{ fontSize: 25 }}>{Math.round((Math.min(...stepsNumberArray) + Math.max(...stepsNumberArray)) / stepsNumberArray.length)}</Text>
                        {'\t'}steps
                    </Text>

                    <View style={{ marginTop: 20, }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}><Text style={{ fontSize: 15, }}>Start Date: </Text>{startDateFromResponse}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}><Text style={{ fontSize: 15, }}>End Date: </Text>{endDateFromResponse}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    {/* Graph Card */}
                    <View style={{ width: '90%', height: '70%', borderRadius: 10, backgroundColor: '#fff', elevation: 3 }}>
                    {/* <LineChart
                        style={{ width: '100%', height: '100%' }}
                        data={stepsNumberArray}
                        contentInset={{ top: 0, bottom: 0 }}
                        svg={{ stroke: "rgba(134, 65, 244, 0.8)", }}
                        animate={true}
                        withDots={true}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        curve={shape.curveNatural}
                    >
                        <Grid direction='HORIZONTAL' />
                    </LineChart> */}
                    <BarChart style={{ height: 200 }} data={stepsNumberArray} svg={{ fill: 'rgba(0, 0, 0, 0.5)' }} contentInset={{ top: 20, bottom: 20 }}>
                        <Grid />
                    </BarChart>
                    </View>
                </View>
            </View>)
        }
    </View>);
}

export default StepsVitalScreen;