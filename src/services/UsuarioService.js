import axios from "axios"
import Config from "../util/Config"

class UsuarioService {
    async login_A(data) {
        return axios({
            url: Config.API_URL + "login/auth",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            console.log("deu certo");
            return Promise.resolve(response)
        }).catch((error) => {
            console.log("deu errado");
            return Promise.reject(error)
        })
    }


    async login(data) {
        const emailsPermitidos = ["luiz.qos@gmail.com", "anaclara170124@gmail.com", "catharineosilvas@gmail.com"];
        const dadosUsuario = data;

        // Verifica se o email está na lista de emails permitidos
        const emailUsuario = dadosUsuario.email || "";
        const estaNaLista = emailsPermitidos.includes(emailUsuario);
        return estaNaLista ? true : false
    }
}

const usuarioService = new UsuarioService()
export default usuarioService