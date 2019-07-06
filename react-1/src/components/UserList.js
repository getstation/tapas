import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import User from './User.js'

export class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
        }
    }

    // get data
    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then(   
            (res) => {
                // add click attribute to expand user
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i]["clicked"] = false;
                };
                this.setState({ users: res.data, isLoading: false });
            },
            (error) => { throw error; }
        );
    }

    moveCard = (dragIndex, dropIndex) => {
        // store selected user
        var dragUser = this.state.users[dragIndex];
        var usersTmp = this.state.users;
        // remove selected user from array
        usersTmp.splice(dragIndex, 1);
        // add selected user to the new index
        usersTmp.splice(dropIndex, 0, dragUser);
        this.setState({ users: usersTmp });
    }

    // manage expand user
    onClickUser = (index) => {
        const {users} = this.state;
        users[index].clicked = !users[index].clicked;
        this.setState({ users });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <Loader
                        type="Oval"
                        color="#347ed0"
                        height="60"
                        width="60"
                    />
                </div>
            );
        }

        return (
            <div>
                {
                    this.state.users.map((user, idx) => (
                        <User clicked={user.clicked} userInfo={user} onClickUser={this.onClickUser} moveCard={this.moveCard} key={user.id} id={user.id} index={idx} />
                ))}
            </div>
        )
    }
}

export default UserList;