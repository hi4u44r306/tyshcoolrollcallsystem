// import React, { useEffect, useRef, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, set } from 'firebase/database';
// import { Html5Qrcode } from 'html5-qrcode';

// // ✅ Firebase 初始化
// const firebaseConfig = {
//     apiKey: "AIzaSyCNh_C1qJ2Xsn26DUHQjD7iRhN2GI7EhgM",
//     authDomain: "tyschoolrollcallsystem.firebaseapp.com",
//     databaseURL: "https://tyschoolrollcallsystem-default-rtdb.firebaseio.com",
//     projectId: "tyschoolrollcallsystem",
//     storageBucket: "tyschoolrollcallsystem.firebasestorage.app",
//     messagingSenderId: "671512147664",
//     appId: "1:671512147664:web:49cdabe49fa4e960b4d0d5",
//     measurementId: "G-W484LMH96G"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const QRScanner = () => {
//     const [scanResult, setScanResult] = useState('');
//     const [status, setStatus] = useState('');
//     const qrRef = useRef(null);
//     const html5QrCodeRef = useRef(null);

//     useEffect(() => {
//         const config = { fps: 10, qrbox: 250 };
//         const qrCodeRegionId = "reader";

//         html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

//         Html5Qrcode.getCameras().then((devices) => {
//             if (devices && devices.length) {
//                 const cameraId = devices[0].id;

//                 html5QrCodeRef.current.start(
//                     cameraId,
//                     config,
//                     (decodedText) => handleScan(decodedText),
//                     (err) => {
//                         console.warn('Scan error:', err);
//                     }
//                 );
//             }
//         }).catch((err) => {
//             setStatus('error');
//             setScanResult('找不到攝影機');
//         });

//         return () => {
//             html5QrCodeRef.current?.stop().then(() => {
//                 html5QrCodeRef.current?.clear();
//             });
//         };
//     }, []);

//     const handleScan = (data) => {
//         try {
//             const student = JSON.parse(data);
//             const now = new Date();
//             const timeStr = now.toLocaleTimeString();
//             const today = now.toISOString().split('T')[0];

//             const attendanceRef = ref(db, `attendance/${today}/${student.id}`);

//             set(attendanceRef, {
//                 name: student.name,
//                 parentPhone: student.parentPhone,
//                 time: timeStr,
//                 status: 'checked-in',
//             });

//             setScanResult(`${student.name} 已簽到`);
//             setStatus('success');
//         } catch (e) {
//             setScanResult('QR Code 格式錯誤');
//             setStatus('error');
//         }
//     };

//     return (
//         <div style={{ padding: 20 }}>
//             <h2>簽到 QR Code 掃描</h2>
//             <div id="reader" style={{ width: "100%", maxWidth: 400 }} ref={qrRef}></div>

//             {scanResult && (
//                 <div style={{ marginTop: 20, color: status === 'success' ? 'green' : 'red' }}>
//                     <h3>{scanResult}</h3>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QRScanner;
// QRScanner.jsx
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
    const [qrData, setQrData] = useState("尚未掃描任何內容");

    const handleScan = (data) => {
        if (data) {
            setQrData(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
        setQrData("發生錯誤，請重新嘗試");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>📷 掃描 QR Code</h2>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={styles.scanner}
            />
            <p style={styles.result}>🔍 掃描結果：{qrData}</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    title: {
        fontSize: "24px",
        marginBottom: "16px",
    },
    scanner: {
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
    },
    result: {
        marginTop: "24px",
        fontSize: "18px",
        color: "#333",
    },
};

export default QRScanner;
