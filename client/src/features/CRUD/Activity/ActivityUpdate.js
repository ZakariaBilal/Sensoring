import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, InputNumber, Select, Space, Row, Col } from 'antd';
import { startUpdateActivity, startGetActivity } from '../../../Services/Slices/activitySlice';
import { startGetActivityTypes } from '../../../Services/Slices/activityTypeSlice'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

function ActivityUpdate() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const activityTypes = useSelector(state => state.activityType.activityTypes);
    const activity = useSelector(state => state.activity.activity);
    const location = useLocation();

    useEffect(() => {
        dispatch(startGetActivity(location.search.slice(1)));
        dispatch(startGetActivityTypes());

    }, []);



    return (
        <div className="container">
            {activity &&
                <Form
                    name="activityUpdate"
                    className="form"
                    initialValues={{
                        ...activity
                    }}
                    onFinish={(values) => dispatch(startUpdateActivity({ ...values, _id: activity._id }))}
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
                            {activityTypes?.map((type) => (
                                <Option value={type._id} key={type._id}>{type.name}</Option>
                            ))}


                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="timeRequired"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the time Required',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} size="large"
                            placeholder="Time Required"
                            min={1}
                        />
                    </Form.Item>

                    <Form.List name="data">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} justify="space-between" align="middle" gutter={20}>
                                        <Col span={20}>
                                            <Form.Item
                                                {...restField}
                                                name={[name]}
                                                rules={[{ required: true, message: 'Missing Data' }]}
                                            >
                                                <Input placeholder="Data" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} >
                                        Add Data
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            size="large">Update Activity
                        </Button>
                    </Form.Item>
                </Form>}
        </div>
    );
}

export default ActivityUpdate;
