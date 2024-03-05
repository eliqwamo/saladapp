import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImagePickerComponent from './components/ImagePickerComponent';
import LocationComponent from './components/LocationComponent';
import LottieComponent from './components/LottieComponent';
import ChatBot from './components/ChatBot';
import setupDatabase from './components/dbConfig';
import SqlLiteComponent from './components/SqlLiteComponent';


export default function App() {

  useEffect(() => {
    setupDatabase()
    .then(() => {
      console.log('Database setup complete');
    })
    .catch(error => {
      console.error('Database setup failed:', error);
    })
  },[])


  return (
    <View style={styles.container}>
      <SqlLiteComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
