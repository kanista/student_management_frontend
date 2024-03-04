import React, {useState} from 'react';
import {Breadcrumb, Button, Form, Input, message} from 'antd';
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
