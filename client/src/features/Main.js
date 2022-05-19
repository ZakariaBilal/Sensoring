import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';


function Main() {


    return (
        <div >
            <Row justify="space-evenly" align="middle" gutter={20}>
                <Col>
                    <Link to='/dashboard'>
                        <Button block>
                            Configure System
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to='/experimentSelect'>
                        <Button block>
                            Start Experiment
                        </Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default Main;
