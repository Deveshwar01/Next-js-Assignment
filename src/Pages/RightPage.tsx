'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

// Define an interface for the structure of each prompt
interface Prompt {
    id: number;
    name: string;
    // Add any other properties of the prompt here
}

function RightPage() {
    // Define state variables to hold the fetched data and loading status
    const [data, setData] = useState<Prompt[]>([]); // Specify the type of data as Prompt[]
    const [isLoading, setLoading] = useState(true);

    // Fetch data from the API endpoint when the component mounts
    useEffect(() => {
        fetch('https://demo6396395.mockable.io/prompts')
            .then((res) => res.json())
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Render loading message while data is being fetched
    if (isLoading) return <p>Loading...</p>;

    // Render message if no prompts are available
    if (!data || data.length === 0) return <p>No prompts available</p>;

    // Render fetched prompts
    return (
        <div className='border p-5 grid grid-cols-1 md:grid-cols-6 gap-8 text-center bg-black text-white'>
            {data.map((prompt) => (
                // Render each prompt as a heading element
                <h1 className='border p-2' key={prompt.id}>
                    {prompt.name}
                </h1>
            ))}
        </div>
    );
}

export default RightPage;
