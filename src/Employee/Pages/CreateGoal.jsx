import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import '../CSS/CreateGoal.css'; // Adjust the path based on your actual file location
import Login from '../../Landing_Components/Pages/Login';

const { TextArea } = Input;

const CreateGoal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setStartDate] = useState(null);
    const [enddate, setEndDate] = useState(null);
    const [status, setStatus] = useState('Inprogess');

    const employee = JSON.parse(localStorage.getItem("Employee"))
    // console.log(employee.id);

    if (!employee || !employee.firstname || !employee.lastname) {
        // Render a placeholder or redirect to login
        return (
            <div className="emp_navbar">
                <Login />
            </div>
        );
    }
    const handleSubmit = () => {
        if (title, description, startdate, enddate, status) {
            const goaldata = {
                title,
                description,
                startdate,
                enddate,
                status
            }
            // console.log(goaldata);
            axios.post(`http://localhost:7410/goals/save/${employee.id}`, goaldata)
                .then((res) => {
                    console.log(res.data);
                    message.success("Goal Created")
                })
                .catch((err) => {
                    message.error("Invalid Crendentials")
                })
        }
        else {
            message.error("Please Fill increndentials")
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleStartDateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleEndDateChange = (date, dateString) => {
        setEndDate(dateString);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="creategoal">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <h2><u>Add Goal</u></h2>

                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input placeholder="Title" value={title} onChange={handleTitleChange} />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <TextArea rows={4} placeholder="Description" value={description} onChange={handleDescriptionChange} />
                </Form.Item>

                <Form.Item
                    name="startdate"
                    rules={[{ required: true, message: 'Please select the start date' }]}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="Start Date" value={startdate} onChange={handleStartDateChange} />
                </Form.Item>

                <Form.Item
                    name="enddate"
                    rules={[{ required: true, message: 'Please select the end date' }]}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="End Date" value={enddate} onChange={handleEndDateChange} />
                </Form.Item>

                {/* <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Please enter the status' }]}
                >
                    <Input placeholder="Status" value={status} onChange={handleStatusChange} />
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Goal
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateGoal;
