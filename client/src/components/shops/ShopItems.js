import React, { Fragment, useState } from 'react'
import {addToCart, updateUser} from '../user/apiUser';
import Spinner from '../layout/Spinner';
import {isAuthenticated} from '../userAuth';

const ShopItems = ({item, index, setRun = f => f, run=undefined, showCartButton}) => {

    const [values, setValues] = useState({
        success: false,
        error: '',
        loading: false,
    });

    const {success, error, loading} = values;


    const addCart = () => {
        if(!isAuthenticated()) 
        {
            window.location.href = '/user/login'
        }
        setValues({...values, loading: true, error: false, success: false});
        addToCart(item._id)
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, success: false, error: data.message, loading: false});
            }

            else
            {
                updateUser(data.data, () => {
                    setValues({...values, success: true, error: false, loading: false});
                })
                setTimeout(() => setValues({...values, success: false}), 5000)
                let imgtodrag = document.getElementsByClassName('product')[index];
                let imgtodragImage = imgtodrag.querySelector('.hideImage');
                console.log(imgtodragImage)
        
                let disLeft= imgtodrag.getBoundingClientRect ().left;
                let disTop= imgtodrag.getBoundingClientRect ().top;
                let cartleft= 0.75 * window.screen.width;
                let carttop= 0.04 * window.screen.height;
                let image = imgtodragImage;
        
                image.style ='z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:'+ disTop+'px;left:'+ disLeft+'px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)';
                var rechange=document.body.appendChild(image);
                
                setRun(!run);
                setTimeout(function() {
                    image.style.left=cartleft+'px';
                    image.style.top=carttop+'px';
                    image.style.width='40px';
                    image.style.opacity='0';
                }, 200);
                setTimeout(function() {
                    rechange.parentNode.removeChild(rechange);
                }, 2000);

               
            }
        })
    }

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    
    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success === true ? '': 'none'}}>
            Item added to cart successfully!
        </div>
        )
    }

    const showLoading = () => 
            loading && <Spinner/>


    return (
        <Fragment>
            
            <div className="row">
                
                { loading ? showLoading() : <div className="flip-card product" style={{margin: "2rem"}}>
                    <div className="flip-card-inner" key={index} style={{backgroundImage: `url(/api/items/photo/${item._id}`, backgroundSize: '19rem 20rem', borderRadius: '.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <img src={`/api/items/photo/${item._id}`} className="hideImage" style={{height: '0', width: '0'}} alt="img"/>
                        <div className="flip-card-front">
                        <h4 style={{  textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff', color: 'black'}}>{item.name}</h4>
                        <span className="badge badge-success badge-pill">{item.quality}</span><br/><br/>
                        {item.inStock && showCartButton && <button className="btn btn-danger" onClick={addCart}>Add to Cart</button>}
                        </div>
                        
                    </div>
                    <br/>
                    <div  style={{backgroundColor: success ? 'none': '', textAlign: 'center', marginTop: '-1em', marginBottom: '1em'}}>
                    <strong>{success ? 
                    '' : error ? '' : '$' + item.price + ' per ' + item.variant}</strong>
                    </div>
                    <p style={{border: success ? 'none': 'solid 1px', textAlign: 'center', borderWidth: 'thin', padding: '0.5em'}}>{success ? 
                    showSuccess() : error ? showError() : item.description}</p>
                    <br/>
                    </div>}

            </div>
        
        </Fragment>
  )
}

export default ShopItems
