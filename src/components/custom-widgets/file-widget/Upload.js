import firebase from '../../../util/Firebase'

const upload = async (files, storageRef, setFileBeingUploaded, setFileLinks) => {
    if (storageRef) {
        await Promise.all(files.map(async file => {
            const snap = storageRef.child(file.name).put(file)
            setFileBeingUploaded(prevState => {
                const update = {[file.name]: {status: "loading", progress: 0}}
                return prevState ? {...prevState, ...update} : update
            })

            // Listen for state changes, errors, and completion of the upload.
            snap.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                snapshot => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFileBeingUploaded(prevState => {
                        const update = {[file.name]: {status: "loading", progress: progress}}
                        return prevState ? {...prevState, ...update} : update
                    })
                },
                error => {
                    console.log(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    snap.snapshot.ref.getDownloadURL().then(downloadURL => {
                        let fileLink = downloadURL
                        setFileBeingUploaded(prevState => {
                            const update = {[file.name]: {status: "complete", progress: 100, url: fileLink}}
                            return prevState ? {...prevState, ...update} : update
                        })
                        setFileLinks(prevState => {
                            const update = {[file.name]: fileLink}
                            return prevState ? {...prevState, ...update} : update
                        })
                    });
                });
        }))
    };
}

export default upload