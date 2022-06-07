import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startUpdateActivityType, startGetActivityType } from '../../../Services/Slices/activityTypeSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

function SensorUpdate() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const activityType = useSelector(state => state.activityType.activityType);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(startGetActivityType(location.search.slice(1)));

    }, []);



    return (
        <div className="container">
            {activityType &&
                <Form
                    name="activityUpdate"
                    className="form"
                    initialValues={{
                        ...activityType
                    }}
                    onFinish={(values) => {
                        dispatch(startUpdateActivityType({ ...values, _id: activityType._id }))
                        navigate('/dashboard/activityTypes')
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


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            size="large">Update ActivityType
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
