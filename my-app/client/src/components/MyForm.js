import React, {Component} from 'react';
import MyTable from './MyTable';

class MyForm extends Component {
    state = {
        username: '',
        age: ''
    };

    inputChangeHandler = (event) => {        
        this.setState({[event.target.name]: event.target.value});
    }

    formSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            age: this.state.age
        }
        if (data.age <= 18){
            alert("Idade deve ser maior que 18 anos!");
        } else {
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            alert("Formulário submetido!\nNome: " + data.username + " - Idade: " + data.age);
            this.setState({
                username: '',
                age: ''
            });
        }
    }

    render() {
        return (
            <div className="MyForm">
                <form onSubmit={this.formSubmitHandler}>
                <h1>Hello React!</h1>
                <p>Nome  </p>
                <input  type="text"
                        name="username"
                        onChange={this.inputChangeHandler}
                        value={this.state.username}
                        required />
                <p>Idade </p>
                <input  type="number"
                        min="0"
                        step="1"
                        name="age"
                        onChange={this.inputChangeHandler}
                        value={this.state.age}
                        required />
                <br />
                <input  type="submit" />
                </form>
                <br />
                <MyTable />
            </div>
        );
    }
}

export default MyForm;