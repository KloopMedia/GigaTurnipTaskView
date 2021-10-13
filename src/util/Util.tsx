import axios from "./Axios";
import {campaignsUrl, taskstagesUrl, tasksUrl} from "../config/Urls";

const IS_PAGINATION_ON = false

export const getCampaigns = () => {
    return axios.get(campaignsUrl)
        .then(res => res.data)
        .then(res => {
            console.log(res)
            return IS_PAGINATION_ON ? res.results : res
        })
}

export const getUserCampaigns = () => {
    return axios.get(campaignsUrl + 'list_user_campaigns/')
        .then(res => res.data)
        .then(res => {
            console.log("user_campaigns", res)
            return IS_PAGINATION_ON ? res.results : res
        })
}

export const getSelectableCampaigns = () => {
    return axios.get(campaignsUrl + 'list_user_selectable/')
        .then(res => res.data)
        .then(res => {
            console.log("selectable_campaigns", res)
            return IS_PAGINATION_ON ? res.results : res
        })
}

export const requestTaskCreation = (id: string | number) => {
    return axios.post(taskstagesUrl + id + '/create_task/')
        .then(res => res.data)
}

export const requestTaskAssignment = (id: string | number) => {
    return axios.post(tasksUrl + id + '/request_assignment/')
}