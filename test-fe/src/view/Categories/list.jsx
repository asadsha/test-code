import React, { useState, useRef, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarsList = ({ list }) => {
  const [listData, setListData] = useState([]);
  const sort = 2;
  const activePag = useRef(0);

  // use effect
  useEffect(() => {
    setListData([...list.slice(0, sort)]);
    chackboxFun();
  }, [list]);

  // paggination
  let paggination = Array(Math.ceil(list.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onChangePage = (i) => {
    activePag.current = i;
    setListData([
      ...list.slice(activePag.current * sort, (activePag.current + 1) * sort),
    ]);
  };

  const chackbox = document.querySelectorAll('.sorting_1 input');
  const motherChackBox = document.querySelector('.sorting_asc input');
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === 'all') {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const headList = [
    { name: 'Name', center: true, classes: 'justify-content-center' },
  ];

  return (
    <div className='mt-4'>
      <div className='border rounded-lg  dataTables_wrapper'>
        <Table responsive hover id='patientTable_basic_table' className='w-100'>
          <thead>
            <tr role='row'>
              {headList.map((item) => (
                <th>
                  {item.empty ? (
                    <></>
                  ) : (
                    <div
                      className={`d-flex align-items-center ${item.classes}`}
                    >
                      <span className='fw-bold'>{item.name}</span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border-0 table-border'>
            {listData.map((item) => (
              <tr role='row'>
                <td className='text-center col-2'>{item?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className='d-sm-flex text-center align-items-center justify-content-between px-3'>
          <div
            className='small'
            id='example_info'
            role='status'
            aria-live='polite'
          >
            Showing {activePag.current * sort + 1} to{' '}
            {list.length > (activePag.current + 1) * sort
              ? (activePag.current + 1) * sort
              : list.length}{' '}
            of {list.length} entries
          </div>

          <ul
            className='pagination gap-2 justify-content-center mt-3 mt-md-0'
            // id='example_paginate'
          >
            <li class='page-item'>
              <Link
                className='page-link'
                to='/'
                onClick={() =>
                  activePag.current > 0 && onChangePage(activePag.current - 1)
                }
              >
                <span aria-hidden='true'>&laquo;</span>
              </Link>
            </li>
            {paggination.map((number, i) => (
              <li class='page-item'>
                <Link
                  key={i}
                  to='/'
                  className={`page-link  ${
                    activePag.current === i ? 'current' : ''
                  } ${i > 0 ? 'ml-1' : ''}`}
                  onClick={() => onChangePage(i)}
                >
                  {number}
                </Link>
              </li>
            ))}
            <li class='page-item'>
              <Link
                className='page-link'
                to='/'
                onClick={() =>
                  activePag.current + 1 < paggination.length &&
                  onChangePage(activePag.current + 1)
                }
              >
                <span aria-hidden='true'>&raquo;</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarsList;
