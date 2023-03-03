import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerPrimary from '../../helper/Container';
import CarsList from './carsList';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { SelectStyle } from '../../styles/react-select/SelectStyle';
import AddNewCar from '../modals/addCar';
import AddCategory from '../modals/addCategory';
import CategoriesListPage from '../Categories/list';

const Dashboard = () => {
  const [list, setList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState(false);
  const [show, setShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    { label: 'A to Z', value: 'a to z' },
    { label: 'Z to A', value: 'z to a' },
  ];

  // get categories
  useEffect(() => {
    axios
      .get(`/categories`)
      .then((res) => {
        setCategoriesList(res.data.categories);
        setSelectedCategory(res.data.categories[0]._id);
        setLoading(false);
        // setting up categories for dropdown options
        let result = res.data.categories;
        let newResult = [];
        result.map((el) => {
          newResult.push({ label: el.name, value: el._id });
        });
        setCategories(newResult);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  // sorting
  const sortTable = (type) => {
    if (type === 'a to z') {
      list.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    } else {
      list.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
    }
    setList([...list]);
    console.log(list);
  };
  // getting cars by category
  useEffect(() => {
    if (selectedCategory !== null) {
      axios
        .get(`/cars/?category=${selectedCategory}`)
        .then((res) => {
          setLoading(false);
          setList(res.data.cars);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [selectedCategory]);

  return (
    <main className='h-100 py-5'>
      <ContainerPrimary>
        <div className='col-12 px-0'>
          {categories.length > 0 && (
            <div className='d-flex justify-content-between'>
              <div className='mb-3'>
                <h6>Category</h6>
                <Select
                  options={categories}
                  value={categories.find((el) => el.value === selectedCategory)}
                  placeholder='Select Category'
                  styles={SelectStyle}
                  onChange={(e) => setSelectedCategory(e.value)}
                />
              </div>
              <div className='mb-3'>
                <h6>Sort</h6>
                <Select
                  options={sortOptions}
                  placeholder='Select Sorting'
                  styles={SelectStyle}
                  onChange={(e) => sortTable(e.value)}
                />
              </div>
            </div>
          )}
        </div>
        {/* Table */}
        <div className='border-top mt-4 pt-4'>
          <h1>Cars</h1>
          <div className='pb-2 col-7 col-sm-4 col-md-3 px-0 d-flex'>
            <Button onClick={() => setShow(true)}>Add New Car</Button>
          </div>
          {list.length > 0 && <CarsList list={list} />}
        </div>

        {/* Table */}
        <div className='border-top mt-4 pt-4'>
          <h1>Categories</h1>
          <div className='pb-2 col-7 col-sm-4 col-md-3 px-0 d-flex'>
            <Button
              style={{ marginLeft: '15px' }}
              onClick={() => setCategoryShow(true)}
            >
              Add New Category
            </Button>
          </div>
          {categoriesList.length > 0 && (
            <CategoriesListPage list={categoriesList} />
          )}
        </div>
        {/* /Table */}

        <Modal
          contentClassName='rounded-lg '
          size='lg'
          centered
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Body>
            {
              <AddNewCar
                close={() => setShow(false)}
                categories={categories}
                setList={setList}
                list={list}
                selectedCategory={selectedCategory}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          contentClassName='rounded-lg '
          size='lg'
          centered
          show={categoryShow}
          onHide={() => setCategoryShow(false)}
        >
          <Modal.Body>
            {
              <AddCategory
                close={() => setCategoryShow(false)}
                setCategoriesList={setCategoriesList}
                setCategories={setCategories}
                categories={categories}
                categoriesList={categoriesList}
              />
            }
          </Modal.Body>
        </Modal>
      </ContainerPrimary>
    </main>
  );
};

export default Dashboard;
