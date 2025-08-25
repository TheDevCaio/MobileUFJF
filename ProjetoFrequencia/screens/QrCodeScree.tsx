import React, { useEffect, useState } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getMatricula } from '../utils/storage';
import { registrarFrequencia } from '../services/api';

export default function QRCodeScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const senha = data;

    const matricula = await getMatricula();
    if (!matricula) {
      Alert.alert("Erro", "Matrícula não cadastrada");
      return;
    }

    const sucesso = await registrarFrequencia(matricula, senha);
    Alert.alert("Registro", sucesso ? "Presença registrada!" : "Erro ao registrar.");
  };

  if (!hasPermission) return <Text>Sem permissão para usar a câmera</Text>;

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && <Button title="Escanear novamente" onPress={() => setScanned(false)} />}
    </View>
  );
}
