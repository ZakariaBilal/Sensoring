import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import {
    startGetExperimentPopulate, setActivityEnded,
    setExperimentEnded,
} from '../Services/Slices/experimentSlice'
import {
    startInsertExperimentData
} from '../Services/Slices/experimentDataSlice'
import { clearSubject } from '../Services/Slices/subjectSlice'
import { Accelerometer, Gyroscope, AbsoluteOrientationSensor } from 'motion-sensors-polyfill'
import SubjectForm from "./OnBoarding/SubjectForm";
import Timer from "./OnBoarding/Timer";


function StartExperiment() {

    const dispatch = useDispatch();

    const experimentLoader = useSelector(state => state.experiment.loader);
    const experiment = useSelector(state => state.experiment.currentExperiment);
    const currentExperimentId = useSelector(state => state.experiment.currentExperimentId);
    const subject = useSelector(state => state.subject.subject);


    const [experimentEnded, setExperimentEnded] = useState(false);
    const [startActivity, setStartActivity] = useState(false);
    const [activityIndex, setActivityIndex] = useState(-1);
    const [experimentData, setExperimentData] = useState({});

    //sensors
    const [accelerometer, setAccelerometer] = useState(null);
    const [gyroscope, setGyroscope] = useState(null);
    const [absoluteOrientationSensor, setAbsoluteOrientationSensor] = useState(null);
    const [accelerometerIndex, setAccelerometerIndex] = useState(null);
    const [gyroscopeIndex, setGyroscopeIndex] = useState(null);
    const [absoluteOrientationSensorIndex, setAbsoluteOrientationSensorIndex] = useState(null);
    const [accelerometerData, setAccelerometerData] = useState(null);
    const [gyroscopeData, setGyroscopeData] = useState(null);
    const [absoluteOrientationSensorData, setAbsoluteOrientationSensorData] = useState(null);
    const [touchStartData, setTouchStartData] = useState(null);
    const [touchMoveData, setTouchMoveData] = useState(null);
    const [touchEndData, setTouchEndData] = useState(null);

    const createDataObject = (sensorData) => {
        let copyExperimentData = sensorData;
        if (!copyExperimentData) {
            copyExperimentData = [];
            for (let index = 0; index < experiment.activities.length; index++) {
                copyExperimentData.push([]);
            }
        }
        return copyExperimentData
    }
    const handleTouchStart = (e) => {
        let copyExperimentData = touchStartData;
        let { PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force } = e.changedTouches.item(0)

        copyExperimentData[activityIndex].push({ PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force, timestamp: e.timeStamp, type: "touchstart" });
        setTouchStartData(copyExperimentData);
    }

    const handleTouchMove = (e) => {
        let copyExperimentData = touchMoveData;
        let { PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force } = e.changedTouches.item(0)

        copyExperimentData[activityIndex].push({ PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force, timestamp: e.timeStamp, type: "touchmove" });
        setTouchMoveData(copyExperimentData);
    }

    const handleTouchEnd = (e) => {
        let copyExperimentData = touchEndData;
        let { PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force } = e.changedTouches.item(0)

        copyExperimentData[activityIndex].push({ PageX, PageY, radiusX, radiusY, rotationAngle, screenX, screenY, force, timestamp: e.timeStamp, type: "touchend" });
        setTouchEndData(copyExperimentData);
    }

    const handleAbsoluteOrientationSensor = (e) => {
        let copyExperimentData = absoluteOrientationSensorData;
        copyExperimentData[activityIndex].push({ ...absoluteOrientationSensor.quaternion, timestamp: absoluteOrientationSensor.timestamp });
        setAbsoluteOrientationSensorData(copyExperimentData);
    }

    const handleAccelerometer = (e) => {
        let copyExperimentData = accelerometerData;
        copyExperimentData[activityIndex].push({ x: accelerometer.x, y: accelerometer.y, z: accelerometer.z, timestamp: accelerometer.timestamp });
        setAccelerometerData(copyExperimentData);

    }
    const handleGyroscope = (e) => {
        let copyExperimentData = gyroscopeData;
        copyExperimentData[activityIndex].push({ x: gyroscope.x, y: gyroscope.y, z: gyroscope.z, timestamp: gyroscope.timestamp });
        setGyroscopeData(copyExperimentData);
    }

    //fetching the Experiment
    useEffect(() => {
        if (currentExperimentId) dispatch(startGetExperimentPopulate(currentExperimentId));
    }, []);

    //Setup of the subject after getting it
    useEffect(() => {
        if (subject?._id) setExperimentData({ ...experimentData, subject: subject._id });
    }, [subject]);

    //Activity start cycle between off and on
    useEffect(() => {
        console.log("start Actvity", startActivity)
        if (startActivity) {
            //acceleromter setup
            if(accelerometerIndex){
            accelerometer?.start();
            accelerometer?.addEventListener('reading', handleAccelerometer);
            setTimeout(() => {
                accelerometer?.removeEventListener('reading', handleAccelerometer);
            }, experiment?.activities[activityIndex].timeRequired * 1000);
            }
            //gyroscope setup
            if(gyroscopeIndex){
            gyroscope?.start();
            gyroscope?.addEventListener('reading', handleGyroscope);
            setTimeout(() => {
                gyroscope?.removeEventListener('reading', handleGyroscope);
            }, experiment?.activities[activityIndex].timeRequired * 1000);
            gyroscope?.start();
            }
            //absoluteOrientationSensor setup
            if(absoluteOrientationSensorIndex){
            absoluteOrientationSensor?.start();
            absoluteOrientationSensor?.addEventListener('reading', handleAbsoluteOrientationSensor);
            setTimeout(() => {
                absoluteOrientationSensor?.removeEventListener('reading', handleAbsoluteOrientationSensor);
            }, experiment?.activities[activityIndex].timeRequired * 1000);
            }
            //Touch setup
            document.addEventListener('touchstart', handleTouchStart);
            setTimeout(() => {
                document.removeEventListener('touchstart', handleTouchStart);
            }, experiment?.activities[activityIndex].timeRequired * 1000);

            document.addEventListener('touchmove', handleTouchMove);
            setTimeout(() => {
                document.removeEventListener('touchmove', handleTouchMove);
            }, experiment?.activities[activityIndex].timeRequired * 1000);

            document.addEventListener('touchend', handleTouchEnd);
            setTimeout(() => {
                document.removeEventListener('touchend', handleTouchEnd);
            }, experiment?.activities[activityIndex].timeRequired * 1000);
        } else {
            accelerometer?.stop();
            gyroscope?.stop();
            absoluteOrientationSensor?.stop();
            if (activityIndex == (experiment?.activities.length - 1)) {
                setExperimentEnded(true);
            }

        }
    }, [startActivity]);

    //Getting the experiment and setup of it
    useEffect(() => {
        if (experiment?.sensors && currentExperimentId == experiment._id) {
            setExperimentData({ ...experimentData, experiment: experiment._id });
            setTouchStartData(createDataObject(touchStartData));
            setTouchMoveData(createDataObject(touchMoveData));
            setTouchEndData(createDataObject(touchEndData));

            for (const [index, sensor] of experiment.sensors.entries()) {
                switch (sensor.type) {
                    case 'Accelerometer':
                        setAccelerometer(new Accelerometer({ frequency: sensor.frequency }));
                        setAccelerometerIndex(index);
                        setAccelerometerData(createDataObject(accelerometerData));
                        break;
                    case 'Gyroscope':
                        setGyroscope(new Gyroscope({ frequency: sensor.frequency }));
                        setGyroscopeIndex(index);
                        setGyroscopeData(createDataObject(gyroscopeData));
                        break;
                    case 'AbsoluteOrientationSensor':
                        console.log("setting up AbsoluteOrientationSensor");
                        setAbsoluteOrientationSensor(new AbsoluteOrientationSensor({ frequency: sensor.frequency }));
                        setAbsoluteOrientationSensorIndex(index);
                        setAbsoluteOrientationSensorData(createDataObject(absoluteOrientationSensorData));
                        break;
                    default:
                        console.error('unknown sensor')
                        break;
                }
            }
        }
    }, [experiment]);

    //building and committing the experiment Data
    useEffect(() => {
        if (experimentEnded) {
            let data = { data: [], touchData: [] }
            for (let activityIndex = 0; activityIndex < experiment.activities.length; activityIndex++) {
                data.touchData.push([...touchStartData[activityIndex], ...touchMoveData[activityIndex], ...touchEndData[activityIndex]]);

                let sensorData = [];
                for (let sensorIndex = 0; sensorIndex < experiment.sensors.length; sensorIndex++) {
                    if (sensorIndex == accelerometerIndex && accelerometerData) sensorData.push([...accelerometerData[activityIndex]]);
                    if (sensorIndex == absoluteOrientationSensorIndex && absoluteOrientationSensorData) sensorData.push([...absoluteOrientationSensorData[activityIndex]]);
                    if (sensorIndex == gyroscopeIndex && gyroscopeData) sensorData.push([...gyroscopeData[activityIndex]]);
                }
                data.data.push(sensorData);
            }
            setExperimentData({ ...experimentData, ...data });
            console.log("experimentData", { ...experimentData, ...data });
            dispatch(startInsertExperimentData({ ...experimentData, ...data }));
            dispatch(clearSubject());
        }
    }, [experimentEnded]);


    return (

        <Row justify="space-evenly" align="middle" gutter={20}>
            <Col span={24} >
                {(() => {
                    if (!subject?._id && !experimentEnded) {
                        return <SubjectForm />
                    } else {
                        if (experimentEnded) {
                            return <div>Experiment Ended</div>
                        }
                        if (activityIndex < (experiment?.activities.length)) {
                            if (startActivity) {
                                return <div><Timer initialSeconds={experiment?.activities[activityIndex]?.timeRequired} fire={() => setStartActivity(false)} />
                                    <div>Current Activity :{experiment?.activities[activityIndex]?.name}</div>
                                    <div>{(() => {

                                        switch (experiment?.activities[activityIndex]?.type.name) {
                                            case "Reading":
                                                return <div>{experiment?.activities[activityIndex]?.data[0]}</div>
                                                break;
                                            case "Walking":
                                                return;
                                                break;
                                            default:
                                                return <div>Unknown Activity</div>
                                                break;
                                        }

                                    })()}</div>
                                </div>;
                            } else {
                                return <div>
                                    <div>Starting new Activity</div>
                                    <div>{experiment?.activities[activityIndex + 1]?.name}</div>
                                    <Timer initialSeconds={1} fire={() => {
                                        console.log("activityIndex", activityIndex);
                                        console.log("experiment?.activities.length - 1", experiment?.activities.length - 1);

                                        setActivityIndex(activityIndex + 1); setStartActivity(true)

                                    }} />
                                </div>
                            }
                        } else {
                            return <div>Experiment Ended</div>
                        }


                    }

                })()}


            </Col>
        </Row>

    );
}

