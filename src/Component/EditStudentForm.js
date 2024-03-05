import {Button, DatePicker, Drawer, Form, Input, message, Radio, Spin} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {useNavigate, useParams} from "react-router";
import '../Style/CommonStyle.css';
import moment from "moment";

const EditStudentForm = () => {

    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await StudentService.getStudent(id);
            setData(response.data)
        } catch (error) {
            message.error(error);
            navigate("/")
        }
    }


    useEffect(() => {
        fetchData()

    }, []);

    if (!data) {
        return (
            <div className="loader-container">
                <Spin tip="Loading" size="large"/>
            </div>
        )
    }

    const handleSubmit = async (values) => {
        try {
            const response = await StudentService.updateStudent(id, values);
            form.resetFields();
            if (response.status === 200) {
                message.success(response.data);
            } else {
                message.warning(response.data);
            }
        } catch (error) {
            message.error(error.response.data.message)
        }
        navigate("/")
    };

    const onClose = () => {
        navigate("/");
    };

    console.log(data)

    return (
        <Drawer
            title="Edit Student"
            onClose={onClose}
            open={true}
            placement="right"
            closable={true}
            width={600}
        >
            <Form
                form={form}
                style={{
                    marginTop: 10,
                    labelCol: 4,
                    wrapperCol: 14
                }}
                initialValues={{
                    name: data.name,
                    address: data.address,
                    dateOfBirth: data.dateOfBirth ? moment(data.dateOfBirth) : null,
                    gender: data.gender,
                    email: data.email,
                    phoneNo: data.phoneNo,
                    course: data.course,
                    guardianName: data.guardianName,
                    relationship: data.relationship,
                    guardianPhoneNumber: data.guardianPhoneNumber
                }}
                // initialValues={data}
                onFinish={handleSubmit}
            >

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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
export default EditStudentForm;