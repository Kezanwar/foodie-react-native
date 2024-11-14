//    ___                __ __
//  .'  _.-----.-----.--|  |__.-----.
//  |   _|  _  |  _  |  _  |  |  -__|
//  |__| |_____|_____|_____|__|_____|

import AppReady from "hocs/app-ready";
import Guard from "hocs/app-ready/guard/Guard";
import AuthInitializer from "hocs/auth-initializer";
import Notifications from "hocs/notifications";
import RootNavigator from "navigation/root";

export default function App() {
  return (
    <AppReady>
      <AuthInitializer>
        <Notifications>
          <Guard>
            <RootNavigator />
          </Guard>
        </Notifications>
      </AuthInitializer>
    </AppReady>
  );
}
