const BASE_URL = 'https://seu-backend.com/api'; //exemplo

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

export async function validarFaltas(matricula: string) {
  try {
    const presencas = await getPresencasHoje();
    const agora = new Date();
    const encontrouPresenca = presencas.some(
      (p: { matricula: string; horario: string }) => {
        if (p.matricula !== matricula) return false;
        const horario = new Date(p.horario);
        const diffHoras = (agora.getTime() - horario.getTime()) / (1000 * 60 * 60);
        return diffHoras <= 2;
      }
    );
    if (!encontrouPresenca) {

      await fetch(`${BASE_URL}/faltas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula }),
      });
      return true; 
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}