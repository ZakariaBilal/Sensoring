import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { startInsertSubject } from '../../Services/Slices/subjectSlice'


function LoginPage() {
    const loader = useSelector(state => state.subject.loader);

    const [subjectName, setSubjectName] = useState('');

    const dispatch = useDispatch();

    return (
        <Form
            name="subject_form"
            className="form"
            onFinish={() => dispatch(startInsertSubject(
                { name: subjectName }
            ))
            }
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input size="large"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Subject Name"
                    autoComplete="username"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                    size="large">Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginPage;
