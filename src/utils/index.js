import { decode } from "jsonwebtoken";
import {secure} from "@/config/conf"
export const checkLogin = ()=>{
  const token = getToken();
  if(!token){
    return null;
  }
  return decode(token,secure)
}

export const getToken = ()=>{
  return window.sessionStorage.getItem('token')
}