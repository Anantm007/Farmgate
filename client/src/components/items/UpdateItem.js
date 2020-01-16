import React, {Fragment, useState, useEffect} from 'react';
import {getItem, Update} from './apiItems';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';

const UpdateItem = (props) => {

    const itemid = props.match.params.itemid;


    const [values, setValues] = useState({
        name: '',
        image: '',
        price: '',
        variant: '',
        quality: '',
        description: '',
        error: '',
        loading: false,
        success: false,
        inStock: '',
        formData: new FormData()
    });

    const {name, price, variant, quality, description, loading, error, success, inStock, formData} = values;
    
    const loadItem = () => {
        setValues({...values, loading: true})
        getItem(itemid).then(data => {
            if(data.success === false)
            {         
                setValues({...values, error: data.message});
                setValues({...values, loading: false})
            }
  
            else
            {
            setValues({...values, name: data.data.name, description: data.data.description, 
                price: data.data.price, variant: data.data.variant, quality: data.data.quality, inStock: data.data.inStock, loading:false
            })

            }
        })
    }
  
    
    useEffect(() => {
        loadItem();
        // eslint-disable-next-line
    }, [])
    

    const handleChange = name => e => {
        const value = name ==='image' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value}) 
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        
        Update( itemid,formData)
        .then(data => {
            console.log(data)
            if(data.success === false)
            {
                setValues({...values, error: data.message});
            }

            else
            {
                setValues({
                    ...values, name: '', image: '', price: '', variant: '', quality: '', description: '', loading: false, error: '',
                    success: true, formData: ''
                })
            }
        })
    }

    const newPostForm = () => (
        
        <form className="mb-3" onSubmit={clickSubmit}>
                {showLoading()}

            <div className="form-group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            
            <h6>Item image (less than 1MB) (Don't choose any file if you don't want to update it)</h6>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>
            
            <div className="form-group">
                <label>Type per price</label>
                <select onChange={handleChange('variant')} className="form-control" value={variant}>
                    <option>Select</option>
                        <option value="Kg.">Kg.</option>
                        <option value="Dozen">Dozen</option>
                        <option value="Bunch">Bunch</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quality</label>
                <select onChange={handleChange('quality')} className="form-control" value={quality}>
                    <option>Select</option>
                        <option value="Organic">Oragnic</option>
                        <option value="Fresh">Fresh</option>
                        <option value="No Chemical">No Chemical</option>
                </select>
            </div>

            <div className="form-group">
                <label>In Stock</label>
                <select onChange={handleChange('inStock')} className="form-control" value={inStock}>
                    <option>Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
            </div>

            <br/>
            <div className="text-center">
                <button className="btn btn-outline-primary">Edit Item</button>
                <br/><br />
                {showError()}
                {showSuccess()}
                {showLoading()}
            </div>
            <br/>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Item updated Succesfully
        </div>)
    }

    const showLoading = () => (
        loading && <Spinner/>
    )


    return (
        <Fragment>
            <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                <h1>Edit Item</h1>
            </div>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
            <Footer/>

        </Fragment>
    )


}

export default UpdateItem;