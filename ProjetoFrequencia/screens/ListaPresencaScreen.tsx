import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPresencasHoje } from '../utils/storage';

export default function ListaPresencaScreen() {
  const [alunos, setAlunos] = useState<string[]>([]);

  useEffect(() => {
    getPresencasHoje().then(setAlunos);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos presentes hoje:</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text style={styles.item}>- {item}</Text>}
        ListEmptyComponent={<Text>Nenhuma presença registrada ainda.</Text>}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  item: { fontSize: 16, marginVertical: 4 },
});
