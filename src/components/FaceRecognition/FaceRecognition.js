import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ImgUrl ,Facebox,Celebbox}) =>{
    const face_box=Facebox.map((face,i)=>{
        return(<div key={i} className="bounding-box" style={{top: face.topRow, right: face.rightCol, bottom:face.bottomRow, left:face.leftCol}}></div>)
    });
    const celeb_box = <div className='bounding-box' style={{top: Celebbox.topRow, right: Celebbox.rightCol, bottom: Celebbox.bottomRow, left: Celebbox.leftCol}}></div>
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={ImgUrl} alt='' width='500px' height='auto'/>
                {face_box}
                {celeb_box}
            </div>
        </div>
    );
}

export default FaceRecognition;