import { Table, Tag, Space, Button, Row, Col, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { startGetActivities, startDeleteActivity, startGetActivity } from '../../../Services/Slices/activitySlice'
import { startGetExperiments, startDeleteExperiment, startGetExperiment } from '../../../Services/Slices/experimentSlice'
import React, { useEffect, useState } from 'react';


function ActivityList() {
    const loader = useSelector(state => state.activity.loader);
    const experiments = useSelector(state => state.experiment.experiments);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activityId, setActivityId] = useState(null);

    const showModal = (id) => {
        setActivityId(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(startDeleteExperiment(activityId));
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(startGetExperiments());
    }, []);

    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sensors',
            key: 'sensors',
            dataIndex: 'sensors',
            render: (sensors) => (
                <>
                    {sensors.map((sensor) => (
                        <Tag color="blue" key={sensors._id}>
                            {sensor.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Activities',
            key: 'activities',
            dataIndex: 'activities',
            render: (activities) => (
                <>
                    {activities.map((activity) => (
                        <Tag color="blue" key={activity._id}>
                            {activity.name}
                        </Tag>
                    ))}
                </>
            ),
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
                <Table columns={columns} dataSource={experiments} rowKey={record => record._id} />
            </Col>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Please confirm the deletion of the experiment</p>
            </Modal>
            <Link to='/dashboard'>
                <Button block>
                    Back to Configure System
                </Button>
            </Link>
        </Row>



    );
}

export default ActivityList;