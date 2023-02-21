export const getChatName = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
};

export const getChatPicture = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1].picture
    : users[0].picture;
};

export const getChatProfile = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1] : users[0];
};
