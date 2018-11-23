function validateSimpleDate(dateString) {
  const validMonths = {
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

  let matches = dateString.match(/^([0-9]{1,2}) ([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    if (!Object.keys(validMonths).includes(matches[2].toUpperCase())) {
      return false;
    }

    if (parseInt(matches[3]) > new Date().getFullYear()) {
      return false;
    }

    const daysInMonth = new Date(
      matches[3],
      validMonths[matches[2].toUpperCase()],
      0,
    ).getDate();
    if (matches[1] > daysInMonth) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    if (!validMonths.includes(matches[1].toUpperCase())) {
      return false;
    }

    if (parseInt(matches[2]) > new Date().getFullYear()) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([0-9]{1,2}) ([A-Za-z]{3})$/i);
  if (matches) {
    if (!Object.keys(validMonths).includes(matches[2].toUpperCase())) {
      return false;
    }

    // we don't know which year it is, so we don't know if february has 29 days
    // or not. Assume it does.
    const daysInMonth = new Date(
      2000, // a random leap year appears!
      validMonths[matches[2].toUpperCase()],
      0,
    ).getDate();
    if (matches[1] > daysInMonth) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([0-9]{4})$/i);
  if (matches && parseInt(matches[1]) <= new Date().getFullYear()) {
    return true;
  }

  return false;
}

export function validateGedcomDate(dateString) {
  let matches = dateString.match(/^BET (.*) AND (.*)/i);
  if (matches) {
    return validateSimpleDate(matches[1]) && validateSimpleDate(matches[2]);
  }

  matches = dateString.match(/^(AFT|ABT|BEF) (.*)$/i);
  if (matches) {
    return validateSimpleDate(matches[1]);
  }

  return validateSimpleDate(dateString);
}