export default StartExperiment;


    // const loader = false;
    // const experiment = {
    //     _id: '1',
    //     name: 'test',
    //     sensors: [
    //         { _id: '1', name: 'sensor1', type: 'Accelerometer', frequency: 1 },
    //         { _id: '2', name: 'sensor2', type: 'Gyroscope', frequency: 1 },
    //         { _id: '3', name: 'sensor3', type: 'AbsoluteOrientationSensor', frequency: 1 }
    //     ],
    //     activities: [
    //         { _id: '1', name: 'activity1', type: { _id: '1', name: 'Reading' }, timeRequired: 20, data: ['Read This'] },
    //         { _id: '2', name: 'activity2', type: { _id: '2', name: 'Walking' }, timeRequired: 20, data: [] }
    //     ]
    // };
    // const subject = {
    //     _id: '1',
    //     name: 'test'
    // };
    // const experimentData = {
    //     experimentId: '1',
    //     subjectId: '1',
    //     data: [[[/* {timestamp :'XXX', data_1:null,data_2:null,data_3:null}*/]]],
    //     touchData: [
    //         /*{
    //             PageX: Number,
    //             PageY: Number,
    //             radiusX: Number,
    //             radiusY: Number,
    //             rotationAngle: Number,
    //             screenX: Number,
    //             screenY: Number,
    //             force: Number,
    //             timestamp: String,
    //             type: 'touchstart' || 'touchmove' || 'touchend'
    //         }*/]
    // }
