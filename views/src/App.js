import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import PageNotFound from "./components/layout/PageNotFound";
import PerDay from "./components/perday/PerDay";
import PerOrder from "./components/perorder/PerOrder";
import HealthStatus from "./components/healthstatus/HealthStatus";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/perday" component={PerDay} />
              <Route exact path="/perorder" component={PerOrder} />
              <Route exact path="/healthstatus" component={HealthStatus} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
