import React, {useEffect, useState} from 'react';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';


const steps = [
    {
        label: 'Shipment Created',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Shipment Picked Up',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'In Transit',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        label: 'Delivered',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    }
];


function Dashboard (){

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [trackModal, setTrackModal] = useState(false);
    const [activeStep, setActiveStep] = React.useState(3);

    // on page load
    useEffect(() => {
        console.log("loadDataOnlyOnce");
    }, []);

    // on create modal close
    useEffect((val) => {
        if (createModal === false) {
            // code
        }
    }, [createModal]);

    const toggleCreateShipmentModal = () => setCreateModal(!createModal);
    const toggleTrackModal = () => setTrackModal(!trackModal);

    return (
        <>
            <Header/>
            <div className='m-5' style={{
                display: "flex",
                justifyContent: 'right',
            }}>
                <MDBBtn style={{marginRight: '20px'}} type='button' onClick={toggleCreateShipmentModal}>
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
                                <MDBBtn color='link' rounded size='sm' onClick={toggleTrackModal}>
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
                            <MDBBtn className='btn-close' color='none' onClick={toggleCreateShipmentModal}></MDBBtn>
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
                            <MDBBtn color='secondary' onClick={toggleCreateShipmentModal}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/*Track Shipment Modal*/}
            <MDBModal show={trackModal} setShow={setTrackModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Track Shipment</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleTrackModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel>{step.label}</StepLabel>
                                        <StepContent>
                                            <Typography>{step.description}</Typography>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleTrackModal}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default Dashboard;
