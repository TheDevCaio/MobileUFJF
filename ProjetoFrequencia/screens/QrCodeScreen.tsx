import React, { useRef, useState } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { CameraView, BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

import { getMatricula, getPresencasHoje, registrarPresencaLocal } from '../utils/storage';

export default function QRCodeScreen() {
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();

  const processQRCode = async (senha: string) => {
  const matricula = await getMatricula();

  console.log('Matrícula atual:', matricula); 

  if (!matricula) {
    Alert.alert('Erro', 'Matrícula não cadastrada');
    return;
  }

  await registrarPresencaLocal(matricula);

  const presencas = await getPresencasHoje();
  console.log('Presenças atuais:', presencas);
          
  Alert.alert('Registro', `QR code lido: ${senha}\nPresença registrada para matrícula: ${matricula}`);
};

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    await processQRCode(result.data);
  };

  const resetScanner = () => {
    setScanned(false);
  };

  if (!permission) {
    return <Text>Solicitando permissão...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sem permissão para usar a câmera</Text>
        <Button title="Conceder permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      )}
      {scanned && (
        <Button title="Escanear novamente" onPress={resetScanner} />
      )}
    </View>
  );
}
