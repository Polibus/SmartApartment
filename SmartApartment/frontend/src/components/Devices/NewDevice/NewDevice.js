import React, { useState } from "react";
import { decodeToken } from 'react-jwt';
function NewDevice(props) {

    const [deviceName, setDeviceName] = useState('');
    const [room, setRoom] = useState('');
    const [type, setType] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [isActive, setIsActive] = useState(props.isActive);

    const User = decodeToken(localStorage.getItem('token'))


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
    const addDevice = () => {
        const device = {
            room: room,
            name: deviceName,
            type: type,
            userEmail: User.email,
            isActive: isActive
        };
        props.onAdd(device)

        setDeviceName('');
        setRoom('');
        setType('');
        setShowForm(false)
    }

    return (
        showForm ? (
            <div className="device">
                <label>Name: </label>
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
                <label> Device: </label>
                <select value={type} onChange={changeTypeHandler}>
                    <option value=""> Select a device</option>
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
                    <option value="">On/OFF</option>
                    <option value="True">On</option>
                    <option value="False">OFF</option>
                </select>
                <br />

                <button onClick={() => addDevice()}>New device</button>
            </div>
        ) : (
            <button className="panelNew" onClick={() => { setShowForm(true) }}>New device</button>
        )
    );
}

export default NewDevice