import AppReady from "hocs/app-ready";
import AuthInitializer from "hocs/auth-initializer";
import SingleDealContext from "hocs/single-deal-context/SingleDealContext";
import RootNavigator from "navigation/root";

export default function App() {
  return (
    <AppReady>
      <AuthInitializer>
        <SingleDealContext>
          <RootNavigator />
        </SingleDealContext>
      </AuthInitializer>
    </AppReady>
  );
}
