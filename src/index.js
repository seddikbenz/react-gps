import { AppRegistry } from "react-native";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
/*/
if (module.hot) {
  module.hot.accept();
}
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
