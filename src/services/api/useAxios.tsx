import {baseUrl, campaignsUrl, chainsUrl, conditionalstagesUrl, taskstagesUrl, tasksUrl} from "./Urls";
import defaultAxios from "axios";
import {useAuth} from "../../context/authentication/hooks/useAuth";
import {useToast} from "../../context/toast/hooks/useToast";


const useAxios = () => {
    const {openToast} = useToast();
    const {getToken} = useAuth();
    const axios = defaultAxios.create({
        baseURL: baseUrl
    });

    axios.interceptors.request.use(
        config => {
            return getToken().then(token => {
                if (token && config && config.headers) {
                    config.headers["Authorization"] = 'JWT ' + token;
                }
                return config;
            });
        },
        error => Promise.reject(error)
    );

    // Pagination Functions
    const paginatedDataHandler = (
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

    const createPaginationURL = (request: string, page?: number) => {
        if (page && page > 0) {
            return `${request}&limit=10&offset=${(page - 1) * 10}`
        } else {
            return request
        }
    }

    const getCampaigns = () => {
        return axios.get(`${campaignsUrl}?limit=1000`)
            .then(res => res.data)
            .then(res => res.results);
    }

    const getUserCampaigns = () => {
        return axios.get(`${campaignsUrl}list_user_campaigns/`)
            .then(res => res.data);
    }

    const getSelectableCampaigns = () => {
        return axios.get(campaignsUrl + 'list_user_selectable/')
            .then(res => res.data);
    }

    const requestCampaignJoin = (id: number) => {
        return axios.post(campaignsUrl + id + '/join_campaign/')
    }

    const requestCampaignInfo = (id: number) => {
        return axios.get(campaignsUrl + id + '/')
            .then(res => res.data)
    }

    const getChains = (campaignId: number) => {
        return axios.get(`${chainsUrl}?campaign=${campaignId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
            .catch((err) => openToast(err.message));
    }

    const createChain = (data: { name: string, campaign: number, description?: string }) => {
        return axios.post(`${chainsUrl}`, data)
            .catch((err) => openToast(err.message));
    }

    const getStageNodes = (campaignId: number, chainId: number) => {
        return axios.get(`${taskstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
            .catch((err) => openToast(err.message));
    };

    const getLogicNodes = (campaignId: number, chainId: number) => {
        return axios.get(`${conditionalstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
            .catch((err) => openToast(err.message));
    };

    const getTaskStage = (id: number) => {
        return axios.get(`${taskstagesUrl + id}/`)
            .then(res => res.data)
            .catch((err) => openToast(err.message));
    }

    const saveTaskStage = (id: number, data: any) => {
        return axios.patch(`${taskstagesUrl + id}/`, data)
            .catch((err) => openToast(err.message));
    }

    const getTaskStageOptions = () => {
        return axios.options(`${taskstagesUrl}`)
            .then(res => res.data)
            .catch((err) => openToast(err.message));
    }

    const getConditionalStage = (id: number) => {
        return axios.get(`${conditionalstagesUrl + id}/`)
            .then(res => res.data)
            .catch((err) => openToast(err.message));
    }

    const saveConditionalStage = (id: number, data: any) => {
        return axios.patch(`${conditionalstagesUrl + id}/`, data)
            .catch((err) => openToast(err.message));
    }

    // TaskCard Functions
    const requestTaskCreation = (id: number) => {
        return axios.post(taskstagesUrl + id + '/create_task/')
            .then(res => res.data)
    }

    const requestTaskAssignment = (id: number) => {
        return axios.post(tasksUrl + id + '/request_assignment/')
    }

    // TaskMenu Functions
    const getSelectableTasks = (campaignId: string | number, page?: number, filter?: { query?: string, stage?: string } | null) => {
        console.log(page)
        let url = createPaginationURL(`${tasksUrl}user_selectable/?stage__chain__campaign=${campaignId}`, page)
        if (filter) {
            if (filter.query) {
                // url += `&task_responses=${filter.query}`
                url += `&search=${filter.query}`
            }
            if (filter.stage) {
                url += `&stage=${filter.stage}`
            }
            // url = `${tasksUrl}?task_responses=${filter.query}`
        }
        console.log("SELECTABLE URL", url)
        return axios.get(url).then(res => {
            console.log("getSelectableTasks", res.data)
            return res.data;
        })
    };

    const getCompleteTasks = (campaignId: number) => {
        return axios.get(`${tasksUrl}user_relevant/?complete=${true}&stage__chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => {
                console.log("getCompleteTasks", res)
                return (res)
            })
    };

    const getOpenTasks = (campaignId: number) => {
        return axios.get(`${tasksUrl}user_relevant/?complete=${false}&stage__chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => {
                console.log("getOpenTasks", res)
                return (res)
            })
    };

    const getCreatableTasks = (campaignId: number) => {
        return axios.get(`${taskstagesUrl}user_relevant/?chain__campaign=${campaignId}`)
            .then(res => res.data)
    };

    return {
        axios,
        getCampaigns,
        getChains,
        createChain,
        getStageNodes,
        getLogicNodes,
        getTaskStage,
        saveTaskStage,
        getTaskStageOptions,
        getConditionalStage,
        saveConditionalStage,
        getUserCampaigns,
        getSelectableCampaigns,
        requestCampaignJoin,
        requestCampaignInfo,
        requestTaskCreation,
        requestTaskAssignment,
        getCompleteTasks,
        getOpenTasks,
        getCreatableTasks,
        getSelectableTasks
    }
}

export default useAxios;