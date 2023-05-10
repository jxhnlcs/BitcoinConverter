import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const Stack = createStackNavigator();

/* Navbar */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Conversor" component={HomeScreen} />
        <Stack.Screen name="Cotação" component={CotationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [cotation, setCotation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [conversionResult, setConversionResult] = useState('');

  /* Função converter */

  const handleConvert = () => {
    if (!cotation || !quantity) {
      setConversionResult('Informe os valores de cotação e quantidade');
      return;
    }
    if (setCurrency === 'BRL') {
      const result = parseFloat(quantity) * parseFloat(cotation);
      setConversionResult(result.toFixed(2));
    } else {
      const result = parseFloat(quantity) * (parseFloat(cotation));
      setConversionResult(result.toFixed(2));
    }
  };

  /* Função limpar campos */

  const handleClear = () => {
    setCotation('');
    setQuantity('');
    setConversionResult('');
  }

  /* Função moeda selecionada */

  const handleCotation = () => {
    navigation.navigate('Cotação', { currency });
  }

  /* Função trocar moeda selecionada */

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  }

  /* Front-end */

  return (

    /* Container dos inputs */

    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin conversor</Text>
      <TextInput
        style={styles.input}
        placeholder="Cotação"
        keyboardType="numeric"
        value={cotation}
        onChangeText={(value) => setCotation(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantitade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(value) => setQuantity(value)}
      />
      <View style={styles.currencyContainer /* Container selecionar moedas */}>
        <TouchableOpacity
          style={[styles.currencyButton, currency === 'BRL' ? styles.selectedCurrencyButton : null]}
          onPress={() => handleCurrencyChange('BRL')}
        >
          <Text style={[styles.currencyButtonText, currency === 'BRL' ? styles.selectedCurrencyButtonText : null]}>BRL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.currencyButton, currency === 'USD' ? styles.selectedCurrencyButton : null]}
          onPress={() => handleCurrencyChange('USD')}
        >
          <Text style={[styles.currencyButtonText, currency === 'USD' ? styles.selectedCurrencyButtonText : null]}>USD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer/* Container botões */}>
      <TouchableOpacity style={styles.button} Função converter onPress={handleConvert}>
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleCotation}>
          <Text style={styles.buttonText}>Ver cotação</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.result}>{conversionResult}</Text>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText2}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* Função chama webview */

function CotationScreen({ route }) {
  const { currency } = route.params;

  return (
    <WebView
      source={{ uri: currency === 'BRL' ? 'https://www.coinbase.com/pt/converter/btc/brl' : 'https://www.coinbase.com/pt/converter/btc/usd' }}
    />
  );
}

/* Estilização */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 32,
  },

  currencyContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },

  currencyButtonText:{
    marginRight: 20,
    marginLeft: 20,
    color: 'white',
    marginTop: 20,
    
  }, 

  buttonContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },


  selectedCurrencyButtonText: {
    color: 'green',
  },

  buttonText: {
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 8,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 20,

  },

  buttonText2:{
    color: 'white',
    alignItems: 'center'
  },

  buttonContainer:{
    flexDirection: 'row',
  },

  result: {
    color:'green'
  },

  input:{
    color:'red',
    textAlign: 'center',
    borderBottomWidth: 1,
    color: 'white',
    borderBottomColor: 'white',
    marginTop: 10,
    marginBottom:15,
    fontSize: 25,
    borderRadius: 1,
    height: 30,
    width: 150,
  },
})