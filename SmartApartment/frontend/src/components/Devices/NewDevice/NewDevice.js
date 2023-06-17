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
                <label>Nazwa: </label>
                <input type="text"
                    value={deviceName}
                    onChange={changeDeviceNameHandler} />
                <label>Pokój: </label>
                <select value={room} onChange={changeRoomHandler}>
                    <option value="">Wybierz pomieszczenie</option>
                    <option value="Kuchnia">Kuchnia</option>
                    <option value="Sypialnia">Sypialnia</option>
                    <option value="Gościny">Gościny</option>
                    <option value="Łazienka">Łazienka</option>
                </select>

                <label> Rodzaj urządzenia: </label>
                <select value={type} onChange={changeTypeHandler}>
                    <option value="">Wybierz urządzenie</option>
                    <option value="Lodówka">Lodówka</option>
                    <option value="Swiatło">Światło</option>
                    <option value="Pralka">Pralka</option>
                    <option value="Zmywarka">Zmywarka</option>
                    <option value="Telewizor">Telewizor</option>
                    <option value="Prysznic">Prysznic</option>
                    <option value="lozko">Łóżka</option>
                </select>

                <label> On/OFF: </label>
                <select value={isActive} onChange={changeIsActiveHandler}>
                    <option value="">Włącz/Wyłącz</option>
                    <option value="True">Włącz</option>
                    <option value="False">Wyłącz</option>
                </select>


                <button onClick={() => addDevice()}>Dodaj urządzenie</button>
            </div>
        ) : (
            <button onClick={() => { setShowForm(true) }}>Nowe urządzenie</button>
        )
    );
}

export default NewDevice