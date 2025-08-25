import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getMatricula } from '../utils/storage';
import { getFaltas } from '../services/api';

export default function FaltasScreen() {
  const [faltas, setFaltas] = useState<number | null>(null);

  useEffect(() => {
    getMatricula().then(matricula => {
      if (matricula) {
        getFaltas(matricula).then(setFaltas);
      }
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Você tem {faltas ?? '...'} faltas.</Text>
    </View>
  );
}