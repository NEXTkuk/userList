import React from 'react';

export const Dropdown = ({ users, selectedValue, setSelectedValue }) => {
  const inputRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState('');
  const [valueResults, setValueResults] = React.useState([]);

  const handleSelectBtnClick = (flag) => {
    setIsOpen(flag);
    if (flag == true) {
      inputRef.current.focus();
    }
  };

  const handleItemClick = (name) => {
    const selectedItemIndex = selectedValue.indexOf(name);

    if (selectedItemIndex === -1) {
      setSelectedValue([...selectedValue, name]);
      setInputValue('');
    } else {
      const updatedSelectedItems = [...selectedValue];
      updatedSelectedItems.splice(selectedItemIndex, 1);
      setSelectedValue(updatedSelectedItems);
    }
  };

  const onClear = () => {
    setSelectedValue([]);
  };

  const onClearLast = () => {
    const updatedSelectedItems = [...selectedValue];
    updatedSelectedItems.pop();
    setSelectedValue(updatedSelectedItems);
  };

  React.useEffect(() => {
    const results = users.filter((user) => user.name.toLowerCase().includes(inputValue.toLowerCase()));
    setValueResults(results);
  }, [inputValue]);

  return (
    <>
      <div
        className={`dropDown ${isOpen ? 'open' : ''}`}
        onClick={() => handleSelectBtnClick(true)}
        onBlur={() => setTimeout(() => handleSelectBtnClick(false), 100)}
      >
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isOpen ? '' : 'Select name'}
          autoComplete='off'
          onMouseOver={(e) => (e.currentTarget.placeholder = 'Enter a name')}
          onMouseLeave={(e) => (e.currentTarget.placeholder = 'Select name')}
        />

        {/* <span className='btn-text'>Select name</span> */}
        <span className='arrow-dwn'>
          <svg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.4625 0.292486L5.5825 4.17249L1.7025 0.292486C1.51567 0.105233 1.26202 0 0.9975 0C0.732982 0 0.479331 0.105233 0.2925 0.292486C-0.0975 0.682486 -0.0975 1.31249 0.2925 1.70249L4.8825 6.29249C5.2725 6.68249 5.9025 6.68249 6.2925 6.29249L10.8825 1.70249C11.2725 1.31249 11.2725 0.682486 10.8825 0.292486C10.4925 -0.0875144 9.8525 -0.0975144 9.4625 0.292486Z'
              fill='white'
            />
          </svg>
        </span>
      </div>

      <ul className={`dropDown-items ${isOpen ? 'open' : ''}`}>
        {valueResults.map((user, i) => (
          <li
            key={i}
            className={selectedValue.includes(user.name) ? 'item checked' : 'item'}
            onClick={() => handleItemClick(user.name)}
          >
            <span className='checkbox' defaultChecked={true}></span>
            <span className='item-text'>{user.name}</span>
          </li>
        ))}
      </ul>

      <div className='filter'>
        <div className='filter_block'>
          <div className='counter'>Filter: {selectedValue.length}</div>
          <div className='clear' onClick={onClear}>
            Clear all
          </div>
        </div>
        <div className='filter_title'>
          Name:
          {selectedValue.length > 0 && (
            <>
              <span>{selectedValue.map((value) => value.split(' ')[0]).join(', ')}</span>

              <div className='clear_last' onClick={onClearLast}>
                <svg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.81804 0.257392C1.52515 -0.0355015 1.05027 -0.0355015 0.757379 0.257392C0.464485 0.550285 0.464486 1.02516 0.757379 1.31805L3.93936 4.50003L0.757409 7.68198C0.464516 7.97487 0.464515 8.44974 0.757409 8.74264C1.0503 9.03553 1.52518 9.03553 1.81807 8.74264L5.00002 5.56069L8.182 8.74267C8.47489 9.03557 8.94977 9.03557 9.24266 8.74267C9.53555 8.44978 9.53555 7.97491 9.24266 7.68201L6.06068 4.50003L9.24269 1.31802C9.53558 1.02512 9.53558 0.55025 9.24269 0.257357C8.9498 -0.0355363 8.47492 -0.0355359 8.18203 0.257357L5.00002 3.43937L1.81804 0.257392Z'
                    fill='#BFBFBF'
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
