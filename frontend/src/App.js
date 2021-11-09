import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import UploadPhotoForm from "./components/UploadPhotoForm";
import EditPhotoForm from "./components/EditPhotoForm";
import CreateAlbumForm from "./components/CreateAlbumForm";
import CreateCommentForm from "./components/CreateCommentForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunk_setUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {/* <Navigation isLoaded={isLoaded} /> */}
            <Home isLoaded={isLoaded} />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/photos/new">
            <UploadPhotoForm />
          </Route>
          <Route path="/photos/:id/edit">
            <EditPhotoForm />
          </Route>
          <Route path="/albums/new">
            <CreateAlbumForm />
          </Route>
          <Route path="/comments/new">
            <CreateCommentForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
