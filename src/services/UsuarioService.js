import axios from "axios";
import Config from "../util/Config";

class UsuarioService {
  async login2(data) {
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

  async login(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: data,
    };

    fetch(Config.API_URL + "/login/auth", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log("errou");
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then(function (responseData) {
        console.log(responseData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
