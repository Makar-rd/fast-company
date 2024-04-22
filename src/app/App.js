import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./components/not-found";
import Edit from "./components/page/editUserPage/editUserPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId/edit" component={Edit} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/userNotFound" component={NotFound} />
                <Redirect from="/admin" to="/"/>
                <Redirect to="/userNotFound"/>
            </Switch>
        </div>
    );
};

export default App;
