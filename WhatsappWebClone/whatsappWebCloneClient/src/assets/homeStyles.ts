import React from "react";
import chatContentBg from "./media/chatContentBg.png";

export const frameColor = "#2b2b2b";
export const accentColor = "#636363";

type DefaultStyles = {
  flexRow: React.CSSProperties;
  flexColumn: React.CSSProperties;
  button: React.CSSProperties;
};

export const defaultStyle: DefaultStyles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    margin: "5px",
    padding: "10px",
    width: "100%",
    border: "none",
    outline: "none",
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
  },
};

type ToolbarStyles = {
  mainContainer: React.CSSProperties;
  userContainer: React.CSSProperties;
  iconContainer: React.CSSProperties;
  searchbarContainer: React.CSSProperties;
  spacerContainer: React.CSSProperties;
  profileIcon: React.CSSProperties;
  icon: React.CSSProperties;
  searchIcon: React.CSSProperties;
  searchInput: React.CSSProperties;
  list: React.CSSProperties;
  listItem: React.CSSProperties;
  friendSearchInput: React.CSSProperties;
  friendList: React.CSSProperties;
  addIcon: React.CSSProperties;
  firendListSearchContainer: React.CSSProperties;
  friendListItem: React.CSSProperties;
  friendListPendingContainer: React.CSSProperties;
};

