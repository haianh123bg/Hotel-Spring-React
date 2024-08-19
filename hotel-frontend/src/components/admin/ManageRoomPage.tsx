import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Pagination } from '../common/Pagination';
import RoomResult from '../common/RoomResult';

interface Room {
    id: string;
    roomType: string;
    roomPrice: string;
    roomDescription: string;
    roomPhotoUrl: string;
}

const ManageRoomPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [roomTypes, setRoomTypes] = useState<string[]>([]);
    const [selectedRoomType, setSelectedRoomType] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [roomsPerPage] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();
                const allRooms = response.roomList as Room[];
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error: any) {
                console.error('Error fetching rooms:', error.message);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error: any) {
                console.error('Error fetching room types:', error.message);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    };

    const filterRooms = (type: string) => {
        if (type === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="all-rooms">
            <h2>All Rooms</h2>
            <div
                className="all-room-filter-div"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div className="filter-select-div">
                    <label>Filter by Room Type:</label>
                    <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                        <option value="">All</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <button className="add-room-button" onClick={() => navigate('/admin/add-room')}>
                        Add Room
                    </button>
                </div>
            </div>

            <RoomResult roomSearchResults={currentRooms} />

            <Pagination
                roomsPerPage={roomsPerPage}
                totalRooms={filteredRooms.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageRoomPage;
