import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList, Dimensions, Image, ImageBackground } from 'react-native';

const SectionsArr = [
    {
        title: "Heart Rate",
        sectionCode: "HR"
    },
    {
        title: "Track your Steps",
        sectionCode: "STP"
    },
    {
        title: "How's your sleep?",
        sectionCode: "SLP"
    }
]

const VitalSelectionScreen = ({
    navigation
}) => {

    const onPress = (sectionCode) => {
        switch (sectionCode) {
            case "HR":
                navigation.navigate("HEARTRATE")
                return;

            case "STP":
                navigation.navigate("STEPS")
                return;

            case "SLP":
                return;

            default:
                return;
        }
    }

    const renderItem = ({ item, index }) => {

        return (<TouchableOpacity style={{ width: '100%', height: 200, marginVertical: 5, borderRadius: 10, alignItems: 'center' }} onPress={() => onPress(item.sectionCode)}>
                <ImageBackground
                    resizeMode={"center"}
                    style={{ backgroundColor: '#fff', width: '95%', height: '100%', borderRadius: 10, elevation: 3, justifyContent: 'center', alignItems: 'center' }}
                    blurRadius={5}
                >
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: "rgba(0, 0, 0, 1)" }}>{item.title}</Text>
                </ImageBackground>
        </TouchableOpacity>);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />
            <FlatList 
                data={SectionsArr}
                renderItem={renderItem}
                contentContainerStyle={{
                    width: Dimensions.get('window').width,
                }}
            />
        </View>
    );
}

export default VitalSelectionScreen;