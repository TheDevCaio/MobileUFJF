import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function MatriculaInput({ value, onChange }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Digite sua matrícula"
      value={value}
      onChangeText={onChange}
      keyboardType="default"
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});