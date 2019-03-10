import React from 'react'

const Status = ({status}) => {console.log(status); return (
    <div className={`status status-${status}`} >
        <p>Status: {status.status}</p>
        <p>Temp Target: {status.tempTarget}</p>
        <p>Temp: {status.temp}</p>
        <p>Speed: {status.speed}</p>
        <p>Progress: {status.progress}%</p>
        <p>Current Command: {status['CC']}</p>
        <p>X: {status['X']}</p>
        <p>Y: {status['Y']}</p>
        <p>Z: {status['Z']}</p>
        <p>Extrusion: {status['E']}</p>
        <p>Forward speed: {status['F']}</p>
    </div>
)}

export default Status