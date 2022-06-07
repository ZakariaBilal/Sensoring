import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startInsertActivityType } from '../../../Services/Slices/activityTypeSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

function ActivityTypeInsert() {
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
                    dispatch(startInsertActivityType(values))
                    navigate('/dashboard/activityTypes')
                }
                }
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
                        size="large">Add ActivityType
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

export default ActivityTypeInsert;
