import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'matricula';

export async function setMatricula(matricula: string) {
  await AsyncStorage.setItem(KEY, matricula);
}

export async function getMatricula() {
  return await AsyncStorage.getItem(KEY);
}