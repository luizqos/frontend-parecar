import axios from "axios";
import Config from "../util/Config";

class UsuarioService {
  async login(data) {
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
      const response = await axios.post(Config.API_URL + "/login/auth", data, {
        timeout: Config.TIMEOUT_REQUEST,
        headers: Config.HEADER_REQUEST,
      });
      const token = JSON.stringify(response.data.token);
      return Promise.resolve(token);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async cadastro(data, endpoint) {
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
      const response = await axios.post(Config.API_URL + "/" + endpoint, data, {
        timeout: Config.TIMEOUT_REQUEST,
        headers: Config.HEADER_REQUEST,
      });
      const cliente = JSON.stringify(response.data);
      return Promise.resolve(cliente);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
