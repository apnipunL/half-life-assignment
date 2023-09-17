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
import {getLoggedUserId} from "../util/local-storage-util";


const steps = [
    {
        label: 'Shipment Created',
        description: `You just create the shipment.`,
    },
    {
        label: 'Shipment Picked Up',
        description:
            'Shipment collected from the sender.',
    },
    {
        label: 'In Transit',
        description: `Your Shipment is on the way.`,
    },
    {
        label: 'Delivered',
        description: `Shipment has been dropped off at the final destination`,
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
    const [allShipments, setAllShipments] = useState([]);
    const [selectedShipmentId, setSelectedShipmentId] = useState(null);

    // on page load
    useEffect(() => {
        getAllShipments();
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
            shipmentDescription: description,
            userId: getLoggedUserId()
        }).then(res => {
            showSuccessAlert("Shipment created Successfully");
        }).catch(err => {
            showErrorAlert(err?.response?.data?.message);
        })
    };

    const getAllShipments = () => {
        axiosInstance.get('/api/v1/shipments/' + getLoggedUserId()).then(res => {
            setAllShipments(res.data);
        }).catch(err => {
            showErrorAlert(err?.response?.data?.message);
        })
    };

    const renderShipmentStatus = (status) => {
        switch (status) {
            case 'SHIPMENT_CREATED': return (
                <MDBBadge color='primary' pill>
                    Shipment Created
                </MDBBadge>);
            case 'SHIPMENT_PICKED_UP': return (
                <MDBBadge color='info' pill>
                    Shipment Picked Up
                </MDBBadge>);
            case 'IN_TRANSIT': return (
                <MDBBadge color='warning' pill>
                    In Transit
                </MDBBadge>);
            case 'DELIVERD': return (
                <MDBBadge color='success' pill>
                    Deliverd
                </MDBBadge>);

        }
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
                        {
                            allShipments.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <p className='fw-bold mb-1'>{value.senderName}</p>
                                                    <p className='text-muted mb-0'>{value.senderAddress}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <p className='fw-bold mb-1'>{value.recipientName}</p>
                                                    <p className='text-muted mb-0'>{value.recipientAddress}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{value.shipmentDescription}</p>
                                        </td>
                                        <td>
                                            {
                                                renderShipmentStatus(value.shipmentStatus)
                                            }
                                        </td>
                                        <td>
                                            <MDBBtn color='link' rounded size='sm'>
                                                Edit
                                            </MDBBtn>
                                            <MDBBtn color='link' rounded size='sm'
                                                    onClick={() => {
                                                        setSelectedShipmentId(value.id);
                                                        switch (value.shipmentStatus) {
                                                            case 'SHIPMENT_CREATED': setActiveStep(0); break;
                                                            case 'SHIPMENT_PICKED_UP': setActiveStep(1); break;
                                                            case 'IN_TRANSIT': setActiveStep(2); break;
                                                            case 'DELIVERD': setActiveStep(3); break;
                                                        }
                                                        toggleTrackModal()
                                                    }}>
                                                Track Shipment
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                )
                            })
                        }
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
