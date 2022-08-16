export const getRecipientName = (users, userLoggedIn) => {
  const filteredName = users?.filter(
    (user) => user !== userLoggedIn?.displayName
  )[1];

  return filteredName;
};
