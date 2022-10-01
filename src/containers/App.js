import React, {Component} from 'react';
import './App.css';
import Navigation from "../components/Navigation/Navigation.js"
import FaceRecognition from "../components/FaceRecognition/FaceRecognition.js"
import Logo from "../components/Logo/Logo.js"
import Rank from "../components/Rank/Rank.js"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm.js"
import Signin from "../components/Signin/Signin.js"
import ParticlesInit from './ParticlesInit';
import Register from '../components/Register/Register';
import {BasicTable} from "../components/CelebTable/Table.js"
import Profile from '../components/Profile/Profile';

const initialState ={
            input :'',
            ImgUrl : '',
            Facebox : [],
            celebbox :{},
            celebArr : [],
            Show_celebs : false,
            Route: 'signin',
            isSignedIn : false ,
            user : {
                id:'',    
                email : '',
                name : '',
                entries: 0,
                joined : ''
            }

}

class App extends Component {
    constructor(){
        super();
        this.state=initialState;
    };

    calculateFaceLocation = (response)=>{
        this.setState({celebbox: {}});
        const located_face = response.outputs[0].data.regions.map((box)=>{return box.region_info.bounding_box});
        const image = document.getElementById('inputimage');
        const width = Number(image.width)
        const height = Number(image.height)
        const box = located_face.map((detected_face)=>{return {
            leftCol: detected_face.left_col * width,
            rightCol : width - (detected_face.right_col * width),
            topRow : detected_face.top_row * height,
            bottomRow : height - (detected_face.bottom_row * height)
            }
        });
        return box;
    };

    calculateCelebFaceLocation = (response)=>{
        const celebs=response.outputs[0].data.regions[0].data.concepts;
        this.setState({Facebox: [],celebArr : celebs});
        const located_face = response.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: located_face.left_col * width,
            rightCol : width - (located_face.right_col * width),
            topRow : located_face.top_row * height,
            bottomRow : height - (located_face.bottom_row * height)
            }

    };     

    displayBox = (box_location)=>{
        this.setState({Facebox: box_location,Show_celebs: false });
    };

    celebDisplayBox = (box_location)=>{
        this.setState({celebbox: box_location ,Show_celebs: true });
    };

    onInputChange = (event) =>{
        this.setState({input : event.target.value}) //save the input in the text bar to load the img
    };

    onFaceDetectSubmit = () =>{
        this.setState({ImgUrl:this.state.input}) //save the input when the user click the button
        const {input,user} = this.state;
        fetch("https://agile-oasis-93353.herokuapp.com/imageurl",{
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input : input,
            })
        })
        .then(response => response.json())
        .then((response)=>{
            if(response){
                fetch("https://agile-oasis-93353.herokuapp.com/img",{
                    method : 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id : user.id,
                    })
                })
                .then(response => response.json())
                .then(count =>{
                        this.setState(Object.assign(user, { entries : count }))
                })
                .catch(console.log)
            }
            this.displayBox(this.calculateFaceLocation(response))
        })
        .catch(err=> console.log(err));
    };
    
    onCelebDetectSubmit = () =>{
        this.setState({ImgUrl:this.state.input})
        const {input,user} = this.state;
        fetch("https://agile-oasis-93353.herokuapp.com/celeburl",{
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input : input,
            })
        })
        .then(response => response.json())
        .then((response)=>{
            this.celebDisplayBox(this.calculateCelebFaceLocation(response))
            if(response){
                fetch("https://agile-oasis-93353.herokuapp.com/img",{
                    method : 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id : user.id,
                    })
                })
                .then(response => response.json())
                .then(count =>{
                        this.setState(Object.assign(user, { entries : count }))
                })
                .catch(console.log)

            }  
        })
            //console.log(response.outputs[0].data.regions[0].data.concepts))
        .catch(err=> console.log(err));
    };

    onRouteChange= (newRoute) =>{

        if(newRoute === 'signout'){
            this.setState(initialState)
        }
        else if(newRoute === 'home'){
            this.setState({isSignedIn : true})
        }
        this.setState({Route : newRoute})
    };

    loadUser= (userData)=>{
        this.setState({user : {
            id:userData.id,    
            email : userData.email,
            name : userData.name,
            entries: userData.entries,
            joined : userData.joined
        }})
    }
    

    render(){
        
        const {ImgUrl,Facebox,celebArr,celebbox,Route,isSignedIn,Show_celebs,user}=this.state;
        document.body.style.zoom = "80%";
        return (
            <div className="App">
                <ParticlesInit /> 
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} currRoute={Route}/>
                <Logo/>
                { Route === 'home' 
                ? //if
                (<div>
                    <Rank name = {user.name} entries = {user.entries} />
                    <ImageLinkForm onInputChange={this.onInputChange} onFaceDetectSubmit={this.onFaceDetectSubmit} onCelebDetectSubmit={this.onCelebDetectSubmit}/>
                    <FaceRecognition Celebbox = {celebbox} Facebox = {Facebox} ImgUrl={ImgUrl}/>
                    {Show_celebs ?
                    <BasicTable DATA={celebArr} />
                    :
                    null
                    }
                </div>
                )    
                : //else
                
                (
                    (Route === 'signin' || Route === 'signout') 
                ?
                    <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                :
                <>{
                    (Route === 'profile') ?
                    <Profile user={user}/>
                    :
                    <Register  onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                }    
                </>
                )
            }
            </div>
        );
}
}

export default App;
