import React, {Component} from 'react';

class MyTable extends Component {
    state = {
        usersList: [],
        showingUsers: false
    };

    showUsersHandler = async () => {
        if (!this.state.showingUsers){
            const response = await fetch('/api/users', {
                method: 'GET'
            });
            const body = await response.json();
            if (response.status !== 200){
                throw Error(body.message);
            } else {
                const usersLst = [];
                for (const user in body){
                    usersLst.push(body[user]);
                }
                this.setState({usersList: usersLst});
            }
            console.log(this.state.usersList);
        }
        this.setState({showingUsers: !this.state.showingUsers});
    }

    render() {
        let usersTable = null;

        if (this.state.showingUsers) {
            usersTable = (
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                    </tr>
                    {this.state.usersList.map(user => {
                        return (
                            <tr>
                                <th>{user.name}</th>
                                <th>{user.age}</th>
                            </tr>
                        );
                    })}
                </table>
            );
        } else {
            usersTable = null;
        }

        return (
            <div className="MyTable">
                <button onClick={this.showUsersHandler}>
                    {this.state.showingUsers ? "Esconder Usuários" : "Mostrar Usuários"}
                </button>
                <br />
                <br />
                {usersTable}
            </div>
        );
    }
}

export default MyTable;