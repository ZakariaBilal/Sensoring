import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startInsertSensor } from '../../../Services/Slices/sensorSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

function SensorInsert() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container">
            <Form
                name="activityInsert"
                className="form"
                // onFinish={(values) => { console.log(values); }}
                onFinish={(values) => {
                    dispatch(startInsertSensor(values))
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
                        size="large">Add Sensor
                    </Button>
                </Form.Item>
                <Link to='/dashboard'>
                    <Button block>
                        Back to Configure System
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default SensorInsert;
