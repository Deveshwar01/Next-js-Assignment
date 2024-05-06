'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

// Define an interface for the structure of each board and its nested entities
interface Board {
    id: number;
    name: string;
    bcfs: {
        id: number;
        name: string;
        bcfBoards: {
            id: number;
            name: string;
        }[];
    }[];
}

function Profile() {
    // Define state variables to hold the fetched data and loading status
    const [data, setData] = useState<Board[]>([]); // Specify the type of data as Board[]
    const [isLoading, setLoading] = useState(true);

    // Fetch data from the API endpoint when the component mounts
    useEffect(() => {
        fetch('https://demo6396395.mockable.io/bcf-boards')
            .then((res) => res.json())
            .then((responseData) => {
                setData(responseData.boards || []); // Set fetched data to state
                setLoading(false); // Set loading status to false
            })
            .catch((error) => {
                console.error('Error fetching data:', error); // Log any errors
                setLoading(false); // Set loading status to false
            });
    }, []);

    // Render loading message while data is being fetched
    if (isLoading) return <p>Loading...</p>;

    // Render message if no profile data is available
    if (!data || data.length === 0) return <p>No profile data</p>;

    // Render fetched profile data
    return (
        <div>
            {data.map((board) => (
                // Render each board with its associated data
                <div key={board.id} className='board-container'>
                    <Button variant="outline" className='board-button bg-black text-white'>{board.name}</Button>
                    <ul className='bcf-list'>
                        {board.bcfs.map((bcf) => (
                            // Render each BCF with its associated data
                            <li key={bcf.id} className='bcf-item'>
                                <h2>{bcf.name}</h2>
                                <ul className='bcf-board-list'>
                                    {bcf.bcfBoards.map((bcfBoard) => (
                                        // Render each BCF board with its associated data
                                        <li key={bcfBoard.id} className='bcf-board-item'>
                                            {bcfBoard.name}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Profile;
