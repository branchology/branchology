import { Card } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import ParentNames from '../components/ParentNames';

const Container = styled(Card)`
  display: flex;
  margin-bottom: 10px;

  .imagePlaceholder {
    background-color: #777;
    border-radius: 3px;
    height: 120px;
    margin-right: 10px;
    width: 120px;
  }

  .personDetails {
    .personName {
      font-weight: 400;
      margin: 0 0 5px 0;
    }

    .personParents {
      margin-top: 5px;
    }
  }
`;

export default ({ person }) => (
  <Container elevation={1}>
    <div className="imagePlaceholder" />
    <div className="personDetails">
      <h2 className="personName">
        {person.name.given} {person.name.surname}
      </h2>

      {person.parents &&
        person.parents.map(parents => (
          <p className="personParents" key={parents.id}>
            {person.sex === 'M' ? 'Son ' : 'Daughter '} of{' '}
            <ParentNames parents={parents.relationship.people} />
          </p>
        ))}

      {person.birth && (
        <div>
          Born: {person.birth.date}{' '}
          {person.birth.place && (
            <span>in {person.birth.place.description}</span>
          )}
        </div>
      )}
      {person.death && (
        <div>
          Death: {person.death.date}{' '}
          {person.death.place && (
            <span>in {person.death.place.description}</span>
          )}
        </div>
      )}
    </div>
  </Container>
);
