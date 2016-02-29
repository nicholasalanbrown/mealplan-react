import { FlowRouter } from 'meteor/meteorhacks:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import TodoApp from './components/TodoApp';

FlowRouter.route('/', {
  action() {
    ReactLayout.render(TodoApp);
  }
});
