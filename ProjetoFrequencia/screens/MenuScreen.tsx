import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { getMatricula, setMatricula } from '../utils/storage';
import MatriculaInput from '../components/MatriculaInput'; // seu componente input customizado

export default function MenuScreen({ navigation }: { navigation: any }) {
  const [matricula, setMatriculaState] = useState('');

  useEffect(() => {
    getMatricula().then((mat) => {
      if (mat) setMatriculaState(mat);
    });
  }, []);

  const handleMatriculaChange = async (novaMatricula: string) => {

    setMatriculaState(novaMatricula);

    await setMatricula(novaMatricula);

    Alert.alert('Matrícula atualizada', `Nova matrícula: ${novaMatricula}`);


  };

  return (
    <View style={styles.container}>
      <MatriculaInput
        value={matricula}
        onChange={handleMatriculaChange}
      />

      <Button
        title="📷 Ler QR Code"
        onPress={() => navigation.navigate('QRCode')}
        disabled={!matricula}
      />

      <Button
        title="📊 Ver Faltas"
        onPress={() => navigation.navigate('Faltas')}
        disabled={!matricula}
      />

      <Button
        title="✅ Lista de Presenças de Hoje"
        onPress={() => navigation.navigate('ListaPresenca')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
});
