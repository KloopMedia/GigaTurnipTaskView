import React, {useEffect, useState} from 'react'
import firebase from '../../../util/Firebase'
import upload from "./Upload";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import ImageViewer from 'react-simple-image-viewer';
import {Dialog} from "@material-ui/core";


const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, disabled, required, formContext, value} = props;
    const {campaignId, chainId, stageId, userId, taskId} = formContext;
    const [uploadedFiles, setUploadedFiles] = useState<any>({})
    const [fileLinks, setFileLinks] = useState<any>({})
    const [currentFile, setCurrentFile] = useState("")
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [fileType, setFileType] = useState("")

    const privateUpload = uiSchema["ui:options"] && uiSchema["ui:options"].private ? uiSchema["ui:options"].private : false
    const multipleSelect = uiSchema["ui:options"] && uiSchema["ui:options"].multiple ? uiSchema["ui:options"].multiple : false
    const hasUploadedFiles = Object.keys(uploadedFiles).length > 0
    const isInputRequired = required && !hasUploadedFiles

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
        event.target.value = null;
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
        console.log("DELETE LOG", uploaded)
    };

    const handleFileClick = async (filename: string) => {
        const parsed = JSON.parse(value);
        const path = parsed[filename];
        console.log(path)
        const metadata = await firebase.storage().ref().child(path).getMetadata()
        const type = metadata.contentType.split("/")[0]
        console.log("FILE TYPE", type)
        switch (type) {
            case "image":
                setCurrentFile(uploadedFiles[filename].url);
                setFileType(metadata.contentType);
                setIsImageOpen(true);
                break;
            case "video":
                setCurrentFile(uploadedFiles[filename].url);
                setFileType(metadata.contentType);
                setIsVideoOpen(true);
                break;
            default:
                // window.open(uploadedFiles[filename].url, '_blank');
                alert("Файл не является фото или видео")
        }
    }

    const closeViewer = () => {
        setCurrentFile("")
        setFileType("");
        setIsImageOpen(false);
        setIsVideoOpen(false);
    };

    return (
        <div>
            {isImageOpen && <ImageViewer
                src={[currentFile]}
                disableScroll={false}
                backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}
                closeOnClickOutside={true}
                onClose={closeViewer}
            />}
            <Dialog
                open={isVideoOpen}
                onClose={closeViewer}
                fullWidth={true}
            >
                    <video height="360px" controls>
                        <source src={currentFile} type={fileType}/>
                        Your browser does not support the video tag.
                    </video>
            </Dialog>

            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input disabled={disabled} required={isInputRequired} multiple={multipleSelect} type="file" onChange={handleChange}/>

            {Object.keys(uploadedFiles).map((filename, i) =>
                <div key={filename}>
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        <p>{filename}</p>
                        {uploadedFiles[filename].status === 'complete' &&
                        <div style={{display: "flex", alignItems: "baseline"}}>
                            <button
                                onClick={() => handleFileClick(filename)}
                                style={{fontSize: "14px", padding: 0, margin: "0 10px"}}
                                type="button"
                                className="btn btn-link text-success"
                            >
                                посмотреть файл
                            </button>
                            {!disabled &&
                            <button
                                onClick={() => deleteFile(filename)}
                                style={{fontSize: "14px", padding: 0, margin: "0 10px"}}
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