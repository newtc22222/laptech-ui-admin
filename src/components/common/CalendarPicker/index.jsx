import React from 'react';
import { DayPicker } from 'react-day-picker';
import { formatDateTime } from '../../../utils';

import 'react-day-picker/dist/style.css';

const CalendarPicker = ({ selected, setSelected, ...props }) => {
  let footer = props.footer || <p>Please pick a day.</p>;
  if (selected) {
    footer = props.footer || (
      <p className="fw-bold">
        Date picked: {formatDateTime(selected).slice(9)}.
      </p>
    );
  }
  return (
    <DayPicker
      mode="single"
      required
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
};

export default CalendarPicker;
