import React from 'react';
import {Editor} from "@tinymce/tinymce-react";
import {Box} from '@mui/material';

type Props = {
    data?: string
    hidden?: boolean
    id?: string
};

const TextViewer = (props: Props) => {
    const {data, hidden, id} = props;

    return (
        <Box hidden={hidden}>
            <Editor
                id={id ?? "ViewerTinyMCE"}
                value={data}
                inline={false}
                disabled={true}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                init={{
                    plugins: 'autoresize',
                    toolbar: false,
                    menubar: false,
                    image_advtab: true,
                    importcss_append: true,
                }}
            />
        </Box>
    );
};

export default TextViewer