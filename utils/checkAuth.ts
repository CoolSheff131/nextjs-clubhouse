import { GetServerSidePropsContext } from "next";
import Cookies from "nookies";
import { UserApi } from "../api/UserApi";
import { Axios } from '../core/axios';
import { UserData } from "../pages";

export const checkAuth = async (ctx:GetServerSidePropsContext) : Promise<UserData | null> =>{
    try {
        const cookie = Cookies.get(ctx)
        if (cookie.token) {
          Axios.defaults.headers.Authorization = `Bearer ${cookie.token}`
        }
        
        return await UserApi.getMe()
    } catch (error) {
        return null
    }
}