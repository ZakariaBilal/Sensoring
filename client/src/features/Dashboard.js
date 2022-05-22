import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';


function Dashboard() {

  const entities = [
    { name: 'Experiments', path: 'experiments', id: '1230' },
    { name: 'Activities', path: 'activities', id: '1231' },
    { name: 'Activity Types', path: 'activityTypes', id: '1232' },
    { name: 'Sensors', path: 'sensors', id: '1233' }]

  return (

    <header>
      <Row style={{ width: '75%' }} justify="space-evenly" align="middle" gutter={20}>
        {entities.map(({ name, path, id }) => (
          <Col span={12} key={id} >
            <Link to={path}>
              <Button block>
                {name}
              </Button>
            </Link>
          </Col>
        ))}
      </Row>



    </header>
  );
}

export default Dashboard;
