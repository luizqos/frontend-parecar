import axios from "axios";
import Config from "../util/Config";

class AgendamentoService {
  async agendamento(data) {
    axios.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    try {
      const response = await axios.post(`${Config.API_URL}/reservas`, data, {
        timeout: Config.TIMEOUT_REQUEST,
        headers: Config.HEADER_REQUEST,
      });
      const reserva = JSON.stringify(response.data);
      return Promise.resolve(reserva);
    } catch (error) {
      let mensagem = "";
      if (error.response) {
        mensagem = error.response.data;
        console.error("Resposta de erro do servidor:", error.response.status);
      } else if (error.request) {
        mensagem = "Sem resposta do servidor";
        console.error("Sem resposta do servidor");
      } else {
        mensagem = error.message;
        console.error("Erro ao fazer a requisição:", mensagem.mensagem);
      }

      return mensagem;
    }
  }
}

const agendamentoService = new AgendamentoService();
export default agendamentoService;
