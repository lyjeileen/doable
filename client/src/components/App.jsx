import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Login from './Login';
import AllProjects from './AllProjects';
import ChatPage from './Chat/ChatPage';
import Container from 'react-bootstrap/Container';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer, useState } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';
import NavBar from './NavBar';
import { redirect } from 'react-router-dom';

import AboutUsPage from './AboutUsPage';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(dataReducer, defaultState);
  const userName = localStorage.getItem('userName');
  const userAvatar = localStorage.getItem('userAvatar');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('user');
    setUser(undefined);
    return redirect('/login');
  };

  const router = createBrowserRouter([
    {
      element: (
        <>
          <header className="header">
            <NavBar
              user={user}
              userName={userName}
              avatar={userAvatar}
              logout={handleLogout}
            />
          </header>
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: (
            <div className="App">
              <Home setUser={setUser} user={user} />
            </div>
          ),
        },
        {
          path: '/login',
          element: (
            <div className="App">
              <Login setUser={setUser} />
            </div>
          ),
        },
        {
          path: '/projects',
          element: (
            <div className="App">
              <AllProjects />
            </div>
          ),
        },
        {
          path: '/projects/:id/tasks',
          element: (
            <div className="App">
              <TaskList projectId={state.projectId} />
            </div>
          ),
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
        {
          path: '/about',
          element: (
            <div className="App">
              <div className="outside-about-us__wrapper">
                <AboutUsPage />
              </div>
            </div>
          ),
        },
        {
          path: '/contact',
          element: <h1>Placeholder page for contact us page</h1>,
        },
      ],
    },
  ]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router}></RouterProvider>
    </ApplicationContext.Provider>
  );
};

export default App;
