import React from "react";
import './Signin.css';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail : '',
            signInPassword: '',
            error : false
        }
    }

    onEmailChange= (changeEvent)=>{
        this.setState({signInEmail : changeEvent.target.value});
    }

    onPasswordChange= (changeEvent)=>{
        this.setState({signInPassword : changeEvent.target.value});
    }
    onSubmit = () =>{
        fetch("https://agile-oasis-93353.herokuapp.com/signin",{
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email : this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user =>{
                if(user.id){
                    this.setState({error : false});
                    this.props.loadUser(user);
                    this.props.onRouteChange("home");   
                }
                else{
                    this.setState({error : true});
                }
        })
    }


    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                            <div className="fw6 ph0 mh0">
                            {`${this.state.error ? "INCORRECT PASSWORD OR EMAIL" : ""}`}     
                            </div>
                        </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" onClick={() => this.props.onRouteChange("register")} className="f6 link dim black db pointer">Register</a>
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default Signin;