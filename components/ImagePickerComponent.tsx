import React, {useEffect, useState} from "react";
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const ImagePickerComponent: React.FC = () => {

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(galleryStatus.status !== 'granted'){
                Alert.alert('Sorry we need permission');
            }
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            if(cameraStatus.status !== 'granted'){
                Alert.alert('Sorry we need permission');
            }
        })();
    },[])

    const pickImageFromPhoneLibrary = async() => {
        let imageResults = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        if(!imageResults.canceled){
            setImage(imageResults.assets[0].uri);
        }
    }

    const takeSnapshotFromCamera = async() => {
        let imageResults = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        if(!imageResults.canceled){
            setImage(imageResults.assets[0].uri);
        }
    }

    const shareMyImage = async() => {
        if(image){
            const isSharingAvailable = await Sharing.isAvailableAsync();
            if(isSharingAvailable){
                await Sharing.shareAsync(image);
            } else {
                Alert.alert("Sharing is not available on your device")
            }
        } else {
            Alert.alert("Please choose some image first")
        }
    }

    return(
        <View style={styles.container}>
            <Button onPress={pickImageFromPhoneLibrary} title="Pick Image From Library" />
            <Button onPress={takeSnapshotFromCamera} title="Take Snapshot" />
            {
                image && (<>
                    <Image style={styles.image} source={{uri: image}} />
                    <Button title="Share" onPress={shareMyImage} />
                </>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width:300, height:300, marginTop:20
    },
    container: {
      flex: 1,
      backgroundColor: '#00cc99',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ImagePickerComponent;