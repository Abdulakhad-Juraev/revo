import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import store from "../redux";
import {connect, Provider} from "react-redux";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import NotFound from "../pages/Public/NotFound";
import Login from "../pages/Auth/Login";
import Cabinet from "../pages/Cabinet/Cabinet";
import Accountant from "../pages/roles/Accountant";
import Cashier from "../pages/roles/Cashier";
import Seller from "../pages/roles/Seller";
import Operator from "../pages/roles/Operator";
import AcSeller from "../pages/roles/AcSeller";
import CarService from "../pages/roles/CarService";
import Worker from "../pages/roles/Worker";
import Client from "../pages/roles/ClientCl";
import Home from "../pages/Public/Home";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <PublicRoute exact path="/" component={Login}/>

                    <PublicRoute exact path="/login" component={Login}/>


                    <PrivateRoute path={"/admin/:page/:subpage/:identity"} component={Cabinet} />
                    <PrivateRoute path={"/admin/:page/:subpage"} component={Cabinet} />
                    <PrivateRoute path={"/admin/:page"} component={Cabinet} />
                    <PrivateRoute path={"/admin"} component={Cabinet} />


                    <PrivateRoute path={"/accountant/:page/:subpage/:identity"} component={Accountant} />
                    <PrivateRoute path={"/accountant/:page/:subpage"} component={Accountant} />
                    <PrivateRoute path={"/accountant/:page"} component={Accountant} />
                    <PrivateRoute path={"/accountant"} component={Accountant} />

                    <PrivateRoute path={"/cashier/:page/:subpage/:identity"} component={Cashier} />
                    <PrivateRoute path={"/cashier/:page/:subpage"} component={Cashier} />
                    <PrivateRoute path={"/cashier/:page"} component={Cashier} />
                    <PrivateRoute path={"/cashier"} component={Cashier} />

                    <PrivateRoute path={"/seller/:page/:subpage/:identity"} component={Seller} />
                    <PrivateRoute path={"/seller/:page/:subpage"} component={Seller} />
                    <PrivateRoute path={"/seller/:page"} component={Seller} />
                    <PrivateRoute path={"/seller"} component={Seller} />

                    <PrivateRoute path={"/operator/:page/:subpage/:identity"} component={Operator} />
                    <PrivateRoute path={"/operator/:page/:subpage"} component={Operator} />
                    <PrivateRoute path={"/operator/:page"} component={Operator} />
                    <PrivateRoute path={"/operator"} component={Operator} />

                    <PrivateRoute path={"/ac-seller/:page/:subpage/:identity"} component={AcSeller} />
                    <PrivateRoute path={"/ac-seller/:page/:subpage"} component={AcSeller} />
                    <PrivateRoute path={"/ac-seller/:page"} component={AcSeller} />
                    <PrivateRoute path={"/ac-seller"} component={AcSeller} />

                    <PrivateRoute path={"/car-service/:page/:subpage/:identity"} component={CarService} />
                    <PrivateRoute path={"/car-service/:page/:subpage"} component={CarService} />
                    <PrivateRoute path={"/car-service/:page"} component={CarService} />
                    <PrivateRoute path={"/car-service"} component={CarService} />

                    <PrivateRoute path={"/worker/:page/:subpage/:identity"} component={Worker} />
                    <PrivateRoute path={"/worker/:page/:subpage"} component={Worker} />
                    <PrivateRoute path={"/worker/:page"} component={Worker} />
                    <PrivateRoute path={"/worker"} component={Worker} />

                    <PrivateRoute path={"/client/:page/:subpage/:identity"} component={Client} />
                    <PrivateRoute path={"/client/:page/:subpage"} component={Client} />
                    <PrivateRoute path={"/client/:page"} component={Client} />
                    <PrivateRoute path={"/client"} component={Client} />


                    {/*<PrivateRoute exact exact path="/user" component={ClientPages}/>*/}

                    <Route path={"/"} component={NotFound}/>


                </Switch>
            </Provider>
        );
    }
}

App.propTypes = {};

export default App;