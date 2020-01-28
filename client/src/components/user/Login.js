import React, {Fragment, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../userAuth';
import ForgotPass from './ForgotPass';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';
 
const Login = () => {

    const [values, setValues] = useState({
        email: 'anant.mathur007@gmail.com',
        password: 'abcd1234',
        error: '',
        loading: false,
    });

    const {email, password, loading, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };
    
        const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, loading: false})
            }
            else
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
                        <h4 className="card-title mt-3 text-center">Login to your Account</h4>
                        <p className="text-center">Login now to order fresh organic food</p>
                        
                        <form>
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input onChange={handleChange('email')} type="email" value={email} className="form-control" placeholder="Your Email address" />
                        </div> 
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('password')} value={password} className="form-control" placeholder="Enter a Password" type="password" />
                        </div> 
                        
                        <br />
                        <div className="form-group">
                            <button onClick={clickSubmit} className="btn btn-primary btn-block"> Sign In</button>
                        </div>  
                        <br />

                    {/* Forgot Password */}                    
                        <div className="container">
                        <a href="#" data-target="#pwdModal" data-toggle="modal">Forgot my password</a>
                        </div>

                        <ForgotPass id="pwdModal" />
                        
                    {/* Forgot Password end */}

                        <br /><br />     
                        <p className="text-center">Don't Have an account? <a href="/user/register">Register</a> </p>                                                                 
                    </form>
                    <br /><br />
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

    const showLoading = () => 
        
            loading && <Spinner/>

    const redirectUser = () => {
            if(isAuthenticated() && isAuthenticated().user.role === 0)
            {
                return <Redirect to="/user/dashboard" />
            }
            
            if(isAuthenticated() && isAuthenticated().user.role === 1)
            {
                return <Redirect to="/admin/dashboard" />
            }
        };


    return (
        loading ? <div>{showLoading()}</div> : (<Fragment>
            <div style ={{ backgroundImage: "url(https://inhabitat.com/wp-content/blogs.dir/1/files/2017/05/Fresh-Food-Health.jpg)" }}>
                {showError()}
                {showLoading()}
                {redirectUser()}
                {signUpForm()}
            </div>
            <Footer/>
        </Fragment>)
           
    )
};

export default Login;