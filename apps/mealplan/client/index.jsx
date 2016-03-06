import { Accounts } from 'meteor/accounts-base';

import '../server/methods/cuisines';
import '../server/methods/emails';
import '../server/methods/foods';
import '../server/methods/ingredients';
import '../server/methods/plans';
import '../server/methods/recipes';
import '../server/methods/shopping';

import './routes';

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Accounts.onLogin(function() {
  var path = FlowRouter.current().path;
  if(path === "/login"){
    FlowRouter.go("home");
  }
});
