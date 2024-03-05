import React, {useEffect, useState} from "react";
import { Button, Image, View, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';

const LocationComponent: React.FC = () => {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                Alert.alert('We need your location to track you')
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    },[])

    console.log(location);
    


    return(
        <View style={styles.container}>
            {
                location && (<>
                    <MapView style={styles.map} initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09
                    }}>
                        <Marker title="My Location" coordinate={{ 
                            latitude: location.coords.latitude, 
                            longitude: location.coords.longitude
                        }} />
                    </MapView>
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
    container: {
      flex: 1,
      backgroundColor: '#00cc99',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LocationComponent;