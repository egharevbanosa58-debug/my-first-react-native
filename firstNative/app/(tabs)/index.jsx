import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'

import { Link } from 'expo-router';

import shipwerckView from '@/assets/images/minecraft-view.png';

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={shipwerckView}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.text}>Coffee Shop</Text>

        <Link href="/contact" style={{ marginHorizontal: 'auto', }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </Pressable>
        </Link>

      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
  },

  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    textDecorationLine: 'underline',
    padding: 4,
  },

  button: {
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
})