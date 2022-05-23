import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startGetActivities } from '../../../Services/Slices/activitySlice';
import { startGetSensors } from '../../../Services/Slices/sensorSlice';
import { startGetExperiment, startUpdateExperiment } from '../../../Services/Slices/experimentSlice'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

function ActivityUpdate() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activity.activities);
    const sensors = useSelector(state => state.sensor.sensors);
    const experiment = useSelector(state => state.experiment.experiment);
    const location = useLocation();

    useEffect(() => {
        dispatch(startGetSensors());
        dispatch(startGetActivities());
        dispatch(startGetExperiment(location.search.slice(1)));
    }, []);

    return (
        <div className="container">
            {experiment && <Form
                name="experimentUpdate"
                className="form"
                initialValues={{
                    ...experiment
                }}
                onFinish={(values) => dispatch(startUpdateExperiment({ ...values, _id: experiment._id }))}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the experiment Name',
                        },
                    ]}
                >
                    <Input size="large"
                        placeholder="Name"
                        autoComplete="Name"
                    />
                </Form.Item>

                <Form.Item
                    name="activities"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the activities',
                        },
                    ]}
                >
                    <Select size="large"
                        mode="multiple"
                        allowClear
                        placeholder="Activities"
                        autoComplete="Activities"
                    >
                        {activities?.map((activity) => (
                            <Option value={activity._id} key={activity._id}>{activity.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="sensors"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the sensors',
                        },
                    ]}
                >
                    <Select size="large"
                        mode="multiple"
                        allowClear
                        placeholder="Sensors"
                        autoComplete="Sensors"
                    >
                        {sensors?.map((sensor) => (
                            <Option value={sensor._id} key={sensor._id}>{sensor.name}</Option>
                        ))}
                    </Select>
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        size="large">Update Experiment
                    </Button>
                </Form.Item>
            </Form>}
        </div>
    );
}

export default ActivityUpdate;
