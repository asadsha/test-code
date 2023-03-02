import React from 'react';
import { Link } from 'react-router-dom';

const Email = () => {
  return (
    <section className='py-md-5'>
      <div className='py-5 text-center gap-2 d-flex flex-wrap justify-content-center align-items-center'>
        <h4 className='mb-0 fw-normal'>Verification Email sent.</h4>
        <Link to='/' className='btn p-0 link-primary'>
          <h4 className='mb-0 fw-normal'>Home</h4>
        </Link>
      </div>
    </section>
  );
};

export default Email;
