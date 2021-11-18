import React, {useEffect, useState} from "react";
import Axios from "../../util/Axios";
import {chainsUrl, taskstagesUrl} from "../../config/Urls";
import {Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Form} from "@rjsf/bootstrap-4";
import CustomFileWidget from "../custom-widgets/file-widget/CustomFileWidget";
import AutoCompleteWidget from "../custom-widgets/autocomplete/AutoCompleteWidget";
import FixedRadioWidget from "../custom-widgets/fixed-radio-widget/FixedRadioWidget";

const TaskFilter = (props: { campaign: string }) => {

    const {campaign} = props;

    const [chainId, setChainId] = useState("")
    const [stageId, setStageId] = useState("")
    const [formStageId, setFormStageId] = useState("")
    const [chains, setChains] = useState([])
    const [stages, setStages] = useState([])
    const [jsonSchema, setJsonSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})

    const widgets = {
        customfile: CustomFileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: FixedRadioWidget
    };

    // useEffect(() => {
    //     const savedChain = localStorage.getItem("selectable_filter_chain");
    //     const savedStage = localStorage.getItem("selectable_filter_stage");
    //     if (savedChain) {
    //         setChainId(savedChain)
    //     }
    //     if (savedStage) {
    //         setStageId(savedStage)
    //     }
    // }, [])

    useEffect(() => {
        Axios.get(`${chainsUrl}?campaign=${campaign}`)
            .then(res => res.data)
            .then(res => setChains(res.results))
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
            Axios.get(`${taskstagesUrl}?chain=${chainId}&chain__campaign=${campaign}`)
                .then(res => res.data)
                .then(res => setStages(res.results))
                .then(() => {
                    if (!formStageId) {
                        const savedStage = localStorage.getItem("selectable_filter_stage");
                        const savedFormStage = localStorage.getItem("selectable_filter_form_stage");
                        if (savedStage) {
                            setStageId(savedStage)
                        }
                        if (savedFormStage) {
                            setFormStageId(savedFormStage)
                        }
                    }
                })
        }
    }, [chainId])

    useEffect(() => {
        console.log(formStageId)
        if (formStageId && stages.length > 0) {
            const stage = stages.filter((item: any) => item.id == formStageId)[0] as any
            console.log(stage)
            if (stage) {
                const schema = stage.json_schema ? JSON.parse(stage.json_schema) : {}
                const ui = stage.ui_schema ? JSON.parse(stage.ui_schema) : {}
                setJsonSchema(schema)
                setUiSchema(ui)
                const savedResponses = localStorage.getItem("selectable_filter_responses");
                if (savedResponses) {
                    setFormResponses(JSON.parse(savedResponses))
                }
            }
        }
    }, [formStageId])


    const handleChainChange = (event: SelectChangeEvent) => {
        setChainId(event.target.value);
        setStageId("")
        setFormStageId("");
        setFormResponses({})
        setJsonSchema({})
        setUiSchema({})
        localStorage.setItem("selectable_filter_chain", event.target.value);
        localStorage.setItem("selectable_filter_stage", "");
        localStorage.setItem("selectable_filter_form_stage", "");
        localStorage.setItem("selectable_filter_responses", JSON.stringify({}));
    };

    const handleStageChange = (event: SelectChangeEvent) => {
        setStageId(event.target.value)
        localStorage.setItem("selectable_filter_stage", event.target.value);
    }

    const handleFormStageChange = (event: SelectChangeEvent) => {
        setFormStageId(event.target.value);
        setFormResponses({})
        localStorage.setItem("selectable_filter_form_stage", event.target.value);
        localStorage.setItem("selectable_filter_responses", JSON.stringify({}));
    };

    const handleFormChange = (e: { formData: object }) => {
        setFormResponses(e.formData)
        localStorage.setItem("selectable_filter_responses", JSON.stringify(e.formData));
    }

    const handleFormSubmit = () => {

    };

    return (
        <FormGroup>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-chain-filter">Chain</InputLabel>
                <Select
                    labelId="select-chain-label"
                    id="select-chain"
                    value={chainId}
                    label="Chain"
                    onChange={handleChainChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {chains.map((item: any) => <MenuItem key={`filter_chain_${item.id}`}
                                                         value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl disabled={chainId === ""} sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-stage-filter">Stage</InputLabel>
                <Select
                    labelId="select-stage-label"
                    id="select-stage"
                    value={stageId}
                    label="Stage"
                    onChange={handleStageChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {stages.map((item: any) => <MenuItem key={`filter_stage_${item.id}`}
                                                         value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl disabled={chainId === ""} sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-form-stage-filter">Form Stage</InputLabel>
                <Select
                    labelId="select-stage-label"
                    id="select-stage"
                    value={formStageId}
                    label="Form Stage"
                    onChange={handleFormStageChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {stages.map((item: any) => <MenuItem key={`filter_form_stage_${item.id}`}
                                                         value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Box sx={{m: 1, minWidth: 120}}>
                <Form
                    schema={jsonSchema}
                    uiSchema={uiSchema}
                    widgets={widgets}
                    formData={formResponses}
                    onChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                />
            </Box>
        </FormGroup>
    );
};

export default TaskFilter