import AppReady from "hocs/app-ready";
import AuthInitializer from "hocs/auth-initializer";
import RootNavigator from "navigation/root";

export default function App() {
  return (
    <AppReady>
      <AuthInitializer>
        <RootNavigator />
      </AuthInitializer>
    </AppReady>
  );
}
