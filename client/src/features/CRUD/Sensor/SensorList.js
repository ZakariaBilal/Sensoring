import { Table, Tag, Space, Button, Row, Col, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetSensors, startDeleteSensor } from '../../../Services/Slices/sensorSlice'
import React, { useEffect, useState } from 'react';


function SensorList() {
    const sensors = useSelector(state => state.sensor.sensors);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sensorId, setSensorId] = useState(null);

    const showModal = (id) => {
        setSensorId(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(startDeleteSensor(sensorId));
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(startGetSensors());
    }, []);

    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">

                    <Link to={{ pathname: "update", search: record?._id }}>Update</Link>
                    <a onClick={() => showModal(record?._id)}>Delete</a>
                </Space>
            ),
        },
    ];

    return (


        <Row style={{ margin: 'auto' }} justify="space-evenly" align="middle" gutter={20}>
            <Col span={4} offset={20} >
                <Button block >
                    <Link to={"insert"}>
                        Add
                    </Link>

                </Button>
            </Col>
            <Col span={24} >
                <Table columns={columns} dataSource={sensors} rowKey={record => record._id} />
            </Col>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Please confirm the deletion of the activity</p>
            </Modal>
        </Row>



    );
}

export default SensorList;