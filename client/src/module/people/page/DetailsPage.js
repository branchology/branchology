import React from 'react';
import { Query } from 'react-apollo';
import DataContainer from 'module/common/DataContainer';
import AttributeList from '../components/AttributeList';
import EventList from '../components/EventList';
import Heading from '../components/Heading';
import NameList from '../components/NameList';
import NoRelationships from '../components/NoRelationships';
import NoteList from '../components/NoteList';
import RelationshipList from '../components/RelationshipList';
import fetchPerson from '../query/fetchPerson';
import { IconButton } from '../../common/Buttons';
import { TabContainer } from 'module/common/components/Tabs';

export default class DetailsPage extends React.Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <Query query={fetchPerson} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return null;
          return (
            <div>
              <Heading person={data.person} />

              <TabContainer
                tabs={[
                  { label: 'Events', count: data.person.events.length },
                  { label: 'Attributes', count: data.person.attributes.length },
                  { label: 'Names', count: data.person.names.length },
                  { label: 'Notes', count: data.person.notes.length },
                ]}
                contents={[
                  <EventList events={data.person.events} />,
                  <AttributeList attributes={data.person.attributes} />,
                  <NameList person={data.person} names={data.person.names} />,
                  <NoteList notes={data.person.notes} />,
                ]}
              />

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
            </div>
          );
        }}
      </Query>
    );
  }
}
