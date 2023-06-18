import React, { useState } from "react";

function EditDevice(props) {

    const [deviceName, setDeviceName] = useState(props.deviceName);
    const [room, setRoom] = useState(props.room);
    const [type, setType] = useState(props.type);
    const [isActive, setIsActive] = useState(props.isActive);

    const changeDeviceNameHandler = event => {
        const value = event.target.value;
        setDeviceName(value)
    }

    const changeRoomHandler = event => {
        const value = event.target.value;
        setRoom(value)
    }

    const changeTypeHandler = event => {
        const value = event.target.value;
        setType(value)
    }
    const changeIsActiveHandler = event => {
        const value = event.target.value;
        setIsActive(value)
    }

    const editDevice = () => {
        const device = {
            _id: props._id,
            name: deviceName,
            room: room,
            type: type,
            userEmail: props.userEmail,
            isActive: isActive
        };
        props.onEdit(device)
    }

    return (
        <div className="device">
            <label>Name:</label>
            <input type="text"
                value={deviceName}
                onChange={changeDeviceNameHandler} />
            <br />
            <label>Room: </label>
            <select value={room} onChange={changeRoomHandler}>
                <option value="">Choose a room</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Bedroom">Bedroom</option>
                <option value="GuestRoom">GuestRoom</option>
                <option value="Bathroom">Bathroom</option>
            </select>
            <label> Select a device: </label>
            <select value={type} onChange={changeTypeHandler}>
                <option value="">Select a device</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Light">Light</option>
                <option value="WashingMachine">WashingMachine</option>
                <option value="Dishwasher">Dishwasher</option>
                <option value="TV">TV</option>
                <option value="Shower">Shower</option>
                <option value="Bed">Bed</option>
            </select>
            <label> On/OFF: </label>
            <select value={isActive} onChange={changeIsActiveHandler}>
                <option value="">ON/OFF</option>
                <option value="True">On</option>
                <option value="False">OFF</option>
            </select>
            <br />
            <button className="editPanel" onClick={() => editDevice()}> Save</button>
        </div>

    );
}

export default EditDevice;