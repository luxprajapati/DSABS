// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setAvailabilitySlot } from '../../services/operations/userAPI';


// export const Slots = () => {
//     const { user } = useSelector((state) => state.profile);
//     const {token} = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const [showUpcoming, setShowUpcoming] = useState(false);
//     const [slotData, setSlotData] = useState({
//         day: '',
//         startTime: '',
//         endTime: ''
//     });

//     console.log("user in Slots--", user);

//     const handleFilterUpcoming = () => {
//         setShowUpcoming(!showUpcoming);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSlotData({
//             ...slotData,
//             [name]: value
//         });
//     };

//     const handleCreateSlot = (e) => {
//         e.preventDefault();
//         dispatch(setAvailabilitySlot(token ,slotData));
//         setSlotData({
//             day: '',
//             startTime: '',
//             endTime: ''
//         });
//     };

//     const filteredSlots = showUpcoming
//         ? user.additionalDetails.availabilitySlot.filter(slot => new Date(slot.day) >= new Date())
//         : user.additionalDetails.availabilitySlot;

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//             <section className="bg-white shadow-lg rounded-lg p-8 m-4 w-full lg:w-3/4">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold">Available Slots</h2>
//                     <button
//                         onClick={handleFilterUpcoming}
//                         className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                         {showUpcoming ? "Show All Slots" : "Show Upcoming Slots"}
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap justify-evenly">
//                     {filteredSlots.map((slot, index) => (
//                         <div key={index} className="border border-gray-300 rounded-lg p-4 m-2 bg-gray-50 w-64">
//                             <p className="text-left"><strong>Date:</strong> {new Date(slot.day).toLocaleDateString()}</p>
//                             <p className="text-left"><strong>Start Time:</strong> {new Date(slot.startTime).toLocaleTimeString()}</p>
//                             <p className="text-left"><strong>End Time:</strong> {new Date(slot.endTime).toLocaleTimeString()}</p>
//                             <p className="text-left"><strong>Booked:</strong> {slot.booked ? "Yes" : "No"}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section className="bg-white shadow-lg rounded-lg p-8 m-4 w-full lg:w-3/4">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Create New Slot</h2>
//                 <form onSubmit={handleCreateSlot} className="space-y-4">
//                     <div className="flex flex-col">
//                         <label htmlFor="day" className="text-left font-semibold">Date</label>
//                         <input
//                             type="date"
//                             name="day"
//                             value={slotData.day}
//                             onChange={handleInputChange}
//                             className="border-2 border-gray-200 rounded-md p-2"
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col">
//                         <label htmlFor="startTime" className="text-left font-semibold">Start Time</label>
//                         <input
//                             type="time"
//                             name="startTime"
//                             value={slotData.startTime}
//                             onChange={handleInputChange}
//                             className="border-2 border-gray-200 rounded-md p-2"
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col">
//                         <label htmlFor="endTime" className="text-left font-semibold">End Time</label>
//                         <input
//                             type="time"
//                             name="endTime"
//                             value={slotData.endTime}
//                             onChange={handleInputChange}
//                             className="border-2 border-gray-200 rounded-md p-2"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Create Slot</button>
//                 </form>
//             </section>
//         </div>
//     )
// }



import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAvailabilitySlot } from '../../services/operations/userAPI';

export const Slots = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [slotData, setSlotData] = useState({
        day: '',
        startTime: '',
        endTime: ''
    });

    // console.log("user in Slots--", user);

    const handleFilterUpcoming = () => {
        setShowUpcoming(!showUpcoming);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSlotData({
            ...slotData,
            [name]: value
        });
    };

    const handleCreateSlot = (e) => {
        e.preventDefault();
        const { day, startTime, endTime } = slotData;
        const startDateTime = new Date(`${day}T${startTime}:00.000Z`).toISOString();
        const endDateTime = new Date(`${day}T${endTime}:00.000Z`).toISOString();
        const formattedSlotData = {
            day: new Date(day).toISOString(),
            startTime: startDateTime,
            endTime: endDateTime
        };
        dispatch(setAvailabilitySlot(token, formattedSlotData));
        setSlotData({
            day: '',
            startTime: '',
            endTime: ''
        });
    };

    const filteredSlots = showUpcoming
        ? user.additionalDetails.availabilitySlot.filter(slot => new Date(slot.day) >= new Date())
        : user.additionalDetails.availabilitySlot;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <section className="bg-white shadow-lg rounded-lg p-8 m-4 w-full lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Available Slots</h2>
                    <button
                        onClick={handleFilterUpcoming}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        {showUpcoming ? "Show All Slots" : "Show Upcoming Slots"}
                    </button>
                </div>
                <div className="flex flex-wrap justify-evenly">
                    {filteredSlots.map((slot, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4 m-2 bg-gray-50 w-64">
                            <p className="text-left"><strong>Date:</strong> {new Date(slot.day).toLocaleDateString()}</p>
                            <p className="text-left"><strong>Start Time:</strong> {new Date(slot.startTime).toLocaleTimeString()}</p>
                            <p className="text-left"><strong>End Time:</strong> {new Date(slot.endTime).toLocaleTimeString()}</p>
                            <p className="text-left"><strong>Booked:</strong> {slot.booked ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-8 m-4 w-full lg:w-3/4">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Slot</h2>
                <form onSubmit={handleCreateSlot} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="day" className="text-left font-semibold">Date</label>
                        <input
                            type="date"
                            name="day"
                            value={slotData.day}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="startTime" className="text-left font-semibold">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={slotData.startTime}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="endTime" className="text-left font-semibold">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={slotData.endTime}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-md p-2"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Create Slot</button>
                </form>
            </section>
        </div>
    )
}