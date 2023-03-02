import React, { useState } from 'react';
import axios from 'axios';
import ContainerPrimary from '../../helper/Container';
import { NotificationManager } from 'react-notifications';

const AddNewCar = ({
  close,
  setCategories,
  categories,
  setCategoriesList,
  categoriesList,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let obj = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    axios
      .post('/categories', obj)
      .then((res) => {
        NotificationManager.success('Successfully Added', 'Success');
        setCategoriesList([...categoriesList, obj]);
        setCategories(categories);
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
                  <input
                    className='form-control br  text-center'
                    type='text'
                    name='name'
                    placeholder='Full name'
                    required
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
