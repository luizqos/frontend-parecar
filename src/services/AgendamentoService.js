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
      console.log(error);
      return false;
    }
  }
}

const agendamentoService = new AgendamentoService();
export default agendamentoService;
