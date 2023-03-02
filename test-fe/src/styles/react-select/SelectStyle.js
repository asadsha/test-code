export const SelectStyle = {
  option: (styles, state) => ({
    ...styles,

    backgroundColor: state.isSelected && '#ff6700',
    color: state.isSelected ? '#fff' : '#000',

    '&:hover': {
      backgroundColor: '#f26200',
      color: '#fff',
    },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 1000000000000,
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'unset',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#ced4da' : '#c2c2c2',
    color: state.isSelected ? '#ff6700' : '#000',
    '&:hover': {
      borderColor: '#ced4da',
    },
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    // color: '#ff6700',
  }),
  // singleValue: (styles) => ({
  //   ...styles,
  //   color: '#ff6700',
  // }),
};
