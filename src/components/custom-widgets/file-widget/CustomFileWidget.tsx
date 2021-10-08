import React, {useEffect, useState} from 'react'
import firebase from '../../../util/Firebase'
import upload from "./Upload";
import LinearProgressWithLabel from "./LinearProgressWithLabel";


const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, disabled, name, formContext, value} = props;
    const {campaignId, chainId, stageId, userId, taskId} = formContext;
    const [fileBeingUploaded, setFileBeingUploaded] = useState<any>({})
    const [fileLinks, setFileLinks] = useState({})
    const privateUpload = uiSchema["ui:options"] && uiSchema["ui:options"].private ? uiSchema["ui:options"].private : false
    const multipleSelect = uiSchema["ui:options"] && uiSchema["ui:options"].multiple ? uiSchema["ui:options"].multiple : false

    let pathToFolder: any = undefined
    if (campaignId && chainId && stageId && userId && taskId) {
        pathToFolder = firebase.storage()
        if (privateUpload) {
            pathToFolder = pathToFolder.ref("private")
        } else {
            pathToFolder = pathToFolder.ref("public")
        }
        pathToFolder = pathToFolder.child(campaignId)
                .child(chainId)
                .child(stageId)
                .child(userId)
                .child(taskId)
    }


    useEffect(() => {
        console.log("value", value)
        console.log("uiSchema", uiSchema)
        if (value) {
            try {
                const parsed = JSON.parse(value)
                Object.keys(parsed).forEach(filename => {
                    getDownloadUrl(parsed[filename])
                        .then(url => setFileBeingUploaded((prevState: any) => ({
                            ...prevState,
                            [filename]: {url: url, status: "complete"}
                        })))
                })
            } catch (error) {
                // setFileBeingUploaded({})
            }
        }
    }, [value])

    const handleChange = async (event: any) => {
        console.log("Files selected: ", [...event.target.files,])
        upload([...event.target.files], pathToFolder, setFileBeingUploaded, setFileLinks)
    };

    const getDownloadUrl = (path: string) => {
        return firebase.storage().ref(path).getDownloadURL()
    }

    useEffect(() => {
        if (fileLinks) {
            console.log("fileLinks", fileLinks)
            try {
                let parsed = JSON.parse(value)
                let allFiles = {...parsed, ...fileLinks}
                console.log(allFiles)
                let stringify = JSON.stringify(allFiles)

                props.onChange(stringify)
            } catch (error) {
                let stringify = JSON.stringify(fileLinks)

                props.onChange(stringify)
            }
        }
    }, [fileLinks])

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input disabled={disabled} multiple={multipleSelect} type="file" onChange={handleChange}/>

            {Object.keys(fileBeingUploaded).map(filename =>
                <div key={filename}>
                    <div style={{display: "flex"}}>
                        <p>{filename}</p>
                        {fileBeingUploaded[filename].status === 'complete' &&
                        <a className="text-success" href={fileBeingUploaded[filename]?.url}
                           style={{paddingLeft: 10}}>saved</a>}
                    </div>
                    {fileBeingUploaded[filename].status === 'loading' &&
                    <LinearProgressWithLabel value={fileBeingUploaded[filename].progress}/>}
                </div>
            )}
        </div>
    )
}

export default CustomFileWidget