export default function calculateDateStamp(dateValue) {
  const map = {
    JAN: '01',
    FEB: '02',
    MAR: '03',
    APR: '04',
    MAY: '05',
    JUN: '06',
    JUL: '07',
    AUG: '08',
    SEP: '09',
    OCT: '10',
    NOV: '11',
    DEC: '12',
  };

  let myValue = dateValue;

  let matches = myValue.match(/^BET (.*) AND (.*)/i);
  if (matches) {
    myValue = matches[1];
  }

  matches = myValue.match(/^(AFT|ABT|BEF) (.*)$/i);
  if (matches) {
    console.log({ myValue, matches });
    myValue = matches[2];
  }

  matches = myValue.match(/^([0-9]{1,2}) ([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    return (
      matches[3] + map[matches[2].toUpperCase()] + matches[1].padStart(2, '0')
    );
  }

  matches = myValue.match(/^([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    return matches[2] + map[matches[1].toUpperCase()] + '01';
  }

  matches = myValue.match(/^([0-9]{1,2}) ([A-Za-z]{3})$/i);
  if (matches) {
    return null;
  }

  matches = myValue.match(/^([A-Za-z]{3})$/i);
  if (matches) {
    return null;
  }

  matches = myValue.match(/^([0-9]{4})$/i);
  if (matches) {
    return matches[1] + '0101';
  }

  return null;
}
