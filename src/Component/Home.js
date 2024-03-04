import {Breadcrumb, message, Space, Spin, Table} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import '../Style/CommonStyle.css';

const Home = () => {

    const [data, setData] = useState();
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    // const [pagination, setPagination] = useState({ pageSize: 6, current: 1 });
    //
    //     const fetchData = async (page = 1, pageSize = 6) => {
    //         try {
    //             const response = await StudentService.getAllStudents(page, pageSize);
    //             setData(response);
    //             setTotal(response.length);
    //             console.log(data)
    //         } catch (error) {
    //             console.error("Error fetching students:", error);
    //         }
    //     };
    //
    //     const handleTableChange = (pagination) => {
    //         const { current, pageSize } = pagination;
    //         setPagination({ ...pagination, current });
    //         fetchData(current, pageSize);
    //     };

    const handleView = async (id) => {
        console.log(id)
        navigate(`/view/${id}`);
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = async (id) => {
        const response = await StudentService.deleteStudent(id);
        if (response.status === 200) {
            fetchData()
            message.success(response.data);
        } else {
            message.error(response.data);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div>
                    <Space>
                        <EyeOutlined
                            onClick={() => handleView(record.id)}
                            style={{color: "blue"}}
                        />
                        <EditOutlined
                            onClick={() => handleEdit(record.id)}
                            style={{color: "green"}}
                        />
                        <DeleteOutlined
                            onClick={() => handleDelete(record.id)}
                            style={{color: "red"}}
                        />
                    </Space>
                </div>
            )
        }
    ]

    const fetchData = async () => {
        try {
            const response = await StudentService.getAllStudents();
            setData(response.data);
            setTotal(response.data.length);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
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
                    {title: 'Students List'}
                ]}
            />

            <Table
                columns={columns}
                dataSource={data}
                pagination={{pageSize: 7, total}}
                // pagination={{ ...pagination, total }}
                // onChange={handleTableChange}
            />
        </div>
    )
}
export default Home;