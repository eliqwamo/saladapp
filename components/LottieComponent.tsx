import React, {useEffect, useState} from "react";
import { View, StyleSheet  } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieComponent: React.FC = () => {

    return(
        <View style={styles.container}>
            <LottieView
                source={require('../assets/Animation - 1709484863005.json')}
                autoPlay
                loop
                style={styles.lottieStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lottieStyle:{
        width:300,
        height:400
    },
    container: {
      flex: 1,
      backgroundColor: '#00cc99',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LottieComponent;