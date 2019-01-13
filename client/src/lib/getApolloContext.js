export function getApolloContext() {
  const appContext = localStorage.getItem('appContext');

  if (appContext) {
    const context = JSON.parse(appContext);

    if (context.token && context.token.token) {
      return { headers: { Authorization: `Bearer ${context.token.token}` } };
    }
  }
}
