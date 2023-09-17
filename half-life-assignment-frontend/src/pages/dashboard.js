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
import {showErrorAlert, showSuccessAlert} from "../util/alert-util";
import axiosInstance from "../interceptor/axios-instance";


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

    const [shipmentModal, setShipmentModal] = useState(false);
    const [shipmentModalMode, setShipmentModalMode] = useState(false);
    const [trackModal, setTrackModal] = useState(false);
    const [activeStep, setActiveStep] = React.useState(3);
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [description, setDescription] = useState('');

    // on page load
    useEffect(() => {
        console.log("loadDataOnlyOnce");
    }, []);

    // on create modal close
    useEffect((val) => {
        if (shipmentModal === false) {
            setSenderName('');
            setSenderAddress('');
            setRecipientName('');
            setRecipientAddress('');
            setDescription('');
        }
    }, [shipmentModal]);

    const toggleCreateShipmentModal = () => setShipmentModal(!shipmentModal);
    const toggleTrackModal = () => setTrackModal(!trackModal);

    const handleInputChange = event => {
        event.preventDefault();
        switch (event.target.id) {
            case 'senderName': setSenderName(event.target.value); break;
            case 'senderAddress': setSenderAddress(event.target.value); break;
            case 'recipientName': setRecipientName(event.target.value); break;
            case 'recipientAddress': setRecipientAddress(event.target.value); break;
            case 'description': setDescription(event.target.value); break;
        }
    }

    const validateForm = () => {
        if(!senderName?.trim()) {
            showErrorAlert('Please enter sender name');
            return false;
        }
        if(!senderAddress?.trim()) {
            showErrorAlert('Please enter sender address');
            return false;
        }
        if(!recipientName?.trim()) {
            showErrorAlert('Please enter recipient name');
            return false;
        }
        if(!recipientAddress?.trim()) {
            showErrorAlert('Please enter recipient address');
            return false;
        }
        if(!description?.trim()) {
            showErrorAlert('Please enter shipment description');
            return false;
        }
        return true;
    }

    const onCreateShipment = () => {
        if (!validateForm()) return;
        axiosInstance.post('/api/v1/shipments',{
            senderName: senderName,
            senderAddress: senderAddress,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            description: description
        }).then(res => {
            showSuccessAlert("Shipment created Successfully");
        }).catch(err => {
            console.log(err);
            showErrorAlert(err);
        })
    };

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

            {/*Shipment Modal*/}
            <MDBModal show={shipmentModal} setShow={setShipmentModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Create Shipment</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleCreateShipmentModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <MDBInput className='mb-4 w-100' type='text' id='senderName' label='Sender Name' onChange={handleInputChange} value={senderName}/>
                                <MDBTextArea className='mb-4 w-100' id='senderAddress' label='Sender Address' onChange={handleInputChange} value={senderAddress}/>
                                <MDBInput className='mb-4 w-100' type='text' id='recipientName' label='Recipient Name' onChange={handleInputChange} value={recipientName}/>
                                <MDBTextArea className='mb-4 w-100' id='recipientAddress' label='Recipient Address' onChange={handleInputChange} value={recipientAddress}/>
                                <MDBTextArea className='mb-4 w-100' id='description' label='Shipment Description' onChange={handleInputChange} value={description}/>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleCreateShipmentModal}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={onCreateShipment}>Save changes</MDBBtn>
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
