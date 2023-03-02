import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userAuthentication';
import { NotificationManager } from 'react-notifications';
import ContainerPrimary from '../../helper/Container';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null
    ) {
      navigate('/');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let obj = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    axios
      .post('/auth/signin', obj)
      .then((res) => {
        dispatch(loginUser(res.data.token));
        NotificationManager.success('Authenticated Successfully', 'Success');
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        NotificationManager.error(err?.response?.data?.message, 'Error');
        setLoading(false);
      });
  };

  return (
    <main className='h-100 py-5'>
      <ContainerPrimary>
        {socialLoading ? (
          <div
            className='col-12 d-flex justify-content-center align-items-center'
            style={{ minHeight: '64vh' }}
          >
            <Spinner animation='border' variant='warning' size='lg' />
          </div>
        ) : (
          <div className='col-12 col-md-6 col-lg-5 col-xl-4 mx-auto'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='bg-light  rounded-lg text-center p-4'>
                <div className='col-12 col-sm-8 col-md-10 mx-auto'>
                  <div className='mb-3'>
                    <button type='button' className='btn opacity-50'>
                      <i className='display-3 mdi mdi-fingerprint' />
                    </button>
                  </div>
                  <div className='mb-3'>
                    <input
                      className='form-control br  text-center'
                      type='email'
                      name='email'
                      placeholder='Email'
                      required
                    />
                  </div>
                  <div className='mb-3'>
                    <input
                      className='form-control br  text-center'
                      type='password'
                      name='password'
                      placeholder='Password'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <button
                      className='btn btn-primary br  w-100'
                      type='submit'
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation='border' size='sm' />
                      ) : null}
                      <span className='px-2'> Sign in</span>
                    </button>
                  </div>
                  <div className='border-top w-50 mx-auto' />
                  <div className='mt-3'>
                    <span>
                      Do not have an account ? <br /> You can{' '}
                      <Link to='/sign-up' className='link-primary'>
                        Sign up.
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </ContainerPrimary>
    </main>
  );
};

export default SignInPage;
