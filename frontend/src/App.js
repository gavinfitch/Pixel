import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from "./components/Home";
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import UploadPhotoForm from "./components/UploadPhotoForm";
import EditPhotoForm from "./components/EditPhotoForm";
import CreateAlbumForm from "./components/CreateAlbumForm";
import EditAlbumForm from "./components/EditAlbumForm";
import AlbumViewPage from "./components/AlbumViewPage";
import AlbumSelectForm from "./components/AlbumSelectForm";

import * as sessionActions from "./store/session";

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
          <Route path="/photos/:id/albumselect">
            <AlbumSelectForm />
          </Route>
          <Route path="/albums/new/">
            <CreateAlbumForm />
          </Route>
          <Route exact path="/albums/:id/">
            <AlbumViewPage />
          </Route>
          <Route path="/albums/:id/edit">
            <EditAlbumForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
