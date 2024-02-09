import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './App.css';  

const OverlayComponent = () => {
    const [overlays, setOverlays] = useState([]);
    const [newOverlay, setNewOverlay] = useState({
        position: { top: 0, left: 0 },
        size: { width: 0, height: 0 },
        content: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOverlay, setEditingOverlay] = useState(null);
    const [updatedOverlay, setUpdatedOverlay] = useState({
        position: { top: 0, left: 0 },
        size: { width: 0, height: 0 },
        content: ''
    });

    useEffect(() => {
        fetchOverlays();
    }, []);

    const fetchOverlays = async () => {
        try {
            const response = await axios.get('http://localhost:5000/overlays');
            setOverlays(response.data);
        } catch (error) {
            console.error('Error fetching overlays:', error);
        }
    };

    const createOverlay = async () => {
        try {
            const response = await axios.post('http://localhost:5000/overlays', newOverlay);
            const createdOverlay = response.data;
            setOverlays(prevOverlays => [...prevOverlays, createdOverlay]);
            setNewOverlay({
                position: { top: 0, left: 0 },
                size: { width: 0, height: 0 },
                content: ''
            });
        } catch (error) {
            console.error('Error creating overlay:', error);
        }
    };

    const deleteOverlay = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/overlays/${id}`);
            setOverlays(prevOverlays => prevOverlays.filter(overlay => overlay._id !== id));
        } catch (error) {
            console.error('Error deleting overlay:', error);
        }
    };

    const openModal = (overlay) => {
        setEditingOverlay(overlay);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingOverlay(null);
    };

    const saveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/overlays/${editingOverlay._id}`, updatedOverlay);
            fetchOverlays(); // Refresh overlays after update
            closeModal(); // Close the modal
        } catch (error) {
            console.error('Error updating overlay:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOverlay({ ...updatedOverlay, [name]: value });
    };

    return (
        <div>
            <div>
                <h3>Existing Overlays :</h3>
                <ul>
                    {overlays.map(overlay => (
                        <li key={overlay._id}>
                            {overlay.content}
                            <button onClick={() => deleteOverlay(overlay._id)} style={{ margin: '16px' }}>Delete</button>
                            <button onClick={() => openModal(overlay)}>Edit</button>

                            
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <Popup trigger=
                    {<button> Create New Overlay </button>}
                    modal nested>
                    {
                        close => (
                            <div className="popup-container">
                                <span className="close" onClick=
                                    {() => close()}>&times;</span>
                                    <br />
                                <label>Content :</label>
                                <input
                                    style={{ margin: '16px', height: '20px' }}
                                    type="text"
                                    placeholder="Input text/logos"
                                    value={newOverlay.content}
                                    onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
                                />
                                <br />
                                <label>Top :</label>
                                <input
                                    type="number"
                                    style={{ margin: '5px', height: '20px', width: '50px' }}
                                    value={newOverlay.position.top || 0}
                                    onChange={(e) => setNewOverlay({ ...newOverlay, position: { ...newOverlay.position, top: e.target.value } })}
                                />
                                <label>Left :</label>
                                <input
                                    style={{ margin: '5px', height: '20px', width: '50px' }}
                                    type="number"
                                    value={newOverlay.position.left || 0}
                                    onChange={(e) => setNewOverlay({ ...newOverlay, position: { ...newOverlay.position, left: e.target.value } })}
                                />
                                <br />
                                <label>Width :</label>
                                <input
                                    style={{ margin: '5px', height: '20px', width: '50px' }}
                                    type="number"
                                    value={newOverlay.size.width || 0}
                                    onChange={(e) => setNewOverlay({ ...newOverlay, size: { ...newOverlay.size, width: e.target.value } })}
                                />
                                <label>Height :</label>
                                <input
                                    style={{ margin: '5px', height: '20px', width: '50px' }}
                                    type="number"
                                    value={newOverlay.size.height || 0}
                                    onChange={(e) => setNewOverlay({ ...newOverlay, size: { ...newOverlay.size, height: e.target.value } })}
                                />
                                <br />

                                <button onClick={createOverlay}>Create Overlay</button>
                            </div>
                        )
                    }
                </Popup>
            </div>

            {/* Modal for editing overlays */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                       <br />
                        <label>Content: </label>
                        <input
                        style={{ margin: '16px', height: '20px' }}
                            type="text"
                            name="content"
                            value={updatedOverlay.content}
                            onChange={handleInputChange}
                        />
                        <br />
                        <label>Top: </label>
                        <input
                        style={{ margin: '5px', height: '20px', width: '50px' }}
                            type="number"
                            name="top"
                            value={updatedOverlay.position.top}
                            onChange={handleInputChange}
                        /> 
                        <label>Left: </label>
                        <input
                        style={{ margin: '5px', height: '20px', width: '50px' }}
                            type="number"
                            name="left"
                            value={updatedOverlay.position.left}
                            onChange={handleInputChange}
                        />
                        <br />
                        <label>Width: </label>
                        <input
                        style={{ margin: '5px', height: '20px', width: '50px' }}
                            type="number"
                            name="width"
                            value={updatedOverlay.size.width}
                            onChange={handleInputChange}
                        /> 
                        <label>Height: </label>
                        <input
                        style={{ margin: '5px', height: '20px', width: '50px' }}
                            type="number"
                            name="height"
                            value={updatedOverlay.size.height}
                            onChange={handleInputChange}
                        />
                        <br />
                        <button onClick={saveChanges}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default OverlayComponent;