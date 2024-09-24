import axios from "axios"
import { baseURL } from "../constants"
export const HTTP=axios.create({
    baseURL: baseURL,
    validateStatus: function (status) {
        return status >= 200 && status < 300 // Giới hạn các status code được chấp nhận
    }
})