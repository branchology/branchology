import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import AttributeList from '../components/AttributeList';
import EventList from '../components/EventList';
import Heading from '../components/Heading';
import NameList from '../components/NameList';
import NoAttributes from '../components/NoAttributes';
import NoNotes from '../components/NoNotes';
import NoPersonEvents from '../components/NoPersonEvents';
import NoRelationships from '../components/NoRelationships';
import NoteList from '../components/NoteList';
import RelationshipList from '../components/RelationshipList';
import fetchPerson from '../query/fetchPerson';
import { IconButton } from '../../common/Buttons';

const DataContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 10px;

  & + & {
    margin-top: 10px;
  }

  .header {
    align-items: center;
    display: flex;
    margin-bottom: 10px;

    .sectionTitle {
      flex: 1;
      font-weight: 500;
      margin: 0;
    }
  }

  & + .sectionTitle {
    margin-bottom: 40px;
  }
`;

export default ({
  match: {
    params: { id },
  },
}) => {
  return (
    <Query query={fetchPerson} variables={{ id }}>
      {({ loading, data }) => {
        if (loading) return null;
        return (
          <div>
            <Heading person={data.person} />

            <DataContainer>
              <div className="header">
                <h3 className="sectionTitle">Attributes</h3>
                <IconButton icon="plus-circle" success sm>
                  Add Attribute
                </IconButton>
              </div>
              {data.person.attributes.length ? (
                <AttributeList attributes={data.person.attributes} />
              ) : (
                <NoAttributes />
              )}
            </DataContainer>

            <DataContainer>
              <div className="header">
                <h3 className="sectionTitle">Events</h3>
                <IconButton icon="plus-circle" success sm>
                  Add Event
                </IconButton>
              </div>
              {data.person.events.length ? (
                <EventList events={data.person.events} />
              ) : (
                <NoPersonEvents />
              )}
            </DataContainer>

            <DataContainer>
              <div className="header">
                <h3 className="sectionTitle">Names</h3>
                <IconButton icon="plus-circle" success sm>
                  Add Name
                </IconButton>
              </div>
              <NameList names={data.person.names} />
            </DataContainer>

            <DataContainer>
              <div className="header">
                <h3 className="sectionTitle">Relationships</h3>
                <IconButton icon="plus-circle" success sm>
                  Add Relationship
                </IconButton>
              </div>
              {data.person.relationships.length ? (
                <RelationshipList
                  person={data.person}
                  relationships={data.person.relationships}
                />
              ) : (
                <NoRelationships />
              )}
            </DataContainer>

            <DataContainer>
              <div className="header">
                <h3 className="sectionTitle">Notes</h3>
                <IconButton icon="plus-circle" success sm>
                  Add Note
                </IconButton>
              </div>
              {data.person.notes.length ? (
                <NoteList notes={data.person.notes} />
              ) : (
                <NoNotes />
              )}
            </DataContainer>
          </div>
        );
      }}
    </Query>
  );
};
