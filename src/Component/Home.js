import {Breadcrumb, message, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import StudentService from "../Service/StudentService";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import '../Style/CommonStyle.css';
import Search from "antd/es/input/Search";

const Home = () => {

    const [data, setData] = useState(null);
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState('');

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
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course'
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

    // if (!data) {
    //     return (
    //         <div className="loader-container">
    //             <Spin tip="Loading" size="large"/>
    //         </div>
    //     )
    // }

    const handleSearch = async (id) => {
        try {
            if (!id.trim()) {
                message.error('Please enter search key');
                return;
            }
            const response = await StudentService.getStudent(id);
            if (response.status === 200 && response.data) {
                setData([response.data]);
            } else {
                setData(null);
                setSearchValue('');
            }
        } catch (error) {
            message.error(error);
            setSearchValue('');
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };


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
            <div style={{float: "right", marginBottom: 20}}>
                <Search
                    placeholder="input search text"
                    allowClear
                    value={searchValue}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    style={{
                        width: 200,
                    }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={data !== null ? data : null}
                pagination={{pageSize: 7, total}}
                // pagination={{ ...pagination, total }}
                // onChange={handleTableChange}
            />
        </div>
    )
}
export default Home;