import axios from "./Axios";
import {campaignsUrl, taskstagesUrl, tasksUrl} from "../config/Urls";

const IS_PAGINATION_ON = false


// Campaigns Functions
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

export const requestCampaignJoin = (id: string | number) => {
    return axios.post(campaignsUrl + id + '/join_campaign/')
}


// TaskCard Functions
export const requestTaskCreation = (id: string | number) => {
    return axios.post(taskstagesUrl + id + '/create_task/')
        .then(res => res.data)
}

export const requestTaskAssignment = (id: string | number) => {
    return axios.post(tasksUrl + id + '/request_assignment/')
}


// TaskMenu Functions
export const getSelectableTasks = (campaignId: string | number) => {
    return axios.get(`${tasksUrl}user_selectable/?stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
};

export const getCompleteTasks = (campaignId: string | number) => {
    return axios.get(`${tasksUrl}user_relevant/?complete=${true}&stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
};

export const getOpenTasks = (campaignId: string | number) => {
    return axios.get(`${tasksUrl}user_relevant/?complete=${false}&stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
};

export const getCreatableTasks = (campaignId: string | number) => {
    return axios.get(`${taskstagesUrl}user_relevant/?chain__campaign=${campaignId}`)
        .then(res => res.data)
};


// Task Functions
export const getPreviousTasks = (id: string | number) => {
    return axios.get(`${tasksUrl + id}/list_displayed_previous/`)
        .then(res => res.data)
}