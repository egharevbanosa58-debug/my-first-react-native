import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@react-navigation/elements';

const explore = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    Alert.alert(`${search}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🗺 Explore</Text>

      <Text style={styles.paragraph}>This app is my first React native application. It is where I practice some tutorials and some ideas that pop into my head... kinda like this one ;)</Text>

      <Text style={styles.text}>🔎 Search</Text>

      <TextInput 
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder='Enter Search...'
        style={styles.input}
      />
      <Button onPressIn={() => handleSearch()}>Search</Button>
    </View>
  )
}

export default explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 50,
  },

  text: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 42,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },

  paragraph: {
    paddingHorizontal: 20,
    fontSize: 20,
    marginVertical: 20,
  },

  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    borderStyle: 'dotted',
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'center',
  }
})