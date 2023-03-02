import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { SelectStyle } from '../../styles/react-select/SelectStyle';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ContainerPrimary from '../../helper/Container';
import Email from './Email';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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
      .post('/auth/register', obj)
      .then((res) => {
        NotificationManager.success('Successfully Registered', 'Success');
        setLoading(false);
        setShow(true);
      })
      .catch((err) => {
        NotificationManager.error(err?.response?.data?.message, 'Error');
        setLoading(false);
      });
  };

  const handleClose = () => setShow(false);

  return (
    <main className='h-100 py-5'>
      <ContainerPrimary>
        <div className='col-12 col-md-6 col-lg-5 col-xl-4 mx-auto'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='bg-light  rounded-lg text-center p-4'>
              <div className='col-12 col-sm-8 col-md-10 mx-auto'>
                <div className='mb-3'>
                  <button type='button' className='btn opacity-50'>
                    <i className='display-5 mdi mdi-account-circle' />
                  </button>
                </div>
                <div className='mb-3'>
                  <input
                    className='form-control br  text-center'
                    type='text'
                    name='username'
                    placeholder='Full name'
                    required
                  />
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
                    type='text'
                    name='address'
                    placeholder='Address'
                    required
                  />
                </div>
                <div className='mb-3'>
                  {/* <Select
                    // isMulti
                    // options={options}
                    // value={categories}
                    placeholder='Select Category'
                    styles={SelectStyle}
                    onChange={(e) => {
                      // setSubCategories([]);
                      // categories[0] = e;
                      // setCategories([...categories]);
                    }}
                  /> */}
                </div>
                <div className='mb-4'>
                  <button
                    className='btn btn-primary br  w-100'
                    type='submit'
                    disabled={password !== password2}
                  >
                    Sign Up
                  </button>
                </div>
                <div className='border-top w-50 mx-auto' />
                <div className='mt-3'>
                  <span>
                    Already have an account.
                    <br /> You can{' '}
                    <Link to='/sign-in' className='link-primary'>
                      Sign In.
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <Modal
              contentClassName='rounded-lg '
              size='lg'
              centered
              show={show}
              onHide={handleClose}
            >
              <Modal.Body>{<Email />}</Modal.Body>
            </Modal>
          </form>
        </div>
      </ContainerPrimary>
    </main>
  );
};

export default SignUpPage;
