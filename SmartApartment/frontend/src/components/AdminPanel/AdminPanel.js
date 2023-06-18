import React from "react";
import './AdminPanel.css'
import User from "./User/User";
import Modal from 'react-modal';
import EditUser from "./EditUser/EditUser";
import axios from "axios";
import { decodeToken } from "react-jwt";

const token = localStorage.getItem('token');
const UserAdmin = token ? decodeToken(token) : null;

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/api/login'
};

const device = () => {
    window.location.href = '/api/devices'
};


class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],

            showEditModal: false,
            editUser: {}
        };
    }

    componentDidMount() {
        this.fechUsers();
    }

    async fechUsers() {
        const res = await axios.get('http://localhost:3001/api/admin')
        const users = res.data.filter(x => x.email !== UserAdmin.email)
        this.setState({ users });

    }

    async deleteUser(_id) {
        const users = [...this.state.users].filter(user => user._id !== _id);
        await axios.delete('http://localhost:3001/api/admin/' + _id)
        this.setState({ users });
    }

    async editUser(user) {
        if (user.email !== null && user.password !== null && user.isAdmin !== "" && user.isActive !== "") {
            if (user.isAdmin === 'true') {
                user.isAdmin = true
            }
            if (user.isAdmin === 'false') {
                user.isAdmin = false
            }
            if (user.isActive === 'true') {
                user.isActive = true
            }
            if (user.isActive === 'false') {
                user.isActive = false
            }
            await axios.put('http://localhost:3001/api/admin/' + user._id, user)

            const users = [...this.state.users];
            const index = users.findIndex(x => x._id === user._id)
            if (index >= 0) {
                users[index] = user;
                this.setState({ users });
            }
            this.toggleModal();

        } else {
            alert('Empty fields')
        }
    }
    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal });
    }

    editUserHandler(user) {
        this.toggleModal()
        this.setState({ editUser: user })
    }

    render() {

        return (
            <div className="content">
                <h1> Administration </h1>
                <button className="panel" onClick={() => device()}>Devices</button>
                <button className="panel" onClick={() => logout()}>Logout</button>

                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edit user"
                    ariaHideApp={false}>
                    <EditUser
                        _id={this.state.editUser._id}
                        email={this.state.editUser.email}
                        password={this.state.editUser.password}
                        isAdmin={this.state.editUser.isAdmin}
                        isActive={this.state.editUser.isActive}
                        onEdit={user => this.editUser(user)}
                    />
                    <button className="editPanel" onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>


                {this.state.users.map(user => (
                    <User
                        key={user._id}
                        _id={user._id}
                        email={user.email}
                        password={user.password}
                        isAdmin={user.isAdmin}
                        isActive={user.isActive}
                        onEdit={(user) => this.editUserHandler(user)}
                        onDelete={(_id) => this.deleteUser(_id)}
                    />
                ))}

            </div>
        );
    }
}

export default AdminPanel;