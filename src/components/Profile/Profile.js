import React from "react";
// import './Profile.css';

const Profile = ({user}) =>{
    const timejoind=user.joined.split("T");
    return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="tc">
                    <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" class="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you"/>
                    <h1 className="f3 mb2">Name: {user.name}</h1>
                    <h2 className="f4 fw4 mt0">Email: {user.email}</h2>
                    <h2 className="f4 fw4 mt0">Entries: {user.entries}</h2>
                    <h2 className="f4 fw4 mt0">Join date: {timejoind[0]} Time: {timejoind[1]}</h2>
                </div>
            </article>

        );
    
}

export default Profile;