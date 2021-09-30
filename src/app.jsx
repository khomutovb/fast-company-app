import React from 'react'
import NavBar from './components/navBar'
import { Route, Switch } from 'react-router-dom';
import Home from './layouts/home'
import Login from './layouts/login';
import Users from './layouts/users';
function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:usersId?" component={Users} />
                <Route path="/" component={Home} />
            </Switch>
        </>
    );
}
export default App