import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';

FlowRouter.route('/', {
  action() {
    ReactLayout.render(App);
  }
});
