import {uploadBytesResumable, ref, getDownloadURL} from "firebase/storage";

const returnNewState = (prevState, update, multiple) => {
    if (multiple) {
        if (prevState) {
            return {...prevState, ...update}
        } else {
            return update
        }
    } else {
        return update
    }
}

const upload = async (files, storageRef, setFileBeingUploaded, setFileLinks, multiple) => {
    if (storageRef) {
        if (!multiple) {
            setFileBeingUploaded({})
            setFileLinks({})
        }
        await Promise.all(files.map(async file => {
            const period = file.name.lastIndexOf('.');
            const name = file.name.substring(0, period);
            const ext = file.name.substring(period);
            const filename = name.replace(/\./g, '_').replace(/ /g, '_') + ext;

            const fileRef = ref(storageRef, file.name)
            const uploadTask = uploadBytesResumable(fileRef, file)

            setFileBeingUploaded(prevState => {
                const update = {[filename]: {status: "loading", progress: 0}}
                return prevState ? {...prevState, ...update} : update
            })

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed', // or 'state_changed'
                snapshot => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFileBeingUploaded(prevState => {
                        const update = {[filename]: {status: "loading", progress: progress}}
                        return prevState ? {...prevState, ...update} : update
                    })
                },
                error => {
                    console.log(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const filePath = uploadTask.snapshot.ref.fullPath
                        const fileLink = downloadURL
                        setFileBeingUploaded(prevState => {
                            const update = {[filename]: {status: "complete", progress: 100, url: fileLink}}
                            return returnNewState(prevState, update, multiple)
                        })
                        setFileLinks(prevState => {
                            const update = {[filename]: filePath}
                            return returnNewState(prevState, update, multiple)
                        })
                    });
                });
        }))
    }
}

export default upload