import React, {useState} from 'react';
import {
    MDBBadge,
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import Header from "../components/header";

function Dashboard (){
    const [createModal, setCreateModal] = useState(false);
    const createBtnClick = () => setCreateModal(!createModal);
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
            </div>
            <div className='m-5' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Sender</th>
                            <th scope='col'>Recipient</th>
                            <th scope='col'>Shipment Description</th>
                            <th scope='col'>Shipment Status</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='fw-bold mb-1'>John Doe</p>
                                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='fw-bold mb-1'>John Doe</p>
                                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Software engineer</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    Active
                                </MDBBadge>
                            </td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                                <MDBBtn color='link' rounded size='sm'>
                                    Track Shipment
                                </MDBBtn>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>

            {/*Create Shipment Modal*/}
            <MDBModal show={createModal} setShow={setCreateModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Create Shipment</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={createBtnClick}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <MDBInput className='mb-4 w-100' type='sName' id='sName' label='Sender Name' />
                                <MDBTextArea className='mb-4 w-100' type='sAddress' id='sAddress' label='Sender Address' />
                                <MDBInput className='mb-4 w-100' type='rName' id='rName' label='Recipient Name' />
                                <MDBTextArea className='mb-4 w-100' type='rAddress' id='rAddress' label='Recipient Address' />
                                <MDBTextArea className='mb-4 w-100' type='description' id='description' label='Shipment Description' />
                            </form>
                        </MDBModalBody>
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
