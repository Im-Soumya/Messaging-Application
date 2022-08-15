export const getRecipientName = (users, userLoggedIn) => {
  const filteredName = users?.filter(
    (user) => user !== userLoggedIn?.displayName
  )[0];

  return filteredName;
};
