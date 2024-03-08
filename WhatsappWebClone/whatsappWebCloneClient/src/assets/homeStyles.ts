import React from "react";

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
  profileIcon: {
    width: "50px",
    height: "50px",
  },
  icon: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
  },
  searchInput: {
    background: accentColor,
    border: "none",
    outline: "none",
    marginLeft: "1vh",
    color: "white",
    width:"cover",
  },
  list: {
    position: "absolute",
    top: "30px",
    right: "0px",
    background: accentColor,
    borderRadius: "8px",
    listStyle: "none",
    padding: "5px",
    width: "180px",
    boxShadow: "0 0 5px 0px black",
  },
  listItem: {
    color: "white",
    cursor: "pointer",
    padding: "2px",
    paddingLeft: "10px",
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
    scrollbarColor: `${accentColor} ${frameColor}`,
    scrollbarWidth: "thin",
  },
};

type ChatStyles = {
  mainContainer: React.CSSProperties;
  userContainer: React.CSSProperties;
  userTextContainer: React.CSSProperties;
  userText: React.CSSProperties;
  userImage: React.CSSProperties;
};

export const chatStyle: ChatStyles = {
  mainContainer: {
    ...defaultStyle.flexRow,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.1vh",
    padding: "1vh",
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
  userImage: {
    width: "50px",
    height: "50px",
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
  sendIcon: React.CSSProperties;
  inputBorder: React.CSSProperties;
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
  inputBorder: {
    ...defaultStyle.flexRow,
    background: frameColor,
    border: `1px solid ${accentColor}`,
    borderRadius: "15px",
    margin: "1vh 1vh 1vh 1vh",
    width: "100%",
  },
  chatContent: {
    background: accentColor,
    flex: 1,
    justifyContent: "flex-between",
  },
  messageInput: {
    background: frameColor,
    fontSize: "1em",
    border: "none",
    outline: "none",
    color: "white",
    margin: "1vh 0 1vh 1vh",
    width:"99%",
  },
  userIcon: {
    width: "50px",
    height: "50px",
  },
  userName: {
    margin: "1vh",
    color:"white"
  },
  sendIcon: {
    cursor: "pointer",
    padding: "10px",
    width: "22px",
    height: "22px",
  },
};

type AppStyles = {
  mainContainer: React.CSSProperties;
  subContainer: React.CSSProperties;
};

export const appStyle: AppStyles = {
  mainContainer: {
    ...defaultStyle.flexRow,
    height: "96vh",
    margin: "2vh 5vh 2vh 5vh",
    boxShadow: "0 0 50px 0px black",
    background: frameColor,
    
  },
  subContainer: {
    ...defaultStyle.flexColumn,
    width: "30%",
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
  },
  input: {
    background:frameColor,
    border:`1px solid ${accentColor}`,
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
