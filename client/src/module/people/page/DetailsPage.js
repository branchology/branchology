import React from 'react';
import { Query } from 'react-apollo';
import DataContainer from 'module/common/DataContainer';
import AttributeList from '../components/AttributeList';
import EventList from '../components/EventList';
import Heading from '../components/Heading';
import NameAdd from '../components/NameAdd';
import NameList from '../components/NameList';
import NoAttributes from '../components/NoAttributes';
import NoNotes from '../components/NoNotes';
import NoPersonEvents from '../components/NoPersonEvents';
import NoRelationships from '../components/NoRelationships';
import NoteList from '../components/NoteList';
import RelationshipList from '../components/RelationshipList';
import fetchPerson from '../query/fetchPerson';
import { IconButton } from '../../common/Buttons';

export default class DetailsPage extends React.Component {
  state = { activeDialog: null };

  openDialog = activeDialog => this.setState({ activeDialog });
  closeDialog = () => this.setState({ activeDialog: null });

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

              {this.state.activeDialog === 'NameAdd' && (
                <NameAdd
                  name={{ personId: data.person.id }}
                  onClose={this.closeDialog}
                />
              )}

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
                  <IconButton
                    icon="plus-circle"
                    success
                    sm
                    onClick={() => this.openDialog('NameAdd')}
                  >
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
  }
}
