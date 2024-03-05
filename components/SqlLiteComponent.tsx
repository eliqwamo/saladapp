import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import useLocationStore from './useLocationStore';

const SqlLiteComponent = () => {

  const { locations, getLocations, addLocation, deleteLocation } = useLocationStore();

  useEffect(() => {
    getLocations();
  },[])

  return (
    <View style={styles.container}>
        {
            locations.map(loc => (
                <View key={loc.id}>
                    <Text>{loc.id} | {loc.title} | {loc.latitude} | {loc.longitude}</Text>
                    <Button title='Delete' onPress={() => deleteLocation(loc.id)} />
                </View>
            ))
        }

        <Button
            title='Add New Location'
            onPress={() => addLocation('Holmes Place Beer-Sheva', 31.245375644278162, 34.78348097461821)}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#0099cc',
        alignItems:'center', justifyContent:'center'
    },
})

export default SqlLiteComponent