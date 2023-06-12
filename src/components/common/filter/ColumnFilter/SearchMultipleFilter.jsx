import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

const SelectMultipleFilter = ({
  column: { filterValue = [], setFilter, preFilteredRows, id }
}) => {
  const options = React.useMemo(() => {
    const options = [];
    preFilteredRows.forEach(row => {
      options.push({ label: row.values[id], value: row.values[id] });
    });
    return _.uniqWith(options, _.isEqual);
  }, [id, preFilteredRows]);

  return (
    <Select
      className="basic-multi-select"
      isMulti
      placeholder=""
      // menuIsOpen
      isClearable
      options={options}
      value={options.filter(item => filterValue.includes(item.value))}
      onChange={choices => {
        const values = choices.map(choice =>
          typeof choice === 'string' ? choice : choice.value
        );
        setFilter(values);
      }}
    />
  );
};

export default SelectMultipleFilter;
