const converterDataParaISO8601 = async (dataString) => {
  try {
    let partesDataHora = dataString.split(" ");
    let partesData = partesDataHora[0].split("/");
    let dataOriginal = new Date(
      partesData[2],
      partesData[1] - 1,
      partesData[0],
      partesDataHora[1].split(":")[0],
      partesDataHora[1].split(":")[1]
    );
    dataOriginal.setHours(dataOriginal.getHours() - 3);
    let dataFormatada = dataOriginal.toISOString().slice(0, 19) + ".000Z";
    return dataFormatada;
  } catch (error) {
    console.error("Erro ao converter datas:", error);
  }
};
export default converterDataParaISO8601;
