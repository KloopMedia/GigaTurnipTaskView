import React, {useEffect, useState} from 'react'
import firebase from '../../../util/Firebase'
import upload from "./Upload";
import LinearProgressWithLabel from "./LinearProgressWithLabel";


const CustomFileWidget = (props: any) => {
    const {schema, disabled, name, formContext, value} = props;
    const {campaignId, chainId, stageId, userId, taskId} = formContext;
    const [fileBeingUploaded, setFileBeingUploaded] = useState<any>({})
    const [fileLinks, setFileLinks] = useState({})

    let pathToFolder: any = undefined
    if (campaignId && chainId && stageId && userId && taskId) {
        pathToFolder = firebase
        .storage()
        .ref(campaignId)
        .child(chainId)
        .child(stageId)
        .child(userId)
        .child(taskId)
    }


    useEffect(() => {
        console.log("value", value)
        if (value) {
            let newFiles: any = {}
            let parsed = JSON.parse(value)
            Object.keys(parsed).forEach(filename => {
                newFiles[filename] = {url: parsed[filename], status: "complete"}
            })
            setFileBeingUploaded(newFiles)
        }
    }, [value])

    const handleChange = async (event: any) => {
        console.log("Files selected: ", [...event.target.files,])
        upload([...event.target.files], pathToFolder, setFileBeingUploaded, setFileLinks)
    };

    useEffect(() => {
        console.log("fileLinks", fileLinks)
        let stringify = JSON.stringify(fileLinks)
        props.onChange(stringify)
    }, [fileLinks])

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input disabled={disabled} multiple={true} type="file" onChange={handleChange}/>

            {Object.keys(fileBeingUploaded).map(filename =>
                <div key={filename}>
                    <div style={{display: "flex"}}>
                        <p>{filename}</p>
                        {fileBeingUploaded[filename].status === 'complete' &&
                        <a className="text-success" href={fileBeingUploaded[filename]?.url} style={{paddingLeft: 10}}>saved</a>}
                    </div>
                    {fileBeingUploaded[filename].status === 'loading' &&
                    <LinearProgressWithLabel value={fileBeingUploaded[filename].progress}/>}
                </div>
            )}
        </div>
    )
}

export default CustomFileWidget