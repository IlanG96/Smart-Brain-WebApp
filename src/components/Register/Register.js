import React from "react";
import './Register.css';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Username:'',
            Email : '',
            Password : '',
            validEmail:true,
            validname:true,
            emailExist:false
        }
    }
    onEmailChange = (ChangeEvent)=>{
        this.setState({Email : ChangeEvent.target.value})
    }
    onPasswordChange = (ChangeEvent)=>{
        this.setState({Password : ChangeEvent.target.value})
    }
    onUserNameChange = (ChangeEvent)=>{
        this.setState({Username : ChangeEvent.target.value})
    }
    
    onSubmitRegistration = () =>{
        const {Username,validEmail,validname,Password,Email}=this.state;
        if(!Username || (/\d/.test(Username))){
            this.setState({validname:false})
        }
        else{
            this.setState({validname:true}) 
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.Email) && validname)
        {
        fetch("https://agile-oasis-93353.herokuapp.com/register",{
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: Username,
                email : Email,
                password: Password
                })  
            })
            .then(response => response.json())
            .then(user => {
                if(user !== "Unable to register"){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else{
                    this.setState({emailExist:true});
                }
            
            })
        }
        else{
            this.setState({validEmail:false})
        }

    }

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="username"  
                                id="username"
                                onChange={this.onUserNameChange} 
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="dark-red">
                            {`${!this.state.validEmail ? "Invalid email format " : ""}`}
                            <br/>
                            {`${!this.state.validname ? "Invalid name format " : ""}`}
                            <br/>
                            {`${this.state.emailExist ? "Email already exist." : ""}`}     
                        </div>
                        <div className="">
                            <input onClick={this.onSubmitRegistration} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </main>
            </article>

            );
    }
}

export default Register;