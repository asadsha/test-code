import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerPrimary from '../../helper/Container';
import Select from 'react-select';
import { SelectStyle } from '../../styles/react-select/SelectStyle';
import { NotificationManager } from 'react-notifications';

const AddNewCar = ({ close, categories, setList, list, selectedCategory }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let obj = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    obj.categoryId = categoryId;
    axios
      .post('/cars', obj)
      .then((res) => {
        NotificationManager.success('Successfully Added', 'Success');
        if (selectedCategory === categoryId) {
          setList([...list, obj]);
        }
        close();
        setLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(err?.response?.data?.message, 'Error');
        setLoading(false);
      });
  };

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
                    name='name'
                    placeholder='Full name'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <input
                    className='form-control br  text-center'
                    type='text'
                    name='regNo'
                    placeholder='Registration No'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <input
                    className='form-control br  text-center'
                    type='text'
                    name='model'
                    placeholder='Model'
                    required
                  />
                </div>

                <div className='mb-3'>
                  <input
                    className='form-control br  text-center'
                    type='text'
                    name='color'
                    placeholder='Color'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <Select
                    options={categories}
                    placeholder='Select Category'
                    styles={SelectStyle}
                    onChange={(e) => {
                      setCategoryId(e.value);
                    }}
                  />
                </div>
                <div className='mb-4'>
                  <button className='btn btn-primary br  w-100' type='submit'>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ContainerPrimary>
    </main>
  );
};

export default AddNewCar;
