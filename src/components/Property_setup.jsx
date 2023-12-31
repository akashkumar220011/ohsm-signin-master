import { useState } from "react";
import './Property_setup.css';
import { baseUrl } from "../config";
import axios from "axios";
import { Modal } from "react-overlays";

const PropertySetup = () => {
    const [busiInfo, setBusiInfo] = useState(true);
    const [formData, setFormData] = useState({
        propertyType: "",
        propertyName: "",
        phoneNumber: "",
        email: "",
        address: "",
        states: "",
        city: "",
        pincode: "",
        logo: "",
        inventory: []
    });
    const [invForm, setInvForm] = useState({
        propertySpaceName: "",
        propertyInventoryType: "",
        otherPropertyType: "",
        capacity: "",
        amenities: "",
        availabilityStatus: "",
        notes: "",
    })



    const handleInputChange = (e) => {
        const { name, value } = e.target;
       
        if(showModal){
            setInvForm((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            console.log("inventory", invForm);
        }
        else{
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleLogoChange = (e) => {
        const logoFile = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            logo: logoFile,
        }));
    };


    // React state to control Modal Visibility
    const [showModal, setShowModal] = useState(false);



    const propertyTypes = ["Residential", "Commercial", "Industrial"]; //  array of property types
    const states = ["Uttrakhand", "Delhi", "Maharashtra"]; //  array of states
    const cities = {
        Uttrakhand: ["Dehradun", "Haridwar", "Rishikesh"],
        Delhi: ["New Delhi", "Old Delhi"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("logo", formData.logo);
    
            // Append other form data
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "logo") {
                    formDataToSend.append(key, value);
                }
            });
    
            console.log('FormData to be sent:', formData);
    
            // Use formDataToSend instead of formData in the axios post request
            const response = await axios.post(`${baseUrl}/property-setup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                console.log('Data sent successfully');
            } else {
                // Handle error
                console.error('Failed to send data to the backend');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const renderBackdrop = (props) => <div className="backdrop" {...props} />;

    const handleClose = () => setShowModal(false);
    const handleInventoryData = (e) => {
        e.preventDefault();
          // Create a copy of the current inventory array
    const updatedInventory = [...formData.inventory];

    // Add the new inventory data to the copy
    updatedInventory.push(invForm);

    // Update the state with the new inventory array
    setFormData((prevData) => ({
        ...prevData,
        inventory: updatedInventory,
    }));
       
        setShowModal(false);

        // Reset the invForm state for the next entry
        setInvForm({
            propertySpaceName: "",
            propertyInventoryType: "",
            otherPropertyType: "",
            capacity: "",
            amenities: "",
            availabilityStatus: "",
            notes: "",
        });
        console.log("this is my data",formData);
    }
    return (
        <div className="property-setup-container">

            <h2>Property Setup</h2>

            <div className="logo-uploader">
                {/* Logo Icon */}
                <span>Logo Icon</span>
                <span>Display Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>

            <form className="property-setup-form">
                <div className="business-info-container">
                    <div className="busines-info-header" onClick={() => { setBusiInfo(!busiInfo) }} >
                        <span>
                            Business Information
                        </span>
                        <span>
                            click me
                        </span>
                    </div>
                    {
                        busiInfo && (
                            <div className="business-info-form">
                                <div className="business-info-form-field">
                                    <label htmlFor="">Property Type</label>
                                    <select
                                        name="propertyType"
                                        id="propertyType"
                                        onChange={handleInputChange}
                                        // value={formData.propertyType}
                                    >
                                        <option value="">Select Property Type</option>
                                        {propertyTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Property Name</label>
                                    <input type="text" name="propertyName" placeholder="Property Name" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="number" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Address</label>
                                    <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">State</label>
                                    <select
                                        name="states"
                                        id="state"
                                        onChange={handleInputChange}
                                        // value={formData.state}
                                    >
                                        <option value="">Select State</option>
                                        {states.map((states) => (
                                            <option key={states} value={states}>
                                                {states}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="business-info-form-field">
                                <label htmlFor="">City</label>
                                <select
                                    name="city"
                                    id="city"
                                    onChange={handleInputChange}
                                    // value={formData.city}  // Include the value prop if you want to control the state of the select element
                                >
                                    <option value="">Select City</option>
                                    
                                    {formData.states && cities[formData.states]?.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                
                            </div>
                            
                            

                                <div className="business-info-form-field">
                                    <label htmlFor="">Pincode</label>
                                    <input type="number" name="pincode" placeholder="e.g. 220011" onChange={handleInputChange} />
                                </div>

                            </div>
                        )
                    }

                </div>

                <div className="add-inventory-cont" >
                    <div className="add-inven-icon" onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <span>Add Inventory</span>
                    <Modal className="modal" show={showModal} onHide={handleClose} renderBackdrop={renderBackdrop}>
                        <div className="inventory-container">
                            <h2 className="inventory-heading">Inventory</h2>
                            <form className="inventory-form" onSubmit={handleInventoryData}>
                                <div className="input-field">
                                    <label htmlFor="">Property Space Name</label>
                                    <input type="text" name="propertySpaceName" placeholder="Dormitory - 201" required onChange={handleInputChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Property Inventory Type</label>
                                    <select id="propertyInventoryType" name="propertyInventoryType" onChange={handleInputChange} required>
                                        <option value="" disabled selected>Select an option</option>
                                        <option value="Dormitory-201">Dormitory - 201</option>
                                        <option value="AnotherOption">Other</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Other Property Inventory Type</label>
                                    <input type="text" name="otherPropertyType" placeholder="Add Property Inventory Type" onChange={handleInputChange} required />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Capacity</label>
                                    <input type="text" name="capacity" placeholder="Number of occupants" onChange={handleInputChange} required />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Amenities</label>
                                    <input type="text" name="amenities" placeholder="Available amenities" onChange={handleInputChange} required />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="availabilityStatus">Availability Status</label>
                                    <select id="availabilityStatus" name="availabilityStatus" onChange={handleInputChange} required>
                                        <option value="" disabled selected>Select an option</option>
                                        <option value="Dormitory-201">Active</option>
                                        <option value="AnotherOption">Other</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Notes (if any)</label>
                                    <input type="text" name="notes" placeholder="Add notes if any..." onChange={handleInputChange} required />
                                </div>
                                <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                                <button className="save-btn" type="submit">Save</button>

                            </form>
                        </div>

                    </Modal>
                </div>


                <button className="business-info-btn" onClick={handleFormSubmit} >Complete your setup</button>
            </form>
        </div>
    )
}

export default PropertySetup;