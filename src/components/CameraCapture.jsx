import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';

function CameraCapture(props) {
    const webcamRef = useRef(null);
    const [error, setError] = useState(null);
    const [videoConstraint, setvideoConstraint] = useState(null);

    const checkCameraAvailability = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (webcamRef.current) {
                webcamRef.current.srcObject = stream;
            }
        } catch (err) {
            setError('Camera not found or permission denied.');
        }
    };

    useEffect(() => {
        checkCameraAvailability();
    }, []);
    
    useEffect(() => {
        if (!error) {
            initCamera();       // Call initCamera when the component mounts
        }
    }, [])


    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setcapturedFile(imageSrc);
    }, [webcamRef]);


    const getCameraDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');
            const backCamera = videoDevices.find((device) => device.label.includes('back'));

            if (backCamera) {
                const videoConstraints = {
                    deviceId: { exact: backCamera.deviceId },
                };
                setvideoConstraint(videoConstraints)

                return videoConstraints;
            }
        } catch (error) {
            console.error('Error getting camera devices:', error);
        }

        return null;
    };

    const initCamera = async () => {
        try {
            const videoConstraints = await getCameraDevices();
            if (videoConstraints) {
                webcamRef.current.getUserMedia({ video: videoConstraints });
            } else {
                webcamRef.current.getUserMedia({ video: true });
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (error) {
        return (
            <div className="m-2">{error}</div>
        )
    }
    // const videoConstraints = {
    //     facingMode: { exact: "environment" }
    // };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraint}
            />
            <Button type="button" onClick={capture}>Capture</Button>
        </div>
    );
}

export default CameraCapture;







// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import { Button } from '@mui/material';

// function CameraCapture(props) {
//     const webcamRef = useRef(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const checkCameraAvailability = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 if (webcamRef.current) {
//                     webcamRef.current.srcObject = stream;
//                 }
//             } catch (err) {
//                 setError('Camera not found or permission denied.');
//             }
//         };
//         checkCameraAvailability();
//     }, []);

//     const capture = React.useCallback(() => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         props.setcapturedFile(imageSrc);
//     }, [webcamRef]);

//     if (error) {
//         return (
//             <div className="m-2">{error}</div>
//         )
//     }
//     const videoConstraints = {
//         facingMode: { exact: "environment" }
//     };

//     return (
//         <div>
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//             />
//             <Button type="button" onClick={capture}>Capture</Button>
//         </div>
//     );
// }

// export default CameraCapture;

