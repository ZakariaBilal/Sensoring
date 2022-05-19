import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { startInsertSubject } from '../../Services/Slices/subjectSlice'


function LoginPage(props) {
    const { text } = props
    const loader = useSelector(state => state.subject.loader);

    const [subjectName, setSubjectName] = useState('');

    const dispatch = useDispatch();

    return (
        <div>
            {text}
        </div>
    );
}

export default LoginPage;
