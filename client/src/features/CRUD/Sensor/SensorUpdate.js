import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startUpdateSensor, startGetSensor } from '../../../Services/Slices/sensorSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function SensorUpdate() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sensor = useSelector(state => state.sensor.sensor);
    const location = useLocation();

    useEffect(() => {
        dispatch(startGetSensor(location.search.slice(1)));

    }, []);



    return (
        <div className="container">
            {sensor &&
                <Form
                    name="activityUpdate"
                    className="form"
                    initialValues={{
                        ...sensor
                    }}
                    onFinish={(values) => {
                        dispatch(startUpdateSensor({ ...values, _id: sensor._id }))
                        navigate('/dashboard/sensors')
                    }}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the activity Name',
                            },
                        ]}
                    >
                        <Input size="large"
                            placeholder="Name"
                            autoComplete="Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the activity type',
                            },
                        ]}
                    >
                        <Select size="large"
                            placeholder="Type"
                            autoComplete="Type"
                        >
                            <Option value='Accelerometer' >Accelerometer</Option>
                            <Option value='Gyroscope' >Gyroscope</Option>
                            <Option value='AbsoluteOrientationSensor' >Absolute Orientation Sensor</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="frequency"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the frequency',
                            },
                        ]}
                    >
                        <InputNumber size="large" style={{ width: "100%" }}
                            placeholder="Frequency"
                            min={1}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            size="large">Update Sensor
                        </Button>
                    </Form.Item>
                    <Link to='/dashboard'>
                        <Button block>
                            Back to Configure System
                        </Button>
                    </Link>
                </Form>}
        </div>
    );
}

export default SensorUpdate;
