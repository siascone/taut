import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import Navigation from './components/Navigation/Navigation';


function App() {
  return (
    <div className='app-container'>
      <Navigation />
      <Switch>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/signup' component={SignupForm}/>
      </Switch>
    </div>
  );
}

export default App;
