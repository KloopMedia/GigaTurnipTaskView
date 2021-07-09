import React from 'react'


const CustomFileWidget = (props: any) => {
    const {schema, disabled} = props;
    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input disabled={disabled} type="file"/>
        </div>
    )
}

export default CustomFileWidget