import React from 'react';
import {HashRouter, Route, Router} from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "@firebase/auth";
import {auth, db} from "./firebase";
interface Props {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray
    | React.ReactPortal
    | any;
}

interface userTypes {
  displayName: string | null;
  userId: string;
  avatar?: string | null;
}



interface contextTypes {
  loading: boolean;
  currentUser: userTypes | null;
  type: number | null;
  logInUser(email: string, password: string): Promise<void>;
  signOutUser(): Promise<void>;
  setUpRecaptha(number:any):Promise<any>;
  handleAuthChange: (params: { cb?: VoidFunction; err?: VoidFunction }) => void;
}

const contextDefaultVal: contextTypes = {
  loading: false,
  currentUser: null,
  type:null,
  logInUser: async () => {},
  signOutUser: async () => {},
  setUpRecaptha: async() =>{},
  handleAuthChange: () => {},
};

export const RouterContext = React.createContext<contextTypes>(contextDefaultVal);

function CustomBrowserRouter ({ children }: Props): React.ReactElement {
  const [currentUser, setCurrentUser] = React.useState<userTypes | null>(null);
  const [type, setType] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);

  function setUpRecaptha(number:any) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    setType(2);
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  const logInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setType(1);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error);
    }
  };

  const handleAuthChange = async (params: { cb?: VoidFunction; err?: VoidFunction }) => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setCurrentUser(null);
        params.err && params.err();
      } else {
        setCurrentUser({
          displayName: user.displayName,
          userId: user.uid,
          avatar: user.photoURL,
        });
        params.cb && params.cb();
      }
    });
  };

  
  return (
    <HashRouter>
      <Route>
        {(routeProps: any) => (
          <RouterContext.Provider value={{
            loading,
            currentUser,
            logInUser,
            type,
            handleAuthChange,
            setUpRecaptha,
            signOutUser,
          }}>
            {children}
          </RouterContext.Provider>
        )}
      </Route>
    </HashRouter>
  )
}
export default CustomBrowserRouter;
