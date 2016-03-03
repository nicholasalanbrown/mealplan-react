import { Accounts } from 'meteor/accounts-base';

import 'mealplan/methods';
import './routes';

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
