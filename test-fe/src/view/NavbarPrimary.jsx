import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userAuthentication';
import ContainerPrimary from '../helper/Container';

const NavbarPrimary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className='bg-white border-bottom py-2 position-sticky fixed-top'>
      {/* Desktop */}
      <ContainerPrimary>
        <div className='d-flex flex-wrap align-items-center'>
          <div className='ms-auto d-flex'>
            <ul className='nav align-items-center'>
              <li className='nav-item'>
                <Dropdown className='dropdown-remove-arrow'>
                  <Dropdown.Menu className=' rounded-lg'>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(logout());
                        // setTimeout(() => {
                        navigate('/');
                        // }, 500)
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='dropdown-remove-arrow'>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(logout());
                      // setTimeout(() => {
                      navigate('/');
                      // }, 500)
                    }}
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </ContainerPrimary>
    </nav>
  );
};

export default NavbarPrimary;
