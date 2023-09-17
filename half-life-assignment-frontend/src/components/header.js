import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler
} from 'mdb-react-ui-kit';

export default function Header() {
    const [showNavColor, setShowNavColor] = useState(false);

    return (
        <>
            <MDBNavbar style={{zIndex: '9999'}} expand='lg' dark bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Half Life Courier Service App</MDBNavbarBrand>
                    <MDBCollapse show={showNavColor} navbar>
                        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBBtn type='button'>
                                Logout
                            </MDBBtn>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}
