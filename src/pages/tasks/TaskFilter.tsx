import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography, } from "@mui/material";
import useAxios from "../../services/api/useAxios";
import { chainsUrl, taskstagesUrl } from "../../services/api/Urls";
import Form from "../../components/form/Form";
import useHelpers from "../../utils/hooks/UseHelpers";
import { useTranslation } from "react-i18next";

const OPERATORS = ["==", "!=", "<", ">", "<=", ">=", "in"];
const TYPES = ["string", "int", "datetime"]

const TaskFilter = (props: { campaign: number, onFilter: (filter: { query: string, mode: "simple" | "complex" }) => void }) => {
    const { campaign, onFilter } = props;

    const { axios, getChains, getTaskFields } = useAxios();
    const { parseId } = useHelpers();
    const { t } = useTranslation();

    const [chainId, setChainId] = useState("")
    const [searchStageId, setSearchStageId] = useState("")
    const [formStageId, setFormStageId] = useState("")
    const [chains, setChains] = useState([])
    const [stages, setStages] = useState([])
    const [jsonSchema, setJsonSchema] = useState<any>({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    const [simpleFilterMode, setSimpleFilterMode] = useState(true)
    const [simpleFilterQuery, setSimpleFilterQuery] = useState('');

    useEffect(() => {
        getChains(campaign)
            .then(res => setChains(res))
            .then(() => {
                if (!chainId) {
                    const savedChain = localStorage.getItem("selectable_filter_chain");
                    if (savedChain) {
                        setChainId(savedChain)
                    }
                }
            })
    }, [campaign])

    useEffect(() => {
        if (chainId && chains.length > 0) {
            axios.get(`${taskstagesUrl}?chain__campaign=${campaign}&chain=${chainId}`)
                .then(res => res.data)
                .then(res => setStages(res.results))
                .then(() => {
                    if (!formStageId) {
                        const savedFormStage = localStorage.getItem("selectable_filter_form_stage");
                        if (savedFormStage) {
                            setFormStageId(savedFormStage)
                        }
                    }
                })
        }
    }, [chainId])

    const createSchema = (fields: string[]) => {
        return {
            title: t("filter.filter_label"),
            type: "array",
            items: {
                type: "object",
                required: ["field", "type"],
                properties: {
                    field: {
                        type: "string",
                        title: t("filter.field_label"),
                        enum: [...fields]
                    },
                    type: {
                        type: "string",
                        title: t("filter.type_label"),
                        enum: TYPES,
                        enumNames: t("filter.types", { returnObjects: true })
                    },
                    conditions: {
                        type: "array",
                        title: t("filter.conditions_label"),
                        items: {
                            type: "object",
                            properties: {
                                operator: {
                                    title: t("filter.operator_label"),
                                    type: "string",
                                    enum: OPERATORS,
                                    enumNames: t("filter.operators", { returnObjects: true })
                                },
                                value: {
                                    title: t("filter.value_label"),
                                    description: t("filter.value_description"),
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    useEffect(() => {
        if (formStageId) {
            const parsedStageId = parseId(formStageId)
            const savedResponses = localStorage.getItem("selectable_filter_responses");
            if (savedResponses) {
                setFormResponses(JSON.parse(savedResponses))
            }
            getTaskFields(parsedStageId).then(res => {
                const fields = res.fields;
                const _schema: any = createSchema(fields)
                setJsonSchema(_schema)
            })
        }
    }, [formStageId])


    const handleChainChange = (event: SelectChangeEvent) => {
        setChainId(event.target.value);
        setSearchStageId("")
        setFormStageId("");
        setFormResponses({})
        setJsonSchema({})
        setUiSchema({})
        localStorage.setItem("selectable_filter_chain", event.target.value);
        localStorage.setItem("selectable_filter_form_stage", "");
        localStorage.setItem("selectable_filter_responses", JSON.stringify({}));
        localStorage.setItem("selectable_filter_stage", "");
    };

    const handleStageChange = (event: SelectChangeEvent) => {
        setSearchStageId(event.target.value)
        localStorage.setItem("selectable_filter_stage", event.target.value);
    }

    const handleFormStageChange = (event: SelectChangeEvent) => {
        setFormStageId(event.target.value);
        setFormResponses({})
        setJsonSchema({})
        setUiSchema({})
        localStorage.setItem("selectable_filter_form_stage", event.target.value);
        localStorage.setItem("selectable_filter_responses", JSON.stringify({}));
    };

    const handleFormChange = (formData: object) => {
        setFormResponses(formData)
        localStorage.setItem("selectable_filter_responses", JSON.stringify(formData));
    }

    const handleFormSubmit = () => {
        const parsedFormStageId = formStageId ? parseId(formStageId) : null;
        const parsedSearchStageId = searchStageId ? parseId(searchStageId) : null;
        const query = { all_conditions: formResponses, stage: parsedFormStageId, search_stage: parsedSearchStageId };
        const queryString = JSON.stringify(query)
        if (simpleFilterMode) {
            onFilter({ query: simpleFilterQuery, mode: "simple" })
        } else {
            onFilter({ query: queryString, mode: "complex" })
        }
    };

    const complexFilter = <FormGroup>
        {chains.length > 0 && <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-chain-filter">{t("filter.chain_label")}</InputLabel>
            <Select
                labelId="select-chain-label"
                id="select-chain"
                value={chainId}
                label={t("filter.chain_label")}
                onChange={handleChainChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {chains.map((item: any) => <MenuItem key={`filter_chain_${item.id}`}
                    value={item.id}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>}
        <FormControl disabled={chainId === ""} sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-stage-filter">{t("filter.search_stage_label")}</InputLabel>
            <Select
                labelId="select-stage-label"
                id="search-stage"
                value={searchStageId}
                label={t("filter.search_stage_label")}
                onChange={handleStageChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {stages.map((item: any) => <MenuItem key={`filter_stage_${item.id}`}
                    value={item.id}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl disabled={chainId === ""} sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-form-stage-filter">{t("filter.stage_label")}</InputLabel>
            <Select
                labelId="select-stage-label"
                id="select-stage"
                value={formStageId}
                label={t("filter.stage_label")}
                onChange={handleFormStageChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {stages.map((item: any) => <MenuItem key={`filter_form_stage_${item.id}`}
                    value={item.id}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
        <Box sx={{ m: 1, minWidth: 120 }}>
            <Form
                schema={jsonSchema}
                uiSchema={uiSchema}
                formData={formResponses}
                hideButton={true}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
            >
                <Button fullWidth type={"submit"} sx={{ mx: 1, mb: 2 }} variant={"contained"}>{t("filter.search_button")}</Button>
            </Form>
        </Box>
    </FormGroup>

    const simpleFilter = <Box>
        <TextField label="Поиск" variant="outlined" fullWidth onChange={(event) => setSimpleFilterQuery(event.target.value)} />
        <Button sx={{ my: 2 }} fullWidth onClick={handleFormSubmit} variant={"contained"}>{t("filter.search_button")}</Button>
    </Box>

    return (
        <Box>
            <Box display={"flex"} alignItems="center" m={1}>
                <Typography>Простой фильтр</Typography>
                <Switch checked={simpleFilterMode} onChange={(event) => setSimpleFilterMode(event.target.checked)}/>
            </Box>

            {
                simpleFilterMode ? simpleFilter : complexFilter
            }
        </Box>
    );
};

export default TaskFilter