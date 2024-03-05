import { StyleSheet, Text, View } from 'react-native';
import ImagePickerComponent from './components/ImagePickerComponent';
import LocationComponent from './components/LocationComponent';
import LottieComponent from './components/LottieComponent';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
