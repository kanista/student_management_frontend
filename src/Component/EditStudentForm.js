import {Breadcrumb, Button, Form, Input, message, Spin} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {useNavigate, useParams} from "react-router";
import '../Style/CommonStyle.css';

const EditStudentForm = () => {

    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await StudentService.getStudent(id);
            setData(response)
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

    return (
        <div className="common-container">
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[
                    {title: 'Home', href: '/'},
                    {title: 'Edit Student'}
                ]}
            />
            <Form
                form={form}
                style={{
                    marginTop: 10,
                    labelCol: 4,
                    wrapperCol: 14
                }}
                initialValues={{
                    name: data.name,
                    address: data.address
                }}
                onFinish={handleSubmit}
            >
                <h1>Edit Student</h1>
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default EditStudentForm;