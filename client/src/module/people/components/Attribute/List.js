import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Heading } from 'module/common/SimpleDataTable';
import NoResults from 'component/NoResults';
import AttributeEdit from './Edit';
import NoAttributes from './NoAttributes';
import SourceCitationList from '../SourceCitationList';
import attributeUpdateMutation from '../../query/attributeUpdateMutation';
import { NotificationContext } from '../../../common/notifications';

class AttributeList extends Component {
  static contextType = NotificationContext;

  state = { editAttribute: null };

  selectEditAttribute = attr => this.setState({ editAttribute: attr });
  closeEditAttribute = () => this.setState({ editAttribute: null });

  submitEdit = values => {
    return this.props.updateAttribute(values).then(data => {
      this.closeEditAttribute();
      this.context.notify('Person Attribute Updated!');
      return data;
    });
  };

  render() {
    const { attributes } = this.props;

    if (attributes.length === 0) {
      return <NoAttributes />;
    }

    return (
      <div>
        {this.state.editAttribute && (
          <AttributeEdit
            attribute={this.state.editAttribute}
            onClose={this.closeEditAttribute}
            onSubmit={this.submitEdit}
          />
        )}

        <SimpleDataTable>
          <thead>
            <tr>
              <Heading>Attribute</Heading>
              <Heading>Date</Heading>
              <Heading>Details</Heading>
              <Heading>Place</Heading>
              <Heading> </Heading>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, index) => [
              <tr className={index % 2 === 1 ? 'alt' : ''} key={attribute.id}>
                <td>{attribute.event.type}</td>
                <td>{attribute.event.date}</td>
                <td>{attribute.data}</td>
                <td>
                  {attribute.event.place && attribute.event.place.description}
                </td>
                <td className="actions">
                  <IconButton
                    primary
                    icon="pencil"
                    onClick={() => this.selectEditAttribute(attribute)}
                  >
                    Edit
                  </IconButton>
                  <IconButton danger icon="trash" onClick={() => null}>
                    Delete
                  </IconButton>
                </td>
              </tr>,
              <tr
                className={index % 2 === 1 ? 'alt' : ''}
                key={`sources-${attribute.id}`}
              >
                <td colSpan="5" className="citations">
                  <SourceCitationList
                    citations={attribute.event.sourceCitations}
                  />
                </td>
              </tr>,
            ])}
          </tbody>
        </SimpleDataTable>

        {attributes.length === 0 && <NoResults />}
      </div>
    );
  }
}

const withGraphql = compose(
  graphql(attributeUpdateMutation, {
    name: 'updateAttribute',
  }),
);

export default withGraphql(AttributeList);
