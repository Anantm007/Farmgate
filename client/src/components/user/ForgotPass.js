import React, {useState} from 'react'
import {forgot} from '../userAuth';
const ForgotPass = () => {
    
    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false,
        loading: false,
    });

    const {email, loading, success, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        forgot({email})
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false, loading: false})
            }
            else
            {
                setValues({...values, success: true, error: false, loading: false});    
            }
        })

    }

    const showLoading = () => 
        
    loading && (<div className="alert alert-info">
        <h2>Loading...</h2>
    </div>);


    
    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Instructions to reset password have been sent! Please check your email
        </div>)
    }


    return (
        <div id="pwdModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="text-center">Forgot Your Password?</h1>
                            </div>
                            <div class="modal-body">
                                <div class="col-md-12">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="text-center">
                                                
                                                <p>If you have forgotten your password you can reset it here.</p>
                                                    <div class="panel-body">
                                                        <form>
                                                            <div class="form-group">
                                                                <input class="form-control input-lg" placeholder="E-mail Address" onChange={handleChange('email')} type="email" value={email} />
                                                            </div>
                                                            <button onClick={clickSubmit} className="btn btn-lg btn-primary btn-block">Submit</button>  
                                                            <br />
                                                            {showLoading()}                      
                                                            {showError()}
                                                            {showSuccess()}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <div class="col-md-12 text-right">
                                <button className="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                                </div>	
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default ForgotPass
