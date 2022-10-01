import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onFaceDetectSubmit,onCelebDetectSubmit}) =>{
    return(
        <div>
            <p className="f3">
                {'Face/Celebrity recognition web, please insert a photo url and select one of the options.'}
            </p>
            <div className="center">
                <div className="pa4 form center br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='tex' onChange={onInputChange} />
                    <button className="w-15 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onFaceDetectSubmit}>Detect Face </button>
                    <button className="w-15 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onCelebDetectSubmit}>Celebrity recognition </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;