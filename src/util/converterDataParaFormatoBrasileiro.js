function converterDataParaFormatoBrasileiro(dataString) {
  const data = new Date(dataString);

  const adicionaZero = (numero) => (numero < 10 ? "0" + numero : numero);

  const dia = adicionaZero(data.getUTCDate());
  const mes = adicionaZero(data.getUTCMonth() + 1); // Os meses são indexados de 0 a 11
  const ano = data.getUTCFullYear();
  const hora = adicionaZero(data.getUTCHours());
  const minutos = adicionaZero(data.getUTCMinutes());

  return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}
export default converterDataParaFormatoBrasileiro;
