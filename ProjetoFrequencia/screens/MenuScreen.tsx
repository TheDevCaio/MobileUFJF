import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { getMatricula, setMatricula } from '../utils/storage';
import MatriculaInput from '../components/MatriculaInput';

export default function MenuScreen({ navigation }) {
  const [matricula, setMatriculaState] = useState('');

  useEffect(() => {
    getMatricula().then((mat) => {
      if (mat) setMatriculaState(mat);
    });
  }, []);

  const handleMatriculaChange = async (novaMatricula: string) => {
    setMatriculaState(novaMatricula);
    await setMatricula(novaMatricula);
  };

  return (
    <View style={styles.container}>
      <MatriculaInput value={matricula} onChange={handleMatriculaChange} />
      <Button title="Ler QR Code" onPress={() => navigation.navigate('QRCode')} />
      <Button title="Ver Faltas" onPress={() => navigation.navigate('Faltas')} />
      <Button title="Lista de Presenças de Hoje" onPress={() => navigation.navigate('ListaPresenca')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 20, padding: 20 }
});
