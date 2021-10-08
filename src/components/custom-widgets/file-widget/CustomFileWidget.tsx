import React, {useEffect, useState} from 'react'
import firebase from '../../../util/Firebase'
import upload from "./Upload";
import LinearProgressWithLabel from "./LinearProgressWithLabel";


const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, disabled, name, formContext, value} = props;
    const {campaignId, chainId, stageId, userId, taskId} = formContext;
    const [uploadedFiles, setUploadedFiles] = useState<any>({})
    const [fileLinks, setFileLinks] = useState<any>({})
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
                        .then(url => setUploadedFiles((prevState: any) => ({
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
        upload([...event.target.files], pathToFolder, setUploadedFiles, setFileLinks, multipleSelect)
    };

    const getDownloadUrl = (path: string) => {
        return firebase.storage().ref(path).getDownloadURL()
    }

    useEffect(() => {
        if (fileLinks) {
            console.log("fileLinks", fileLinks)
            try {
                let stringify = "";
                if (multipleSelect) {
                    const parsed = JSON.parse(value);
                    const allFiles = {...parsed, ...fileLinks};
                    stringify = JSON.stringify(allFiles);
                } else {
                    stringify = JSON.stringify(fileLinks);
                }
                props.onChange(stringify);
            } catch (error) {
                const stringify = JSON.stringify(fileLinks)
                props.onChange(stringify)
            }
        }
    }, [fileLinks])

    const deleteFile = (filename: string) => {
        const parsed = JSON.parse(value)
        if (filename in parsed) {
            delete parsed[filename]
            const stringify = JSON.stringify(parsed)
            props.onChange(stringify)
        }

        const links = {...fileLinks}
        if (filename in links) {
            delete links[filename]
            setFileLinks(links)
        }

        const uploaded = {...uploadedFiles}
        if (filename in uploaded) {
            delete uploaded[filename]
            setUploadedFiles(uploaded)
        }
    };

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input disabled={disabled} multiple={multipleSelect} type="file" onChange={handleChange}/>

            {Object.keys(uploadedFiles).map(filename =>
                <div key={filename}>
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        <p>{filename}</p>
                        {uploadedFiles[filename].status === 'complete' &&
                        <div style={{display: "flex", alignItems: "baseline"}}>
                            <a className="text-success" href={uploadedFiles[filename]?.url}
                               style={{paddingLeft: 10}}>посмотреть файл</a>
                            {!disabled && <button
                                onClick={() => deleteFile(filename)}
                                style={{fontSize: "14px", padding: "0 10px"}}
                                type="button"
                                className="btn btn-link text-danger"
                            >
                                удалить
                            </button>}
                        </div>
                        }
                    </div>
                    {uploadedFiles[filename].status === 'loading' &&
                    <LinearProgressWithLabel value={uploadedFiles[filename].progress}/>}
                </div>
            )}
        </div>
    )
}

export default CustomFileWidget