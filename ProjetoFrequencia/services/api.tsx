const BASE_URL = 'https://seu-backend.com/api'; // substitua pela URL real

export async function registrarFrequencia(matricula: string, senha: string) {
  try {
    const response = await fetch(`${BASE_URL}/frequencia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula, senha }),
    });
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getFaltas(matricula: string) {
  const response = await fetch(`${BASE_URL}/faltas/${matricula}`);
  return await response.json();
}

export async function getPresencasHoje() {
  const response = await fetch(`${BASE_URL}/presencas/hoje`);
  return await response.json();
}