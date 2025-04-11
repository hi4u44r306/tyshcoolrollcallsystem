import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { QrReader } from 'react-qr-reader';


// ✅ Firebase 初始化
const firebaseConfig = {
    apiKey: "AIzaSyCNh_C1qJ2Xsn26DUHQjD7iRhN2GI7EhgM",
    authDomain: "tyschoolrollcallsystem.firebaseapp.com",
    databaseURL: "https://tyschoolrollcallsystem-default-rtdb.firebaseio.com",
    projectId: "tyschoolrollcallsystem",
    storageBucket: "tyschoolrollcallsystem.firebasestorage.app",
    messagingSenderId: "671512147664",
    appId: "1:671512147664:web:49cdabe49fa4e960b4d0d5",
    measurementId: "G-W484LMH96G"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const QRScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const [status, setStatus] = useState('');

    const handleScan = (data) => {
        if (data) {
            try {
                const student = JSON.parse(data);
                const now = new Date();
                const timeStr = now.toLocaleTimeString();
                const today = now.toISOString().split('T')[0];

                const attendanceRef = ref(db, `attendance/${today}/${student.id}`);

                set(attendanceRef, {
                    name: student.name,
                    parentPhone: student.parentPhone,
                    time: timeStr,
                    status: 'checked-in',
                });

                setScanResult(`${student.name} 已簽到`);
                setStatus('success');
            } catch (e) {
                setScanResult('QR Code 內容格式錯誤');
                setStatus('error');
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        setScanResult('鏡頭讀取失敗');
        setStatus('error');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>簽到 QR Code 掃描</h2>
            <div style={{ width: '100%', maxWidth: 400 }}>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            handleScan(result?.text);
                        }
                        if (!!error) {
                            handleError(error);
                        }
                    }}
                    constraints={{ facingMode: 'environment' }}
                    style={{ width: '100%' }}
                />
            </div>

            {scanResult && (
                <div style={{ marginTop: 20, color: status === 'success' ? 'green' : 'red' }}>
                    <h3>{scanResult}</h3>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
