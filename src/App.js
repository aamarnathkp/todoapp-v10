import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import TodoApp from "./pages/TodoApp/TodoApp";
import TodoForm from "./pages/TodoForm/TodoForm";

function App() {
    return (
        <Switch>
            <Route path='/' component={TodoApp} exact />
            <Route
                path='/add'
                exact
                render={(props) => <TodoForm {...props} action='add' />}
            />
            <Route
                path='/modify'
                exact
                render={(props) => <TodoForm {...props} action='modify' />}
            />
            <Route path='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    );
}

export default App;
