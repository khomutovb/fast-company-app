import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Home from "./layouts/home";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UpdateForm from "./components/ui/updateForm";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId/edit" component={UpdateForm} />
                <Route path="/users/:usersId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </>
    );
}
export default App;
