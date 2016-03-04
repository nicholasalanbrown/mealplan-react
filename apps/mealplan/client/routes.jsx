import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';
import Main from './components/Main';
import Other from './components/Other';

FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(App, {
      content: <Main />
    });
  }
});

FlowRouter.route("/other", {
  action: function() {
    ReactLayout.render(App, {
      content: <Other />
    });
  }
});
