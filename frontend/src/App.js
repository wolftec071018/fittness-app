import './App.css';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// local
import Welcome from './pages/welcome';
import Login from './pages/login2';
import SignUp from './pages/signUp'
import Dashboard from './pages/athlete/athleteDashboard'
import EditPersonal from './pages/athlete/editProfile'
import EditAddress from './pages/athlete/editAddress'
import EmailInvite from './pages/trainer/emailInvites'
import TrainerDashboard from './pages/trainer/trainerDashboard'
import AthleteDashboard from './pages/athlete/athleteDashboard'
import CreateWorkout from './pages/trainer/createWorkout'
import ClientWorkout from './pages/athlete/clientWorkout'
import Messages from './pages/messaging/chat'
import Home from './pages/home';
import WorkoutList from "./pages/trainer/workoutList"
import About from './pages/aboutUs';
import ViewWorkout from "./pages/trainer/viewWorkout"
import CustomerSupport from "./pages/customerSupport"
import Measurement from './pages/athlete/measurement'
import SendWorkout from './pages/trainer/sendWorkout'
import Search from "./pages/athlete/search";
import Privacy from './pages/athlete/privacy';
import BodyProgression from './pages/athlete/bodyProgression';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Welcome />
        </Route>
        <Route exact path='/Login'>
          <Login />
        </Route>
        <Route exact path='/SignUp'>
          <SignUp />
        </Route>
        <Route exact path='/Home'>
          <Home />
        </Route>
        <Route exact path='/Dashboard'>
          <Dashboard />
        </Route>
        <Route exact path='/editProfile'>
          <EditPersonal />
        </Route>
        <Route exact path='/editAddress'>
          <EditAddress />
        </Route>
        <Route exact path='/emailInvite'>
          <EmailInvite />
        </Route>
        <Route exact path='/AthleteDashboard'>
          <AthleteDashboard />
        </Route>
        <Route exact path='/TrainerDashboard'>
          <TrainerDashboard />
        </Route>
        <Route exact path='/CreateWorkout'>
          <CreateWorkout />
        </Route>
        <Route exact path='/WorkoutList'>
          <WorkoutList />
        </Route>
        <Route exact path='/ClientWorkout'>
          <ClientWorkout />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path = '/CustomerSupport'>
          <CustomerSupport />
        </Route>
        <Route exact path = '/Measurement'>
          <Measurement />
        </Route>      
        <Route exact path = '/ViewWorkout'
         component = {ViewWorkout} >
        </Route>  
        <Route exact path = '/SendWorkout'
         component = {SendWorkout}>
        </Route>
        <Route exact path = '/Search'
           component = {Search}>
        </Route>
        {/* <Route exact path = '/StripeCheckoutSession'>
          <StripeCheckoutSession />
        </Route>      */}
      <Route exact path='/chat'>
          <Messages />
        </Route>
        <Route exact path='/privacy'>
          <Privacy />
        </Route>
        <Route exact path='/bodyProgression'>
          <BodyProgression />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
