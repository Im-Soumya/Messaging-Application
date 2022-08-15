export const getRecipientEmail = (users, userLoggedIn) => {
  const filteredUser = users?.filter((user) => user !== userLoggedIn?.email)[0];

  return filteredUser;
};
