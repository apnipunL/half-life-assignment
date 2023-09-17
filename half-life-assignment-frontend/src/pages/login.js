import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import Header from "../components/header";

class Login extends Component{
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
                        <MDBInput className='mb-4 w-100' type='email' id='form1Example1' label='Email address' />
                        <MDBInput className='mb-4 w-100' type='password' id='form1Example2' label='Password' />

                        <MDBBtn type='submit' block>
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
