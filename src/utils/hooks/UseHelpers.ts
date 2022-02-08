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

    return {
        parseId,
        parseJson,
        parseTaskData
    };
};

export default useHelpers
