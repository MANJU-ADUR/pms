import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import axios from 'axios';
import '../CSS/Goals.css'; // Import your CSS file for styling
import Login from '../../Landing_Components/Pages/Login';

const Goals = () => {
    const employee = JSON.parse(localStorage.getItem('Employee'));

    // Conditional rendering for login if employee data is not present
    // if (!employee || !employee.firstname || !employee.lastname) {
    //     return (
    //         <div className="emp_navbar">
    //             <Login />
    //         </div>
    //     );
    // }

    // Initialize states for goals, loading, and error
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true); // Initially set loading to true
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define async function to fetch goals
        const fetchGoals = async () => {
            try {
                // Fetch goals based on employee id
                const response = await axios.get(`http://localhost:7410/goals/goals-by-employee/${employee.id}`);
                console.log(response.data);

                // Handle successful response
                if (response.data.statuscode === 200) {
                    // Normalize the status field of goals
                    const normalizedGoals = response.data.data.map(goal => ({
                        ...goal,
                        status: goal.status.trim().toLowerCase() // Trim and convert to lowercase
                    }));

                    // Set goals and handle empty goals case
                    setGoals(normalizedGoals);
                    if (normalizedGoals.length === 0) {
                        setError("No goals set by the employee.");
                    } else {
                        setError(null);
                    }
                    // message.success(response.data.message); // Uncomment if needed
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching goals:', error);
                setError('Failed to show goals. Please try again later.');
            } finally {
                // Clear loading state after 5 seconds
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 0);

                // Cleanup function to clear timer on component unmount
                return () => clearTimeout(timer);
            }
        };

        // Call fetchGoals function if employee id is present
        if (employee.id) {
            fetchGoals();
        }
    }, [employee.id]); // Dependency array to watch changes in employee id

    // Render goals based on loading, error, and goals state
    return (
        <div className="goalsdiv">
            <h1>Goals</h1>
            <div className="goals">
                {loading ? (
                    <Spin size="large" />
                ) : error ? (
                    <div className="error-message-container">
                        <p className="error-message">{error}</p>
                    </div>
                ) : (
                    <div className="goal-cards-container">
                        {goals.length > 0 ? (
                            goals.map(goal => (
                                <div key={goal.id} className={`goal-card ${goal.status}`}>
                                    <h3>{goal.title}</h3>
                                    <p><strong>Start Date:</strong> {goal.startdate}</p>
                                    <p><strong>End Date:</strong> {goal.enddate}</p>
                                    <p><strong>Status:</strong> {goal.status}</p>
                                </div>
                            ))
                        ) : (
                            <p>No goals found for the employee.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Goals;
