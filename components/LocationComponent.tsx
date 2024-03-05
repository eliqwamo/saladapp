import React, {useEffect, useState} from "react";
import { Button, Image, View, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

type Place = {
    id: number,
    title: string,
    latitude: number,
    longitude: number
}

const LocationComponent: React.FC = () => {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [places, setPlaces]= useState<Place[]>([
        {id: 1, title: 'Carasso Science Park', latitude: 31.241787057481435, longitude: 34.78595497248684},
        {id: 2, title: 'Beeri School', latitude: 31.243924343896186, longitude: 34.788250943354385},
        {id: 3, title: 'Beit Yatsiv Yisrael Yafa Studies Center', latitude: 31.242357791455227, longitude: 34.78482207914404}, 
        {id: 4, title: 'Holmes Place Beer-Sheva', latitude: 31.245375644278162, longitude: 34.78348097461821}
    ])

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                Alert.alert('We need your location to track you')
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setIsLoading(false)
        })();
    },[])


    return(
        <View style={styles.container}>
            {
                isLoading ? (<>
                <LottieView
                    source={require('../assets/Animation - 1709654250247.json')}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                    />
                </>) : (<>
                    {
                        location && (<>
                            <MapView style={styles.map} initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}>
                                <Marker title="My Location" coordinate={{ 
                                    latitude: location.coords.latitude, 
                                    longitude: location.coords.longitude
                                }}>
                                    <LottieView
                                                source={require('../assets/Animation - 1709655653417.json')}
                                                autoPlay
                                                loop
                                                style={styles.lottieSmall}
                                                />
                                </Marker>
                                {
                                    places.map((place) => (
                                        <Marker 
                                            key={place.id} 
                                            title={place.title} coordinate={{ 
                                            latitude: place.latitude, 
                                            longitude: place.longitude
                                        }}>
                                            <LottieView
                                                source={require('../assets/Animation - 1709655653417.json')}
                                                autoPlay
                                                loop
                                                style={styles.lottieSmall}
                                                />
                                        </Marker>
                                    ))
                                }
                            </MapView>
                        </>)
                    }
                </>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    lottieStyle:{
        width:300,
        height:400
    },
    lottieSmall:{
        width:80,
        height:80
    },
    container: {
      flex: 1,
      backgroundColor: '#00cc99',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LocationComponent;