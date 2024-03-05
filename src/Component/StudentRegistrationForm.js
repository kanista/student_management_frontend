import React from 'react';
import {Breadcrumb, Button, DatePicker, Form, Input, message, Radio} from 'antd';
import StudentService from "../Service/StudentService";
import '../Style/CommonStyle.css';
import {useNavigate} from "react-router";

const StudentRegistrationForm = () => {
    const [form] = Form.useForm();

    const navigator = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await StudentService.addStudent(values);
            form.resetFields();
            if (response.status === 201) {
                message.success(response.data);
                navigator("/");
            } else {
                message.warning(response.data);
            }
        } catch (error) {
            message.error(error.response.data.message)
        }

    };

    return (
        <div className="common-container">
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[
                    {title: 'Home', href: '/'},
                    {title: 'Register Student'}
                ]}
            />
            <Form
                form={form}
                style={{
                    marginTop: 10,
                    labelCol: 4,
                    wrapperCol: 14
                }}
                onFinish={handleSubmit}
            >
                <h1>Register Student</h1>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Please input your name!'
                    }]}
                >
                    <Input placeholder="Enter your name"/>
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{
                        required: true,
                        message: 'Please input your address!'
                    }]}
                >
                    <Input placeholder="Enter your address"/>
                </Form.Item>
                <Form.Item
                    label="Date Of Birth"
                    name="dateOfBirth"
                    rules={[{
                        required: true,
                        message: 'Please input your date of birth!'
                    }]}
                >
                    <DatePicker placeholder="Enter your date of birth"/>
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{
                        required: true,
                        message: 'Please input your gender!'
                    }]}
                >
                    <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input your email address!',
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    }]}
                >
                    <Input placeholder="Enter your email"/>
                </Form.Item>
                <Form.Item
                    label="Course"
                    name="course"
                    rules={[{
                        required: true,
                        message: 'Please input your course!'
                    }]}
                >
                    <Input placeholder="Enter your course"/>
                </Form.Item>
                <Form.Item
                    label="Phone No"
                    name="phoneNo"
                    rules={[{
                        required: true,
                        message: 'Please input your phone number!',
                        pattern: /^\d+$/
                    }]}
                >
                    <Input placeholder="Enter your phone number"/>
                </Form.Item>
                <Form.Item
                    label="Guardian Name"
                    name="guardianName"
                    rules={[{
                        required: true,
                        message: 'Please input your guardianName!'
                    }]}
                >
                    <Input placeholder="Enter your guardianName"/>
                </Form.Item>
                <Form.Item
                    label="Relationship"
                    name="relationship"
                    rules={[{
                        required: true,
                        message: 'Please input your relationship!'
                    }]}
                >
                    <Input placeholder="Enter your relationship"/>
                </Form.Item>
                <Form.Item
                    label="Guardian Phone Number"
                    name="guardianPhoneNumber"
                    rules={[{
                        required: true,
                        message: 'Please input your guardian phone number!',
                        pattern: /^\d+$/
                    }]}
                >
                    <Input placeholder="Enter your guardian phone number"/>
                </Form.Item>
                <Form.Item
                    style={{
                        wrapperCol: {
                            span: 14, offset: 4
                        }
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default StudentRegistrationForm;
