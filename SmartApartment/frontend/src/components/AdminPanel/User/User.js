import React, { useState } from "react";

function User(props) {

    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    }

    const editHandler = () => {
        props.onEdit({
            _id: props._id,
            email: props.email,
            password: props.password,
            isAdmin: props.isAdmin,
            isActive: props.isActive,
        })
    }
    return (
        <div className="device">

            {props.isActive ? <p style={{ color: "#39A845", fontWeight: "bold", fontSize: "25px" }} onClick={toggleDescription}>{props.email}</p> : <p style={{ color: "#DA0037", fontWeight: "bold", fontSize: "25px" }} onClick={toggleDescription}>{props.email} </p>}
            {showDescription ? (
                <div className="description"> Admin: {props.isAdmin.toString()} <br /> Banned: {props.isActive.toString()} </div>
            ) : null}
            <button onClick={editHandler}> edit user</button>
            <button className="delete" onClick={() => { props.onDelete(props._id); }}>delete</button>
        </div>

    );
}

export default User;