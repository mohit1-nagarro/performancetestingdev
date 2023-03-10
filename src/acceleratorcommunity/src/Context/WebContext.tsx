import React from 'react';

type contextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userRefreshToken: string;
  setUserRefreshToken: React.Dispatch<React.SetStateAction<string>>;
};
const WebContext = React.createContext<contextType | null | undefined>(null);

export default WebContext;
