



import React, { useRef,useState } from 'react';
import '../Vmupdate.css';

export default function Vmasterupdate({ vm, onClose, onUpdate }) {

    const [vmdata, setvmdata] = useState({
        model: vm.model || '',
        type: vm.type || '',
        capacity_seats: vm.capacity_seats || '',
        capacity_tons: vm.capacity_tons ||  '',
        image: null 
    });

    const model = useRef()
    const type = useRef()
    const image = useRef()
    const capacity_seats = useRef()
    const capacity_tons = useRef()
   
    const handleInputChange = () => {
        setvmdata({
            ...vmdata,
            model : model.current.value ,
            type : type.current.value ,
            capacity_seats :  capacity_seats.current.value ,
            capacity_tons : capacity_tons.current.value ,
            image : image.current.files[0]   
        });
    };
    const handleSubmit =  (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append('model', model.current.value);
        updatedData.append('type', type.current.value);
        updatedData.append('capacity_seats', capacity_seats.current.value);
        updatedData.append('capacity_tons', capacity_tons.current.value);
        updatedData.append('image', image.current.files[0]);
        onUpdate(vm.id, updatedData); 
    };

    return (
        <div className="popup3">
            <div className="popup-inner3">
                <h3 className="popup-title3">Edit Vehicle Details</h3>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Model</label>
                        <input
                            type="text"
                            name="model"
                            value={vmdata.model}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter vehicle model"
                            ref={model}
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select
                            name="type"
                            value={vmdata.type}
                            onChange={handleInputChange}
                            className="form-control"
                            ref={type}
                        >
                            <option value="">Select vehicle type</option>
                            <option value="SUV">SUV</option>
                            <option value="Rental">Rental</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Capacity Seats</label>
                        <input
                            type="number"
                            name="capacity_seats"
                            value={vmdata.capacity_seats}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter seating capacity"
                            ref={capacity_seats}
                        />
                    </div>

                    <div className="form-group">
                        <label>Capacity Tons</label>
                        <input
                            type="number"
                            name="capacity_tons"
                            value={vmdata.capacity_tons}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter load capacity in tons"
                            ref={capacity_tons}
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload New Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            className="form-control"
                            ref={image}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
