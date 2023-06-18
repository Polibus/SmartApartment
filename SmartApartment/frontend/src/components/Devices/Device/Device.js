import React, { useState } from "react";

function Device(props) {

    const [showDescription, setShowDescription] = useState(false);
    let colors = false
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    }

    const editHandler = () => {
        props.onEdit({
            _id: props._id,
            deviceName: props.deviceName,
            room: props.room,
            type: props.type,
            userEmail: props.userEmail
        })


    }
    if (props.isActive === "True") {
        colors = true
    }
    if (props.isActive === "False") {
        colors = false
    }
    return (
        <div className="device">
            {colors ? <p style={{ color: "#39A845", fontWeight: "bold", fontSize: "25px" }} onClick={toggleDescription}>{props.deviceName} </p> : <p style={{ color: "#DA0037", fontWeight: "bold", fontSize: "25px" }} onClick={toggleDescription}>{props.deviceName} </p>}
            {showDescription ? (
                <div className="description"> {props.room} <br /> {props.type} <br />  {props.userEmail} <br />  {props.isActive} </div>
            ) : null}
            <button onClick={editHandler}>Edit device</button>
            <button className="delete" onClick={() => { props.onDelete(props._id); }}>Delete</button>
        </div>);
}

export default Device;