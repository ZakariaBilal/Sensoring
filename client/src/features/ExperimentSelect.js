import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { startGetExperiments, startSetcurrentExperimentId } from '../Services/Slices/experimentSlice'
import React, { useEffect } from 'react';

function ExperimentSelect() {
    const loader = useSelector(state => state.experiment.loader);

    const experiments = useSelector(state => state.experiment.experiments);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetExperiments());
    }, []);

    return (

        <Row style={{ width: '75%' }} justify="space-between" align="middle" gutter={20}>

            {experiments && experiments.map((experiment, index) => (
                <Col span={12} key={index}>
                    <Link to={{ pathname: '/experimentStart' }}>
                        <Button block onClick={() => dispatch(startSetcurrentExperimentId(experiment._id))}>
                            {experiment.name}
                        </Button>
                    </Link>
                </Col>
            ))}


        </Row>

    );
}

export default ExperimentSelect;
