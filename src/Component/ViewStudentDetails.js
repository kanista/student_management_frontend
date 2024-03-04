import {Breadcrumb, Descriptions, message, Spin} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {useNavigate, useParams} from "react-router";
import '../Style/CommonStyle.css';


const ViewStudentDetails = () => {

    const [studentData, setStudentData] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await StudentService.getStudent(id);
            setStudentData(response)
        } catch (error) {
            message.error(error);
            navigate("/")
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    if (!studentData) {
        return (
            <div className="loader-container">
                <Spin tip="Loading" size="large"/>
            </div>
        )
    }

    return (
        <div className="common-container">
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[
                    {title: 'Home', href: '/'},
                    {title: 'Students Details'}
                ]}
            />
            <Descriptions title="Student Info" style={{fontWeight: "bold"}}>
                <Descriptions.Item label="Name">{studentData.name}</Descriptions.Item><br/><br/>
                <Descriptions.Item label="Address">{studentData.address}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ViewStudentDetails;