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
            <label>Nazwa:</label>
            <input type="text"
                value={deviceName}
                onChange={changeDeviceNameHandler} />
            <label>Pokój: </label>
            <select value={room} onChange={changeRoomHandler}>
                <option value="">Wybierz pomieszczenie</option>
                <option value="Kitchen">Kuchnia</option>
                <option value="Bedroom">Sypialnia</option>
                <option value="GuestRoom">Gościny</option>
                <option value="Bathroom">Łazienka</option>
            </select>
            <br />
            <label>Rodzaj urządzenia: </label>
            <select value={type} onChange={changeTypeHandler}>
                <option value="">Wybierz urządzenie</option>
                <option value="Refrigerator">Lodówka</option>
                <option value="Light">Światło</option>
                <option value="WashingMachine">Pralka</option>
                <option value="Dishwasher">Zmywarka</option>
                <option value="TV">Telewizor</option>
                <option value="Shower">Prysznic</option>
                <option value="Bed">Łóżka</option>
            </select>
            <br />
            <label>On/OFF: </label>
            <select value={isActive} onChange={changeIsActiveHandler}>
                <option value="">Wybierz urządzenie</option>
                <option value="True">Włącz</option>
                <option value="False">Wyłącz</option>
            </select>
            <br />
            <button onClick={() => editDevice()}>Zapisz</button>
        </div>

    );
}

export default EditDevice;