import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signup, authenticate, shopIsAuthenticated} from '../shopAuth';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        address: '',
        zipCode: '',
        phoneNumber: '',
        error: '',
        description: '',
        success: false
    });

    const {name, email, password, repeatPassword, address, zipCode, phoneNumber, description, success, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    
        const clickSubmit = (e) => {
        const captcha = document.querySelector('#g-recaptcha-response').value;

         e.preventDefault();
         console.log(password, repeatPassword)
         if(password !== repeatPassword)
          {
            setValues({...values, error: "Passwords do not Match" });
            return;
          }  
        setValues({...values, error: false});
        signup({name, email, password, address, zipCode, phoneNumber, description, captcha})
        .then(data => {
            
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false})
            }
            else if(data.success === true)
            {
                window.location.reload(false); // To reload the page for navbar updation
                authenticate(data, () => {
                    setValues({...values, loading: false});
                })
            }
        })

    }

    const signUpForm = () => (
        
                <div className="container">
                    <br/><br/>  
                    
                    <div className="card bg-light">
                    <article className="card-body mx-auto" style={{maxWdith: "400px"}}>
                        <h4 className="card-title mt-3 text-center">Create a Shop Account</h4>
                        <p className="text-center">Get started with your free account</p>
                        
                        <form>
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input onChange={handleChange('name')} type="text" value={name} className="form-control" placeholder="Full name" />
                        </div>
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input onChange={handleChange('email')} type="email" value={email} className="form-control" placeholder="Your Email address" />
                        </div> 
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input onChange={handleChange('phoneNumber')} type="Number" value={phoneNumber} className="form-control" placeholder="Your Phone Number" />
                        </div> 
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('password')} value={password} className="form-control" placeholder="Enter a Password" type="password" />
                        </div> 
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('repeatPassword')} value={repeatPassword} className="form-control" placeholder="Confirm Password" type="password" />
                        </div>
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-home"></i> </span>
                            </div>
                            <input onChange={handleChange('address')} type="text" value={address} className="form-control" placeholder="Full address" />
                        </div>
                         
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-home"></i> </span>
                            </div>
                            <input onChange={handleChange('zipCode')} type="Number" value={zipCode} className="form-control" placeholder="Your Zip Code" />
                        </div>

                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-pen"></i> </span>
                            </div>
                            <textarea onChange={handleChange('description')} type="Number" value={description} className="form-control" placeholder="A Detailed Shop Description" />
                        </div>                              
                        
                        <br />
                        <div className="g-recaptcha" onChange={handleChange('g-recaptcha-response')} data-sitekey="6LeJ284UAAAAAHLyxMvzoMiOLWIpEvC3CjJxc25Y"></div>
                        <br />
                        <div className="form-group">
                            <button onClick={clickSubmit} className="btn btn-primary btn-block"> Create Account  </button>
                        </div>
                        {showError()}       
                        <p className="text-center">Have an account? <a href="/shop/login">Log In</a> </p>                                                                 
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

    const redirectShop = () => {
        if(shopIsAuthenticated())
        {
            return <Redirect to="/shop/dashboard" />
        }
    };



    return (
        <div style ={{ backgroundImage: "url("+"https://inhabitat.com/wp-content/blogs.dir/1/files/2017/05/Fresh-Food-Health.jpg"+")" }}>
            {showSuccess()}
            {signUpForm()}
            {redirectShop()}
        </div>
    )
};

export default Register;