import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../userAuth';
import Logo from '../../images/logo.png'

const Register = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        address: '',
        zipCode: undefined,
        phoneNumber: undefined,
        error: '',
        success: false
    });

    const {name, email, password, repeatPassword, address, zipCode, phoneNumber, success, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };
    
        const clickSubmit = (e) => {
         e.preventDefault();
         console.log(password, repeatPassword)
         if(password !== repeatPassword)
          {
            setValues({...values, error: "Passwords do not Match" });
            return;
          }  
        setValues({...values, error: false});
        signup({name, email, password, address, zipCode, phoneNumber})
        .then(data => {
            
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false})
            }
            else if(data.success === true)
            {
                setValues({...values, name: "", email: "", password: "", address: '', zipCode: '' , phoneNumber: '' , error: "", success: true});
            }
        })

    }

    const signUpForm = () => (
        
                <div class="container">
                    <br/><br/>  
                    
                    <div class="card bg-light">
                    <article class="card-body mx-auto" style={{maxWdith: "400px"}}>
                        <h4 class="card-title mt-3 text-center">Create Account</h4>
                        <p class="text-center">Get started with your free account</p>
                        
                        <form>
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                            </div>
                            <input onChange={handleChange('name')} type="text" value={name} class="form-control" placeholder="Full name" />
                        </div>
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                            </div>
                            <input onChange={handleChange('email')} type="email" value={email} class="form-control" placeholder="Your Email address" />
                        </div> 
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                            </div>
                            <input onChange={handleChange('phoneNumber')} type="Number" value={phoneNumber} class="form-control" placeholder="Your Phone Number" />
                        </div> 
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('password')} value={password} class="form-control" placeholder="Enter a Password" type="password" />
                        </div> 
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('repeatPassword')} value={repeatPassword} class="form-control" placeholder="Confirm Password" type="password" />
                        </div>
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-home"></i> </span>
                            </div>
                            <input onChange={handleChange('address')} type="text" value={address} class="form-control" placeholder="Full address" />
                        </div>
                         
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-home"></i> </span>
                            </div>
                            <input onChange={handleChange('zipCode')} type="Number" value={zipCode} class="form-control" placeholder="Your Zip Code" />
                        </div>                              
                        
                        <br />
                        <div class="form-group">
                            <button onClick={clickSubmit} class="btn btn-primary btn-block"> Create Account  </button>
                        </div>       
                        <p class="text-center">Have an account? <a href="/login">Log In</a> </p>                                                                 
                    </form>
                    </article>
                    </div> 
                </div> 
    );

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showSuccess = () => {
        return (
        <div className="alert alert-info" style={{display: success ? '': 'none'}}>
            New account is created. Please <Link to='/login'>Signin</Link>
        </div>
        )
    }


    return (
        <div style ={{ backgroundImage: "url("+"https://inhabitat.com/wp-content/blogs.dir/1/files/2017/05/Fresh-Food-Health.jpg"+")" }}>
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </div>
    )
};

export default Register;