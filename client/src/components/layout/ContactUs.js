import React, {Fragment} from 'react';

const ContactUs = () => {
    return (
        <Fragment>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">CONTACT US</h1>
                    <p className="lead text-muted mb-0">We would love to hear feedback from you</p>
                </div>
            </section>

<div className="container">
    <div className="row">
        <div className="col">
            <div className="card">
                <div className="card-header bg-primary text-white"><i className="fa fa-envelope"></i> Contact us.</div>

                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Your name" required />
                        </div>
                        <div className="form-group">
                            <label for="email">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email" required />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label for="message">Message</label>
                            <textarea className="form-control" id="message" rows="6" required></textarea>
                        </div>
                        <div className="mx-auto">
                        <button type="submit" className="btn btn-primary text-right">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-4">
            <div className="card bg-light mb-3">
                <div className="card-header bg-success text-white text-uppercase"><i className="fa fa-home"></i> Address</div>
                <div className="card-body">
                    <p>Your office address</p>
                    <p>POSTCODE, Adealide</p>
                    <p>Australia</p>
                    <p>Email : farmgateishere@gmail.com</p>
                    <p>Tel. +61 438 807 530</p>

                </div>

            </div>
        </div>
    </div>
</div>


        </Fragment>
    )
}

export default ContactUs
