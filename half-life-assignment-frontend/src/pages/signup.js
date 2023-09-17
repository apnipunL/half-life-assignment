import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTextArea} from 'mdb-react-ui-kit';
import Header from "../components/header";
import axiosInstance from "../interceptor/axios-instance";
import {showErrorAlert} from "../util/alert-util";
import {isValidEmail, isValidPassword} from "../util/validator-util";

class Signup extends Component{

    state = {
        name: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    validateForm = () => {
        if(!this.state.name?.trim()) {
            showErrorAlert('Please enter your name');
            return false;
        }
        if(!this.state.email?.trim() || !isValidEmail(this.state.email)) {
            showErrorAlert('Please enter a valid email');
            return false;
        }
        if(!this.state.address?.trim()) {
            showErrorAlert('Please enter your address');
            return false;
        }
        if(!this.state.password) {
            showErrorAlert('Please enter your password');
            return false;
        }
        if(!isValidPassword(this.state.password)) {
            showErrorAlert('Please enter a valid password. Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and length more than 8 characters');
            return false;
        }
        if(!this.state.confirmPassword) {
            showErrorAlert('Please re-enter your password');
            return false;
        }
        if(this.state.password !== this.state.confirmPassword) {
            showErrorAlert('Password and confirm password does not match');
            return false;
        }
        return true;
    }

    onRegister = () => {
        if (!this.validateForm()) return;
        axiosInstance.post('/api/v1/users',{
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    };

    render() {
        return (
            <>
                <Header/>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    bottom: 0
                }}>
                    <form style={{minWidth: '50vw'}}>
                        <MDBInput className='mb-4 w-100' type='name' id='name' label='Full Name' onChange={this.handleInputChange} />
                        <MDBInput className='mb-4 w-100' type='email' id='email' label='Email Address' onChange={this.handleInputChange}/>
                        <MDBTextArea className='mb-4 w-100' type='address' id='address' label='Address' onChange={this.handleInputChange}/>
                        <MDBInput className='mb-4 w-100' type='password' id='password' label='Password' onChange={this.handleInputChange}/>
                        <MDBInput className='mb-4 w-100' type='password' id='confirmPassword' label='Confirm Password' onChange={this.handleInputChange}/>

                        <MDBBtn type='button' block onClick={this.onRegister}>
                            Register
                        </MDBBtn>

                        <MDBRow className='mt-4'>
                            <MDBCol>
                                <Link to='/login'>Already have an account? Login</Link>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </div>
            </>
        )
    }
}

export default Signup;
