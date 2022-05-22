import { Table, Tag, Space, Button, Row, Col, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetActivities, startDeleteActivity, startGetActivity } from '../../../Services/Slices/activitySlice'
import React, { useEffect, useState } from 'react';


function ActivityList() {
    const loader = useSelector(state => state.activity.loader);
    const activities = useSelector(state => state.activity.activities);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activityId, setActivityId] = useState(null);

    const showModal = (id) => {
        setActivityId(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(startDeleteActivity(activityId));
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(startGetActivities());
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
            render: (type) => (
                <>
                    {type?.name}
                </>
            )
            ,
        },
        {
            title: 'Time Required',
            dataIndex: 'timeRequired',
            key: 'timeRequired',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">

                    <Link onClick={() => dispatch(startGetActivity(record?._id))} to={{ pathname: "update", search: record?._id }}>Update</Link>
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
                <Table columns={columns} dataSource={activities} rowKey={record => record._id} />
            </Col>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Please confirm the deletion of the activity</p>
            </Modal>
        </Row>



    );
}

export default ActivityList;