import React from "react";

export const frameColor = "#2b2b2b";
export const accentColor = "#636363";

type ContainerStyles = {
  flexRow: React.CSSProperties;
  flexColumn: React.CSSProperties;
};

export const containerStyle: ContainerStyles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
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
};

export const toolbarStyle: ToolbarStyles = {
  mainContainer: {
    ...containerStyle.flexColumn,
    background: frameColor,
    padding: "1vh 2vh 0vh 2vh",
    borderRadius: "1vh 0 0 0",
    height: "120px",
  },
  userContainer: {
    ...containerStyle.flexRow,
    justifyContent: "space-between",
  },
  iconContainer: {
    ...containerStyle.flexRow,
    alignContent: "flex-end",
    alignItems: "center",
  },
  searchbarContainer: {
    padding: ".1vh",
  },
  spacerContainer: {
    ...containerStyle.flexRow,
    background: accentColor,
    padding: "1vh",
    borderRadius: "1.5vh",
    margin: "1vh 0vh 1vh 0vh",
  },
  profileIcon: {
    width: "50px",
    height: "50px",
  },
  icon: {
    width: "30px",
    height: "30px",
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
    width: "auto",
  },
};

type ChatsContainerStyles = {
  mainContainer: React.CSSProperties;
};

export const chatsContainerStyle: ChatsContainerStyles = {
  mainContainer: {
    ...containerStyle.flexColumn,
    padding: "1vh",
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
    ...containerStyle.flexRow,
    borderRadius: "1vh",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.1vh",
    padding: "0.5vh",
  },
  userContainer: {
    ...containerStyle.flexRow,
    alignItems: "center",
  },
  userTextContainer: {
    marginLeft: "1vh",
  },
  userText: {
    margin: "0",
    color: "white",
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
};

export const chatBoxStyle: ChatBoxStyles = {
  mainContainer: {
    ...containerStyle.flexColumn,
    height: "100%",
    width: "100%",
  },
  userContainer: {
    ...containerStyle.flexRow,
    borderRadius: "0vh 1vh 0vh 0vh",
    padding: "1vh",
    background: frameColor,
    alignItems: "center",
  },

  inputContainer: {
    borderRadius: "0 0 1vh 0",
    background: frameColor,
    width: "100%",
  },
  chatContent: {
    background: accentColor,
    flex: 1,
    justifyContent: "flex-between",
  },
  messageInput: {
    background: frameColor,
    border: "none",
    outline: "none",
    color: "white",
    padding: "1vh 2vh 1vh 2vh",
    borderRadius: "0 0 1vh 0vh",
  },
  userIcon: {
    width: "50px",
    height: "50px",
  },
  userName: {
    margin: "1vh",
    color:"white"
  }
};

type AppStyles = {
  mainContainer: React.CSSProperties;
};

export const appStyle: AppStyles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    height: "96vh",
    padding: "2vh 5vh 2vh 5vh",
  },
};
