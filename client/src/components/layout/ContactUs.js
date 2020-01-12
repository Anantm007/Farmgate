import React, {Fragment} from 'react';

const ContactUs = () => {
    return (
        <Fragment>
            <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">CONTACT US</h1>
                    <p class="lead text-muted mb-0">We would love to hear feedback from you</p>
                </div>
            </section>

<div class="container">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header bg-primary text-white"><i class="fa fa-envelope"></i> Contact us.</div>

                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Your name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email" required />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea class="form-control" id="message" rows="6" required></textarea>
                        </div>
                        <div class="mx-auto">
                        <button type="submit" class="btn btn-primary text-right">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="card bg-light mb-3">
                <div class="card-header bg-success text-white text-uppercase"><i class="fa fa-home"></i> Address</div>
                <div class="card-body">
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
