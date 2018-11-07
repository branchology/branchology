import React from 'react';
import { isNil } from 'lodash';

const newlineRegex = /(\r\n|\r|\n)/g;

export default function nl2br(text) {
  if (isNil(text)) {
    return text;
  }

  return text.split(newlineRegex).map(function(line, index) {
    if (line.match(newlineRegex)) {
      return <br key={index} />;
    }

    return line;
  });
}
