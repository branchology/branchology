import React from 'react';
import { Query } from 'react-apollo';
import { TabContainer } from 'module/common/component/Tabs';
import eventTypes from '../components/eventTypes';
import AttributeList from '../components/Attribute/List';
import EventList from '../components/EventList';
import Heading from '../components/Heading';
import NameList from '../components/Name/List';
import NoteList from '../components/NoteList';
import Relationships from '../components/Relationship';
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
                  <EventList
                    parent={data.person}
                    person={data.person}
                    events={data.person.events}
                    eventTypes={eventTypes}
                  />,
                  <AttributeList
                    person={data.person}
                    attributes={data.person.attributes}
                  />,
                  <NameList person={data.person} names={data.person.names} />,
                  <NoteList notes={data.person.notes} />,
                ]}
              />

              <Relationships person={data.person} />
            </div>
          );
        }}
      </Query>
    );
  }
}
