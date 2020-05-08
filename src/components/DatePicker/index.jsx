import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-US';

import './DatePicker.scss';

const DatePickerStyled = ({ name, date, setState }) => {
  const onDateChangedHandler = value =>
    setState(prevState => ({
      ...prevState,
      [name]: value.toDateString()
    }));

  registerLocale('en', en);
  registerLocale('es', es);

  const local = navigator.language.split(/[-_]/)[0];

  const dateFormat = navigator.language === 'es-US' ? 'MM-dd-yy' : 'dd-MM-yy';

  return (
    <DatePicker
      locale={local}
      dateFormat={dateFormat}
      selected={date}
      onChange={onDateChangedHandler}
    />
  );
};

DatePickerStyled.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setState: PropTypes.func.isRequired
};

export default DatePickerStyled;
