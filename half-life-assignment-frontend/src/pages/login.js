import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import Header from "../components/header";
import {isValidEmail} from "../util/validator-util";
import {showErrorAlert} from "../util/alert-util";
import axiosInstance from "../interceptor/axios-instance";
import {setLoggedUserAccessToken, setLoggedUserId} from "../util/local-storage-util";

class Login extends Component{

    state = {
        email: '',
        password: ''
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    validateForm = () => {
        if(!this.state.email?.trim() || !isValidEmail(this.state.email)) {
            showErrorAlert('Please enter a valid email');
            return false;
        }
        if(!this.state.password) {
            showErrorAlert('Please enter your password');
            return false;
        }
        return true;
    }

    onLogin = () => {
        if (!this.validateForm()) return;
        axiosInstance.post('/api/v1/users/login',{
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            setLoggedUserAccessToken(res.data?.accessToken);
            setLoggedUserId(res.data?.user?.id);
            window.location.href = window.origin + '/#/'
        }).catch(err => {
            showErrorAlert((err?.response?.data?.message));
        });
    }

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
                        <MDBInput className='mb-4 w-100' type='email' id='email' label='Email address' onChange={this.handleInputChange} value={this.state.email}/>
                        <MDBInput className='mb-4 w-100' type='password' id='password' label='Password' onChange={this.handleInputChange} value={this.state.password}/>

                        <MDBBtn type='button' block onClick={this.onLogin}>
                            Sign in
                        </MDBBtn>

                        <MDBRow className='mt-4'>
                            <MDBCol>
                                <Link to='/signup'>Don't have an account? Sign Up</Link>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </div>
            </>
        )
    }
}

export default Login;
