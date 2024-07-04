import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import '../CSS/EmployeeNavbar.css';
import Login from '../../Landing_Components/Pages/Login';

const EmployeeNavbar = () => {
    const employee = JSON.parse(localStorage.getItem('Employee'));

    // Conditionally render based on user data
    if (!employee || !employee.firstname || !employee.lastname) {
        // Render a placeholder or redirect to login
        return (
            <div className="emp_navbar">
                <Login />
            </div>
        );
    }

    // User data is valid, construct username
    const employeeName = `${employee.firstname} ${employee.lastname}`;

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('Employee');
        // Redirect to login page or perform other actions after logout
        // Example: window.location.href = '/login';
    };

    return (
        <div className="emp_navbar">
            <div className="nav">
                <div className="logo">XYZ Technologies</div>
                <nav>
                    <Link to="/employee-dash/create">Create</Link>
                    <Link to="/employee-dash/my-goals">My Goals</Link>
                    <Link to="/employee-dash/goals-status">Goals Status</Link>
                </nav>
                <div className="username">
                    <CgProfile />
                    {employeeName} {/* Render the employee's name */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeNavbar;
