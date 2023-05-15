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
        <Stack.Screen name="Conversor" component={HomeScreen} 
        options={{
          title: 'Bitcoin Conversor',
          headerStyle: {
            backgroundColor: 'green',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen style={styles.nav}  name="Cotação" component={CotationScreen }
        options={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
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

  /* Função limpar campos*/

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
      
      <View style={styles.containerInput /* Container input */}>
      <TextInput
        style={styles.input}
        placeholder="Cotação"
        keyboardType="numeric"
        value={cotation}
        onChangeText={(value) => setCotation(value)}
        placeholderTextColor="#C6C4C4"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(value) => setQuantity(value)}
        placeholderTextColor="#C6C4C4"
      />
      <Text style={styles.result}>{conversionResult}</Text>
      </View>
      
      <View style={styles.buttonConverter /*Botão converter*/}>
        <TouchableOpacity style={styles.buttonConverter} Função converter onPress={handleConvert}>
          <Text style={styles.buttonConverter}>Converter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.button/* Container botões */}>
            <TouchableOpacity style={styles.buttonCotacao} onPress={handleCotation}>
              <Text style={styles.buttonText}>Ver cotação</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.buttonLimpar} onPress={handleClear}>
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
    backgroundColor: '#262626',
    backgroundColor: 'black',
    alignItems: 'center',
    /*justifyContent: 'center'*/
  },
  selectedCurrencyButtonText: {
    color: '#00A624',
    alignItems: 'center',
    fontSize: 30
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
    backgroundColor: '#3D3B3B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 100
  },

  containerInput: {
    backgroundColor: '#3D3B3B',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },

  currencyButtonText:{
    marginRight: 20,
    marginLeft: 20,
    color: 'white',
    fontSize: 20
    
  }, 

  buttonContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    height: 180,
    marginTop:20,
    marginBottom: 30,
  },  

  input: {
    color: 'white',
    borderRadius: 1,
    backgroundColor:'#262626',
    width: 320,
    height:40,
    fontSize:20,
    textAlign: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  

  buttonConverter:{
    color: 'white',
    backgroundColor:'green',
    paddingHorizontal: 30,
    paddingVertical: 3,
    fontSize:20,
    fontWeight: 'bold',
    borderRadius: 6,

  },
  result: {
    color: '#00A624',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  buttonCotacao:{
    backgroundColor: '#099F2A',
    paddingHorizontal: 50,
    paddingVertical: 20
  },

  buttonLimpar:{
    backgroundColor: '#006C18',
    paddingHorizontal: 65,
    paddingVertical: 20,
  },

  buttonText:{
    color: 'white',
    fontSize: 20,
  },

  barContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 648,
  },

  selectedCurrencyButtonText: {
    color: 'green',
  },

  buttonText2:{
    color: 'white',
    fontSize: 20
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