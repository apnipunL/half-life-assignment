import React, {useState} from 'react';
import {MDBBtn, MDBCollapse, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav} from 'mdb-react-ui-kit';

export default function Header() {
    const [showNavColor] = useState(false);

    return (
        <>
            <MDBNavbar style={{zIndex: '99'}} expand='lg' dark bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Half Life Courier Service App</MDBNavbarBrand>
                    <MDBCollapse show={showNavColor} navbar>
                        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBBtn type='button' onClick={() => {
                                localStorage.clear();
                                window.location.href = window.origin;
                            }}>
                                Logout
                            </MDBBtn>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}
