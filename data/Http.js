import axios from "axios"
import { baseURL } from "../constants"
export const HTTP=axios.create({
    baseURL: baseURL
})