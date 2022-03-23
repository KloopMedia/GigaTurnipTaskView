const useHelpers = () => {

    const parseId = (id: string | undefined) => {
        if (id) {
            return parseInt(id);
        } else {
            throw new Error("No id");
        }
    }

    const parseJson = (text: string | undefined) => {
        if (text) {
            return JSON.parse(text);
        } else {
            return {}
        }
    }

    const parseTaskData = (data: any) => {
        return ({
            responses: data.responses,
            schema: parseJson(data.stage.json_schema),
            uiSchema: parseJson(data.stage.ui_schema)
        })
    }

    const formatDateString = (date: string) => {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = addZeroesToDate(d.getMonth() + 1)
        const day = addZeroesToDate(d.getDate())
        const hours = addZeroesToDate(d.getHours())
        const minutes = addZeroesToDate(d.getMinutes())
        const seconds = addZeroesToDate(d.getSeconds())
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }

    const addZeroesToDate = (date: number) => {
        return date < 10 ? '0' + date : date
    }

    return {
        parseId,
        parseJson,
        parseTaskData,
        formatDateString
    };
};

export default useHelpers
