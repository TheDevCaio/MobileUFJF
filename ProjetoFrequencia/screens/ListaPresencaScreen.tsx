import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getPresencasHoje } from '../services/api';

export default function ListaPresencaScreen() {
  const [alunos, setAlunos] = useState<string[]>([]);

  useEffect(() => {
    getPresencasHoje().then(setAlunos);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Alunos presentes hoje:</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text>- {item}</Text>}
      />
    </View>
  );
}