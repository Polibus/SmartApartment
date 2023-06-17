import React, { useState } from "react";

function Device(props) {

    const [showDescription, setShowDescription] = useState(false);

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
    return (
        <div className="device">
            <p onClick={toggleDescription}>{props.deviceName} </p>
            {showDescription ? (
                <div className="description"> {props.room} <br /> {props.type} <br />  {props.userEmail} <br />  {props.isActive} </div>
            ) : null}
            <button onClick={editHandler}>edytuj</button>
            <button className="delete" onClick={() => { props.onDelete(props._id); }}>usuń</button>
        </div>);
}

export default Device;