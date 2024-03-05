import {Descriptions, Drawer, message, Spin} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {useNavigate, useParams} from "react-router";
import '../Style/CommonStyle.css';
import moment from "moment/moment";


const ViewStudentDetails = () => {

    const [studentData, setStudentData] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const onClose = () => {
        navigate("/");
    };

    const fetchData = async () => {
        try {
            const response = await StudentService.getStudent(id);
            setStudentData(response.data)
        } catch (error) {
            message.error(error);
            navigate("/")
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    return (
        <Drawer
            title="Student Details"
            onClose={onClose}
            open={true}
            placement="right"
            closable={true}
            width={600}
        >
            {studentData ? (
                <Descriptions
                    title="Student Info"
                    column={1}>
                    <Descriptions.Item label="Name" labelStyle={{width: '200px'}}>{studentData.name}</Descriptions.Item>
                    <Descriptions.Item label="Data of Birth"
                                       labelStyle={{width: '200px'}}>{studentData.dateOfBirth ? moment(studentData.dateOfBirth).format("YYYY-MM-DD") : null}</Descriptions.Item>
                    <Descriptions.Item label="Gender"
                                       labelStyle={{width: '200px'}}>{studentData.gender}</Descriptions.Item>
                    <Descriptions.Item label="Address"
                                       labelStyle={{width: '200px'}}>{studentData.address}</Descriptions.Item>
                    <Descriptions.Item label="Course"
                                       labelStyle={{width: '200px'}}>{studentData.course}</Descriptions.Item>
                    <Descriptions.Item label="Email"
                                       labelStyle={{width: '200px'}}>{studentData.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone No"
                                       labelStyle={{width: '200px'}}>{studentData.phoneNo}</Descriptions.Item>
                    <Descriptions.Item label="Guardian Name"
                                       labelStyle={{width: '200px'}}>{studentData.guardianName}</Descriptions.Item>
                    <Descriptions.Item label="Relationship"
                                       labelStyle={{width: '200px'}}>{studentData.relationship}</Descriptions.Item>
                    <Descriptions.Item label="Guardian Phone Number"
                                       labelStyle={{width: '200px'}}>{studentData.guardianPhoneNumber}</Descriptions.Item>
                </Descriptions>) : (
                <div className="loader-container">
                    <Spin tip="Loading" size="large"/>
                </div>
            )}
        </Drawer>
    )
}

export default ViewStudentDetails;