import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [NumeroRollos, setNumeroRollos] = useState('');
  const [metros, setMetros] = useState('');
  const [metrosTotal, setmetrosTotal] = useState('');
  const [precioMetro, setprecioMetro] = useState('');
  const [PrecioTotal, setPrecioTotal] = useState('');
  const [preciosPorMetro, setPreciosPorMetro] = useState([]);

  const calcularRollos = () => {
    const numRollos = parseFloat(NumeroRollos);
    const numMetros = parseFloat(metros);

    const numPrecioTotal = parseFloat(PrecioTotal);

    const nuevoMetrosTotal = numRollos * numMetros;
    setmetrosTotal(nuevoMetrosTotal);

    const nuevoPrecioMetro = (numPrecioTotal * 1) / nuevoMetrosTotal;
    setprecioMetro(nuevoPrecioMetro);

    setPreciosPorMetro(prevPrecios => [...prevPrecios, nuevoPrecioMetro]);
  }

  const limpiarCampos = () => {
    setNumeroRollos('');
    setMetros('');
    setPrecioTotal('');
    setprecioMetro('');
    setmetrosTotal('');
  }

useEffect(() => {
  if (metrosTotal !== '' && PrecioTotal !== '' && preciosPorMetro.length === 0) {
    const nuevoPrecioMetro = (parseFloat(PrecioTotal) * 1) / parseFloat(metrosTotal);
    setprecioMetro(nuevoPrecioMetro);
    setPreciosPorMetro(prevPrecios => [...prevPrecios, nuevoPrecioMetro]);
  }
}, [metrosTotal, PrecioTotal, preciosPorMetro]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View>
        <Text style={{ fontSize: 20 }}>
          Calculador de Metro por Papel Higienico
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setNumeroRollos}
          value={NumeroRollos}
          placeholder='Numero de rollos'
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setMetros}
          value={metros}
          placeholder='Metros por rollo'
          keyboardType="numeric"
        />


        <TextInput
          style={styles.input}
          onChangeText={setPrecioTotal}
          value={PrecioTotal}
          placeholder='Precio total de paquete'
          keyboardType="numeric"
        />
        <Text></Text>
        <View>
          <Text style={{ fontSize: 20,borderRadius:5 ,borderColor: '#add8e6', borderWidth: 2,paddingLeft:5, }}>
            Precio por metro: {precioMetro}
          </Text>
          <Text></Text>
          <View>
            <Button title="Calcular" onPress={calcularRollos} />
            <Text></Text>
            <Button title="Limpiar campos" onPress={limpiarCampos} />
          </View>

          <View>
            {preciosPorMetro.map((elemento, index) => (
              <Text style={{ fontSize: 15, borderWidth: 1, margin: 4,borderRadius:5,paddingLeft:5}} key={index}>
                {index + 1}. Precio por metro: {elemento}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  texto: {
    fontSize: 20,
    width: 50,
    
  },
  input: {
    borderRadius:10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
