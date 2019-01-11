import React from 'react';

/**
 * A Higher-Order Component (HOC) used to pluck an id from
 * the matched route and make it a top-level prop for the
 * component, mainly so that Apollo wrappers don't need to
 * have route awareness.
 *
 * Example:
 *
 *    <Route path="/people/:id" component={Details} />
 *
 *    const Details = ({ id }) => <span>{id}</span>
 *
 *    export default mapRouteIdToProps(Details)
 *
 * Will take match.params.id given by react-router and make
 * it a prop to whatever component we're wrapping (Details).
 *
 * And if we wrap this further using Apollo:
 *
 *   export default WrappedComponent => props => (
 *     <Query query={fetchPersonQuery} variables={{ id: props.id }}>
 *       {({ loading, data }) => {
 *         if (loading) return null;
 *         return <WrappedComponent data={data} />;
 *       }}
 *     </Query>
 *   );
 *
 * And double wrap Details:
 *
 * export default  mapRouteIdToProps(fetchPerson(DetailsPage));
 *
 * Now we can go from Router to Apollo Query and finally our
 * component with only the route needing URL param awareness.
 *
 * Is it worth it? /shrug
 */
export function mapRouteIdToProps(Component) {
  return props => {
    const {
      match: {
        params: { id },
      },
    } = props;

    return <Component id={id} {...props} />;
  };
}
