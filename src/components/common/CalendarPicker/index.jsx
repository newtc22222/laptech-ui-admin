import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CalendarPicker = ({ selected, setSelected, ...props }) => {
  // let footer = props.footer || <p>Please pick a day.</p>;
  // if (selected) {
  //   footer = props.footer || <p>You picked {selected}.</p>;
  // }
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      // footer={footer}
    />
  );
};

export default CalendarPicker;
