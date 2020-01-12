import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../userAuth';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
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
            console.log(data)
            if(data.success === false)
            {
                setValues({...values, error: data.message, loading: false})
            }
            else
            {
                authenticate(data, () => {
                    setValues({...values, loading: false});
                })
            }
        })

    }

    const signUpForm = () => (
        <div class="container">
                    <br/><br/>  
                    
                    <div class="card bg-light">
                    <article class="card-body mx-auto" style={{maxWdith: "400px"}}>
                        <h4 class="card-title mt-3 text-center">Login to your Account</h4>
                        <p class="text-center">Login now to order fresh organic food</p>
                        
                        <form>
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                            </div>
                            <input onChange={handleChange('email')} type="email" value={email} class="form-control" placeholder="Your Email address" />
                        </div> 
                        
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input onChange={handleChange('password')} value={password} class="form-control" placeholder="Enter a Password" type="password" />
                        </div> 
                        
                        <br />
                        <div class="form-group">
                            <button onClick={clickSubmit} class="btn btn-primary btn-block"> Sign In</button>
                        </div>  
                        <br /><br />     
                        <p class="text-center">Don't Have an account? <a href="/user/register">Register</a> </p>                                                                 
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
        
            loading && (<div className="alert alert-info">
                <h2>Loading...</h2>
            </div>);

    const redirectUser = () => {
            if(isAuthenticated())
            {
                return <Redirect to="/user/dashboard" />
            }
        };


    return (
        <div style ={{ backgroundImage: "url("+"https://inhabitat.com/wp-content/blogs.dir/1/files/2017/05/Fresh-Food-Health.jpg"+")" }}>
            {showError()}
            {showLoading()}
            {redirectUser()}
            {signUpForm()}
        </div>
           
    )
};

export default Login;