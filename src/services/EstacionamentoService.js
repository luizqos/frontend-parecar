import axios from "axios";
import Config from "../util/Config";

class EstacionamentoService {
  async buscaEstacionamento(dados) {
    axios.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    function converterDataPtBr(dataString) {
      const data = new Date(dataString);

      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat("pt-BR", options);

      return formatter.format(data);
    }

    let {
      latitude = null,
      longitude = null,
      cidade = null,
      uf = null,
      entrada = null,
      saida = null,
    } = dados;

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.API_KEY_GOOGLE}`;

    const buscaCidadeUF = async (apiUrl) => {
      try {
        const response = await axios.get(apiUrl);

        if (response.data.status !== "OK") {
          throw new Error("Erro na solicitação: " + response.data.status);
        }

        const results = response.data.results;

        if (results.length === 0) {
          throw new Error("Nenhum resultado encontrado.");
        }

        const addressComponents = results[0].address_components;
        let city, state;

        for (const component of addressComponents) {
          if (component.types.includes("administrative_area_level_2")) {
            city = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            state = component.short_name;
          }
        }

        if (city && state) {
          return { city, state };
        } else {
          throw new Error("Cidade e UF não encontradas.");
        }
      } catch (error) {
        throw new Error("Erro na solicitação: " + error.message);
      }
    };
    try {
      if (latitude && longitude) {
        const responseLocation = await buscaCidadeUF(apiUrl);
        const city = responseLocation.city.toUpperCase();
        const state = responseLocation.state.toUpperCase();

        uf = state;
        cidade = city;

        const dataAtual = new Date(new Date().getTime() + 30 * 60 * 1000);
        const minutosArredondados = Math.ceil(dataAtual.getMinutes() / 15) * 15;
        dataAtual.setMinutes(minutosArredondados);
        dataAtual.setSeconds(0);
        entrada = new Date(dataAtual.getTime() - 3 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        saida = new Date(dataAtual.getTime() - 1 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
      }

      const response = await axios.get(
        `${Config.API_URL}/estacionamentos/vagas-disponiveis?uf=${uf}&cidade=${cidade}&entradareserva=${entrada}&saidareserva=${saida}`,
        {
          timeout: Config.TIMEOUT_REQUEST,
          headers: Config.HEADER_REQUEST,
        }
      );
      const resultado = response.data.map((item) => {
        return {
          ...item,
          entrada: converterDataPtBr(entrada),
          saida: converterDataPtBr(saida),
        };
      });

      return Promise.resolve(resultado);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const estacionamentoService = new EstacionamentoService();
export default estacionamentoService;
