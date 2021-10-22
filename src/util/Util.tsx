import axios from "./Axios";
import {campaignsUrl, taskstagesUrl, tasksUrl} from "../config/Urls";

export const IS_PAGINATION_ON = false

export const paginatedDataHandler = (
    data: any,
    setDataFunction: (res: any) => void,
    setCountFunction: (count: number) => void,
) => {
    const {results, count} = data;
    const numOfPages = Math.ceil(count / 10)
    console.log("numOfPages", numOfPages)
    console.log("results", results)
    setDataFunction(results)
    setCountFunction(numOfPages)
}

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

export const requestCampaignInfo = (id: string | number) => {
    return axios.get(campaignsUrl + id + '/')
        .then(res => res.data)
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
export const getSelectableTasks = (campaignId: string | number, page?: number) => {
    console.log(page)
    if (page && page > 0) {
        return axios.get(`${tasksUrl}user_selectable/?stage__chain__campaign=${campaignId}&limit=10&offset=${(page - 1) * 10}`)
            .then(res => res.data)
    }
    return axios.get(`${tasksUrl}user_selectable/?stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
        .then(res => {
            console.log("getSelectableTasks", res)
            return res
        })
};

export const getCompleteTasks = (campaignId: string | number) => {
    return axios.get(`${tasksUrl}user_relevant/?complete=${true}&stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
        .then(res => {
            console.log("getCompleteTasks", res)
            return (res)
        })
};

export const getOpenTasks = (campaignId: string | number) => {
    return axios.get(`${tasksUrl}user_relevant/?complete=${false}&stage__chain__campaign=${campaignId}`)
        .then(res => res.data)
        .then(res => {
            console.log("getOpenTasks", res)
            return (res)
        })
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