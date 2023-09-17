import React, { useState } from 'react';
import {
    MDBBtn,
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import Header from "../components/header";

function Dashboard (){
    const [createModal, setCreateModal] = useState(false);
    const [trackModal, setTrackModal] = useState(false);
    const createBtnClick = () => setCreateModal(!createModal);
    const trackBtnClick = () => setTrackModal(!trackModal);
    return (
        <>
            <Header/>
            <div className='m-5' style={{
                display: "flex",
                justifyContent: 'right',
            }}>
                <MDBBtn style={{marginRight: '20px'}} type='button' onClick={createBtnClick}>
                    Create Shipment
                </MDBBtn>
                <MDBBtn type='button' onClick={trackBtnClick}>
                    Track Shipment
                </MDBBtn>
            </div>
            <div className='m-5' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Position</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>John Doe</p>
                                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Software engineer</p>
                                <p className='text-muted mb-0'>IT department</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    Active
                                </MDBBadge>
                            </td>
                            <td>Senior</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>Alex Ray</p>
                                        <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Consultant</p>
                                <p className='text-muted mb-0'>Finance</p>
                            </td>
                            <td>
                                <MDBBadge color='primary' pill>
                                    Onboarding
                                </MDBBadge>
                            </td>
                            <td>Junior</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>Kate Hunington</p>
                                        <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Designer</p>
                                <p className='text-muted mb-0'>UI/UX</p>
                            </td>
                            <td>
                                <MDBBadge color='warning' pill>
                                    Awaiting
                                </MDBBadge>
                            </td>
                            <td>Senior</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
            <MDBModal show={createModal} setShow={setCreateModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={createBtnClick}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>...</MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={createBtnClick}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default Dashboard;
