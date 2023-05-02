import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cotation" component={CotationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [cotation, setCotation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('BRL');

  const handleClear = () => {
    setCotation('');
    setQuantity('');
  }

  const handleConvert = () => {
    navigation.navigate('Cotation', { currency });
  }

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin conversor</Text>
      <TextInput
        style={styles.input}
        placeholder="Cotation"
        keyboardType="numeric"
        value={cotation}
        onChangeText={(value) => setCotation(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(value) => setQuantity(value)}
      />
      <View style={styles.currencyContainer}>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleConvert}>
          <Text style={styles.buttonText}>Ver cotação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CotationScreen({ route }) {
  const { currency } = route.params;

  return (
    <WebView
      source={{ uri: currency === 'BRL' ? 'https://www.coinbase.com/pt/converter/btc/brl' : 'https://www.infomoney.com.br/cotacoes/cripto/ativo/bitcoin-btc/' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '80%',
    marginBottom: 16,
  }

})