export const toolbarStyle: ToolbarStyles = {
  mainContainer: {
    ...defaultStyle.flexColumn,
    background: frameColor,
    padding: "1vh 2vh 0vh 1vh",
    borderRadius: "1vh 0 0 0",
    height: "120px",
  },
  userContainer: {
    ...defaultStyle.flexRow,
    justifyContent: "space-between",
  },
  iconContainer: {
    ...defaultStyle.flexRow,
    alignContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  searchbarContainer: {
    padding: ".1vh",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  spacerContainer: {
    ...defaultStyle.flexRow,
    background: accentColor,
    padding: "1vh",
    borderRadius: "1.5vh",
    margin: "1vh 0vh 1vh 0vh",
    width: "95%",
  },
  firendListSearchContainer: {
    ...defaultStyle.flexRow,
    width: "auto",
    alignItems: "center",
    margin: "6px",
    border: `0.1px solid ${accentColor}`,
    borderRadius: "8px",
  },
  friendListPendingContainer: {
    maxHeight: "185px",
    whiteSpace: "nowrap",
    overflow: "auto",
    scrollbarWidth: "none",
  },
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  icon: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  addIcon: {
    width: "25px",
    height: "25px",
    cursor: "pointer",
    marginRight: "5px",
  },
  searchIcon: {
    cursor: "pointer",
    marginRight: "5px",
    width: "20px",
    height: "20px",
  },
  searchInput: {
    background: accentColor,
    border: "none",
    outline: "none",
    color: "white",
    width: "cover",
  },
  friendSearchInput: {
    background: frameColor,
    outline: "none",
    border: "none",
    borderRadius: "8px",
    margin: "3px",
    fontSize: "1.4em",
    color: "white",
    width: "250px",
  },
  list: {
    position: "absolute",
    top: "30px",
    left: "20px",
    background: frameColor,
    borderRadius: "8px",
    listStyle: "none",
    padding: "5px",
    width: "70px",
    boxShadow: "0 0 5px 0px black",
  },
  friendList: {
    position: "absolute",
    top: "47px",
    left: "-10px",
    background: frameColor,
    borderRadius: "8px",
    listStyle: "none",
    width: "auto",
    boxShadow: "0 0 5px 0px black",
    padding: 0,
    margin: 0,
  },
  listItem: {
    color: "white",
    cursor: "pointer",
    padding: "2px",
    paddingLeft: "10px",
  },
  friendListItem: {
    color: "white",
  },
};

type FriendRequestStyles = {
  mainContainer: React.CSSProperties;
  textContainer: React.CSSProperties;
  image: React.CSSProperties;
  text: React.CSSProperties;
  buttonContainer: React.CSSProperties;
  button: React.CSSProperties;
  emailText: React.CSSProperties;
};

export const friendRequestStyle: FriendRequestStyles = {
  mainContainer: {
    ...defaultStyle.flexRow,
    position: "relative",
    alignItems: "center",
    justifyContent: "left",
    width: "270px",
    margin: "5px",
  },
  textContainer: {
    ...defaultStyle.flexColumn,
    justifyContent: "center",
    padding: 0,
    marginLeft: "5px",
  },
  image: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  text: {
    margin: "0px",
    color: "white",
    width: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    whiteSpace: "nowrap",
  },
  emailText: {
    margin: "0px",
    color: "#b3b1b1",
    fontSize: "1em",
    width: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    whiteSpace: "nowrap",
  },
  buttonContainer: {
    ...defaultStyle.flexRow,
    position: "absolute",
    right: "10px",
    height: "35px",
    width: "35px",
  },
  button: {
    padding: "2px",
    cursor: "pointer",
  },
};

type ChatsContainerStyles = {
  mainContainer: React.CSSProperties;
};

export const chatsContainerStyle: ChatsContainerStyles = {
  mainContainer: {
    ...defaultStyle.flexColumn,
    padding: "0vh",
    background: frameColor,
    overflow: "auto",
    height: "90vh",
    borderRadius: "0 0 0 1vh",
    scrollbarWidth: "none",
  },
};

type ChatStyles = {
  mainContainer: React.CSSProperties;
  userContainer: React.CSSProperties;
  userTextContainer: React.CSSProperties;
  userText: React.CSSProperties;
  userImage: React.CSSProperties;
  latestMessage: React.CSSProperties;
  latestMessageTime: React.CSSProperties;
  notificationContainer: React.CSSProperties;
};

export const chatStyle: ChatStyles = {
  mainContainer: {
    ...defaultStyle.flexRow,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.1vh",
    padding: "1vh",
    borderBottom: `0.1px solid ${accentColor}`,
  },
  userContainer: {
    ...defaultStyle.flexRow,
    alignItems: "center",
  },
  userTextContainer: {
    marginLeft: "1vh",
  },
  userText: {
    margin: "0",
    color: "white",
    fontSize: "1.1em",
  },
  latestMessage: {
    margin: "0",
    paddingTop: "5px",
    color: "#b3b1b1",
    width: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "0.8em",
  },
  latestMessageTime: {
    margin: "0",
    color: "#b3b1b1",
    fontSize: "0.8em",
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  notificationContainer: {
    margin: "0px 0px 10px 6px",
    background: "rgb(5 193 37 / 72%)",
    color: "white",
    borderRadius: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: " 20px",
    width: "20px",
    boxShadow: "0px 0px 5px 1px black",
  },
};

type ChatBoxStyles = {
  messageInput: React.CSSProperties;
  inputContainer: React.CSSProperties;
  chatContent: React.CSSProperties;
  mainContainer: React.CSSProperties;
  userContainer: React.CSSProperties;
  userIcon: React.CSSProperties;
  userName: React.CSSProperties;
  userStatus: React.CSSProperties;
  sendIcon: React.CSSProperties;
  backIcon: React.CSSProperties;
  inputBorder: React.CSSProperties;
  placeHolderText: React.CSSProperties;
  userTextContainer: React.CSSProperties;
  incomingMessageText: React.CSSProperties;
  incomingMessageTimeText: React.CSSProperties;
  outgoingMessageText: React.CSSProperties;
  outgoingMessageTimeText: React.CSSProperties;
};

export const chatBoxStyle: ChatBoxStyles = {
  mainContainer: {
    ...defaultStyle.flexColumn,
    height: "100%",
    width: "100%",
  },
  userContainer: {
    ...defaultStyle.flexRow,
    borderRadius: "0vh 1vh 0vh 0vh",
    padding: "1vh",
    background: frameColor,
    alignItems: "center",
  },

  inputContainer: {
    ...defaultStyle.flexRow,
    background: frameColor,
    width: "100%",
  },
  userTextContainer: {
    ...defaultStyle.flexColumn,
    marginLeft: "1vh",
    justifyContent: "center",
  },
  inputBorder: {
    ...defaultStyle.flexRow,
    background: frameColor,
    border: `1px solid ${accentColor}`,
    borderRadius: "15px",
    margin: "1vh 1vh 1vh 1vh",
    width: "100%",
  },
  chatContent: {
    ...defaultStyle.flexColumn,
    overflow: "auto",
    maxHeight: "100%",
    scrollbarWidth: "none",
    backgroundImage: `url(${chatContentBg})`,
    backgroundSize: "cover",
    flex: 1,
    justifyContent: "flex-between",
    boxShadow: "inset 0 0 30px 0px black",
  },
  messageInput: {
    background: frameColor,
    fontSize: "1em",
    border: "none",
    outline: "none",
    color: "white",
    margin: "1vh 0 1vh 1vh",
    width: "99%",
  },
  userIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userName: {
    margin: "0",
    color: "white",
  },
  userStatus: {
    margin: "0",
    fontSize: "0.8em",
    color: "#b3b1b1",
  },
  sendIcon: {
    cursor: "pointer",
    padding: "10px",
    width: "22px",
    height: "22px",
  },
  backIcon: {
    cursor: "pointer",
    padding: "10px",
    width: "22px",
    height: "22px",
  },
  placeHolderText: {
    position: "absolute",
    top: "50%",
    margin: "0",
    padding: "0",
    color: "white",
    alignSelf: "center",
    fontSize: "1.5em",
  },
  incomingMessageText: {
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: "10px 20px 20px 10px",
    margin: "10px",
    border: "none",
    borderRadius: "0 10px 10px 10px",
    alignSelf: "flex-start",
    boxShadow: "0 0 10px 0px black",
    maxWidth: "350px",
    position: "relative",
  },
  incomingMessageTimeText: {
    fontSize: "0.7em",
    color: "#b3b1b150",
    position: "absolute",
    bottom: "5px",
    right: "5px",
  },
  outgoingMessageText: {
    backgroundColor: "#636363",
    color: "white",
    padding: "10px 20px 20px 10px",
    margin: "10px",
    borderRadius: "10px 0 10px 10px",
    boxShadow: "0 0 10px 0px black",
    alignSelf: "flex-end",
    width: "fit-content",
    wordWrap: "break-word",
    maxWidth: "350px",
    position: "relative",
  },
  outgoingMessageTimeText: {
    fontSize: "0.7em",
    color: "#FFFFFF50",
    position: "absolute",
    bottom: "5px",
    right: "5px",
  },
};

type AppStyles = {
  mainContainer: React.CSSProperties;
  subContainer: React.CSSProperties;
  placeHolderDiv: React.CSSProperties;
};

export const appStyle: AppStyles = {
  mainContainer: {
    ...defaultStyle.flexRow,
    height: "96vh",
    minWidth: "60%",
    maxWidth: "90%",
    margin: "2vh 20% 2vh 20%",
    boxShadow: "0 0 50px 0px black",
    background: frameColor,
    fontFamily: "Arial, sans-serif",
  },
  subContainer: {
    ...defaultStyle.flexColumn,
    minWidth: "320px",
  },
  placeHolderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    color: frameColor,
    background: accentColor,
    fontSize: "2em",
  },
};

type ProfileModalStyles = {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
};

export const profileModalStyle: ProfileModalStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    backgroundColor: frameColor,
    width: "300px",
    height: "440px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
    background: "#fff",
    overflow: "hidden",
  },
};

type ProfileModalContentStyles = {
  image: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
  cancelButton: React.CSSProperties;
  inputDiv: React.CSSProperties;
  buttonDiv: React.CSSProperties;
};

export const profileModalContentStyle: ProfileModalContentStyles = {
  image: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    margin: "20px",
    cursor: "pointer",
    objectFit: "cover",
  },
  input: {
    background: frameColor,
    border: `1px solid ${accentColor}`,
    borderRadius: "8px",
    fontSize: "1em",
    color: "white",
    margin: "10px",
    padding: "10px",
    width: "80%",
    outline: "none",
  },
  button: {
    ...defaultStyle.button,
    background: "#4CAF50",
  },
  cancelButton: {
    ...defaultStyle.button,
    background: "#f44336",
  },
  inputDiv: {
    ...defaultStyle.flexColumn,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDiv: {
    ...defaultStyle.flexRow,
    marginTop: "30px",
    alignSelf: "flex-end",
  },
};
