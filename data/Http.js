import axios from "axios"
import { API } from "../constants"
export const HTTP=axios.create({
    baseURL: API
})