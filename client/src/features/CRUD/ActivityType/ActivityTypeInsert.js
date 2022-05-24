import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startInsertActivityType } from '../../../Services/Slices/activityTypeSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function ActivityTypeInsert() {
    const { Option } = Select;
    const dispatch = useDispatch();


    return (
        <div className="container">
            <Form
                name="activityInsert"
                className="form"
                // onFinish={(values) => { console.log(values); }}
                onFinish={(values) => dispatch(startInsertActivityType(values))}
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
            </Form>
        </div>
    );
}

export default ActivityTypeInsert;
