import { useRef, useState, useEffect } from "react"
import React from "react";
import "./style.css";
import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";

const SignUp=()=> {
  const userRef= useRef()
  const errRef= useRef()
 
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(()=>{
    userRef.current.focus()
}, []
);
useEffect(()=>{
    setErrMsg('');
}, [ firstName, password]
);

const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(firstName, password)
    setFirstName('')
    setEmail('')
    setLastName('')
    setPassword('');
    setSuccess(true)
    Navigate('/Login')

}
  // toggle
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return(
    <> 
    {success ? (
      
        <section >
              <Navigate exact to='/Login'>SignUp</Navigate>
        </section>
    ): (
    <section className="form"  >
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} 
        aria-live="assertive" >{errMsg}</p>
      
        <form onSubmit={handleSubmit} >
          <h1>Sign Up</h1>
       <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            autoComplete="off"
            ref={userRef}
            required
            placeholder=" enter Firstname"
 ></input> <br/>
    <input
            className="form__input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            ref={userRef}
            autoComplete="off"
            required
            placeholder=" enter LastName"
 ></input> <br/>

            <input type="text"  
            className="form__input"
            id="email" 
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder=" enter Email"
            ></input> <br/>
            <Input
              className="form__input"
              id="password"
              placeholder=" create password"
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              value={values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            ></Input> <br/>

 <div className="btn">
              <button>Get Started</button>

       <p>_________ OR _________</p>
     
     </div>
        <div className="signin">
       <p className="signin">
           Already a QuickDish member?
           <a href="/Login" ><span>Sign In </span></a>
      </p>
      </div>
      </form>
    </section>
    )}
    </>
)
}
export default SignUp;
