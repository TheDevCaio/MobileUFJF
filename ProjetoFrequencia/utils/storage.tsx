import AsyncStorage from '@react-native-async-storage/async-storage';

const MATRICULA_KEY = 'matricula';
const PRESENCAS_KEY = 'presencas_hoje';

export async function setMatricula(matricula: string) {
  await AsyncStorage.setItem(MATRICULA_KEY, matricula);
}

export async function getMatricula(): Promise<string | null> {
  return await AsyncStorage.getItem(MATRICULA_KEY);
}

export async function registrarPresencaLocal(matricula: string) {
  const data = await AsyncStorage.getItem(PRESENCAS_KEY);
  const lista: string[] = data ? JSON.parse(data) : [];

  if (!lista.includes(matricula)) {
    lista.push(matricula);
    await AsyncStorage.setItem(PRESENCAS_KEY, JSON.stringify(lista));
  }
}

export async function getPresencasHoje(): Promise<string[]> {
  const data = await AsyncStorage.getItem(PRESENCAS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function limparPresencasHoje() {
  await AsyncStorage.removeItem(PRESENCAS_KEY);
}
