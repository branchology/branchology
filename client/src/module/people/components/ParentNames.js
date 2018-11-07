import React from 'react';
import { Link } from 'react-router-dom';

const ParentNames = ({ parents }) => {
  const parentElements = parents.map(parent => (
    <Link to={`/people/${parent.id}`}>
      {parent.name.given} {parent.name.surname}
    </Link>
  ));

  if (parents.length > 1) {
    return [parentElements[0], <span> and </span>, parentElements[1]];
  }

  return parentElements;
};

export default ParentNames;
