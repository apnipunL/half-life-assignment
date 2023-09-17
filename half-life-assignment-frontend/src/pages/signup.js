import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTextArea} from 'mdb-react-ui-kit';
import Header from "../components/header";

class Signup extends Component{
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
                        <MDBInput className='mb-4 w-100' type='name' id='name' label='Full Name' />
                        <MDBInput className='mb-4 w-100' type='email' id='email' label='Email Address' />
                        <MDBTextArea className='mb-4 w-100' type='address' id='address' label='Address' />
                        <MDBInput className='mb-4 w-100' type='password' id='password' label='Password' />
                        <MDBInput className='mb-4 w-100' type='confirmPassword' id='confirmPassword' label='Confirm Password' />

                        <MDBBtn type='submit' block>
                            Sign in
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
