import axios from "axios";
import Config from "../util/Config";

class EstacionamentoService {
  async buscaEstacionamento() {
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
      const response = await axios.get(
        `${Config.API_URL}/estacionamentos?status=1`,
        {
          timeout: Config.TIMEOUT_REQUEST,
          headers: Config.HEADER_REQUEST,
        }
      );
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const estacionamentoService = new EstacionamentoService();
export default estacionamentoService;
