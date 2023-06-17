import React from "react";
import './Devices.css'
import Device from "./Device/Device";
import NewDevice from "./NewDevice/NewDevice";
import Modal from 'react-modal';
import EditDevice from "./EditDevice/EditDevice";
import axios from "axios";
import { decodeToken } from 'react-jwt';

const token = localStorage.getItem('token');
const User = token ? decodeToken(token) : null;

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/api/login'
};
const AdminPanel = () => {
    window.location.href = '/api/admin'
};
class Devices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],

            showEditModal: false,
            editDevice: {}
        };
    }

    componentDidMount() {
        this.fechDevics();
    }

    async fechDevics() {
        const res = await axios.get('http://localhost:3001/api/devices')
        const devices = res.data.filter(x => x.userEmail === User.email)
        this.setState({ devices });
    }

    async deleteDevice(_id) {
        const devices = [...this.state.devices].filter(device => device._id !== _id);
        await axios.delete('http://localhost:3001/api/devices/' + _id)
        this.setState({ devices });
    }

    async addDevice(device) {
        const devices = [...this.state.devices];
        console.log(device)
        try {
            if (device.room !== "" && device.name !== "" && device.type !== "" && device.isActive !== "") {
                const res = await axios.post('http://localhost:3001/api/devices', device)
                const newDevice = res.data;
                devices.push(newDevice);
                this.setState({ devices });
            } else {
                alert('Puste pola')
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }

    async editDevice(device) {

        if (device.room !== null && device.name !== null && device.type !== null && device.isActive !== null) {
            await axios.put('http://localhost:3001/api/devices/' + device._id, device)

            const devices = [...this.state.devices];
            const index = devices.findIndex(x => x._id === device._id)
            if (index >= 0) {
                devices[index] = device;
                this.setState({ devices });
            }
            this.toggleModal();
        } else {
            alert('Puste pola')
        }
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal });
    }

    editDeviceHandler(device) {
        this.toggleModal()
        this.setState({ editDevice: device })
    }

    render() {
        return (
            <div>
                <p> Urządzenia: </p>
                {User.isAdmin && <button onClick={() => AdminPanel()}>Panel Admina</button>}
                <button onClick={() => logout()}>Wyloguj</button><br />

                <NewDevice
                    onAdd={(device) => this.addDevice(device)} />


                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj urządzenie"
                    ariaHideApp={false}>
                    <EditDevice
                        _id={this.state.editDevice._id}
                        room={this.state.editDevice.room}
                        deviceName={this.state.editDevice.deviceName}
                        type={this.state.editDevice.type}
                        userEmail={this.state.editDevice.userEmail}
                        isActive={this.state.editDevice.isActive}
                        onEdit={device => this.editDevice(device)}
                    />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>

                {this.state.devices.map(device => (
                    <Device
                        key={device._id}
                        _id={device._id}
                        room={device.room}
                        deviceName={device.name}
                        type={device.type}
                        userEmail={device.userEmail}
                        isActive={device.isActive}
                        onEdit={(device) => this.editDeviceHandler(device)}
                        onDelete={(_id) => this.deleteDevice(_id)}
                    />
                ))}

            </div>
        );
    }
}

export default Devices;