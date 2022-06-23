import React, {useEffect, useState} from 'react'
import upload from "./Upload";
import LinearProgressWithLabel from "../../../progress/LinearProgressWithLabel";
import ImageViewer from 'react-simple-image-viewer';
import {Box, Button, Dialog} from "@mui/material";
import {ref, getDownloadURL, getMetadata} from "firebase/storage";
import {storage} from "../../../../services/firebase/Firebase";
import {useTranslation} from "react-i18next";


const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, disabled, required, formContext, value, id} = props;
    const {storagePath} = formContext;
    const [uploadedFiles, setUploadedFiles] = useState<any>({})
    const [fileLinks, setFileLinks] = useState<any>({})
    const [currentFile, setCurrentFile] = useState("")
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [fileType, setFileType] = useState("")
    const [parsedValue, setParsedValue] = useState<any>({})

    const {t} = useTranslation();

    const privateUpload = uiSchema["ui:options"] && uiSchema["ui:options"].private ? uiSchema["ui:options"].private : false
    const multipleSelect = uiSchema["ui:options"] && uiSchema["ui:options"].multiple ? uiSchema["ui:options"].multiple : false
    const hasUploadedFiles = Object.keys(uploadedFiles).length > 0

    const privatePath = privateUpload ? "private" : "public";
    const storageRef = ref(storage, `${privatePath}/${storagePath}`);

    useEffect(() => {
        if (value && Object.keys(value).length > 0) {
            const parsed = JSON.parse(value)
            setParsedValue(parsed)
            Object.keys(parsed).forEach(filename => {
                const fileRef = ref(storage, parsed[filename])
                getDownloadURL(fileRef)
                    .then(url => setUploadedFiles((prevState: any) => ({
                        ...prevState,
                        [filename]: {url: url, status: "complete"}
                    })))
            })
        }
    }, [value])

    const handleChange = async (event: any) => {
        await upload([...event.target.files], storageRef, setUploadedFiles, setFileLinks, multipleSelect)
        event.target.value = null;
    };

    const _onBlur = () => props.onBlur(id, uploadedFiles);
    const _onFocus = () => props.onFocus(id, uploadedFiles);

    useEffect(() => {
        const updateFormResponses = async () => {
            try {
                let stringify = "";
                if (multipleSelect) {
                    const parsed = JSON.parse(value);
                    const allFiles = {...parsed, ...fileLinks};
                    stringify = JSON.stringify(allFiles);
                } else {
                    stringify = JSON.stringify(fileLinks);
                }
                await props.onChange(stringify);
            } catch (error) {
                const stringify = JSON.stringify(fileLinks)
                await props.onChange(stringify)
            }
        }

        if (fileLinks && Object.keys(fileLinks).length > 0) {
            updateFormResponses().then(() => _onBlur())
        }
    }, [fileLinks])

    const deleteFile = async (filename: string) => {
        const parsed = parsedValue
        if (filename in parsed) {
            delete parsed[filename]
            const stringify = Object.keys(parsed).length > 0 ? JSON.stringify(parsed) : undefined;
            await props.onChange(stringify)
            _onBlur()
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

    const handleFileClick = async (filename: string) => {
        const parsed = parsedValue;
        if (filename in parsed) {
            const path = parsed[filename];
            const metadata = await getMetadata(ref(storage, path));
            if (metadata && metadata.contentType) {
                const type = metadata.contentType.split("/")[0]
                const ext = metadata.contentType.split("/")[1]
                switch (type) {
                    case "image":
                        setCurrentFile(uploadedFiles[filename].url);
                        setFileType(metadata.contentType);
                        setIsImageOpen(true);
                        break;
                    case "video":
                        setCurrentFile(uploadedFiles[filename].url);
                        if (ext === 'quicktime') {
                            setFileType('video/mp4');
                        } else {
                            setFileType(metadata.contentType);
                        }
                        setIsVideoOpen(true);
                        break;
                    default:
                        window.open(uploadedFiles[filename].url, '_blank');
                }
            }
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

            <label className={"form-label"}>
                {schema?.title}
                {schema?.title && required ? "*" : null}
            </label>
            <br/>

            <Box pb={1}>
                <Button
                    variant="contained"
                    component="label"
                    disabled={disabled}
                >
                    {t('files.choose_files')}
                    <input
                        type="file"
                        hidden
                        disabled={disabled}
                        multiple={multipleSelect}
                        onChange={handleChange}
                        onBlur={_onBlur}
                        onFocus={_onFocus}
                    />
                </Button>
            </Box>

            {
                Object.keys(uploadedFiles).map((filename, i) =>
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
                                        {t("files.view_file")}
                                    </button>
                                    {!disabled &&
                                        <button
                                            onClick={() => deleteFile(filename)}
                                            style={{fontSize: "14px", padding: 0, margin: "0 10px"}}
                                            type="button"
                                            className="btn btn-link text-danger"
                                        >
                                            {t("files.remove_file")}
                                        </button>}
                                </div>
                            }
                        </div>
                        {uploadedFiles[filename].status === 'loading' &&
                            <LinearProgressWithLabel value={uploadedFiles[filename].progress}/>}
                    </div>
                )
            }
        </div>
    )
}

export default CustomFileWidget