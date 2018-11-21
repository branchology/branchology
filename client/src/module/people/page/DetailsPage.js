import React from 'react';
import { Query } from 'react-apollo';
import DataContainer from 'module/common/DataContainer';
import { IconButton } from 'module/common/component/Button';
import { TabContainer } from 'module/common/component/Tabs';
import AttributeList from '../components/Attribute/List';
import EventList from '../components/Event/List';
import Heading from '../components/Heading';
import NameList from '../components/Name/List';
import NoRelationships from '../components/NoRelationships';
import NoteList from '../components/NoteList';
import RelationshipList from '../components/RelationshipList';
import fetchPerson from '../query/fetchPerson';

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
