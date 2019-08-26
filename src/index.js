import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { LocalizeProvider } from "react-localize-redux";

import "./index.css";
import "react-slide-out/lib/index.css";
import { Provider } from "react-redux";
import store from "./store";
import "@atlaskit/css-reset";
import Localization from "./components/Localization";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./static/translations/global.json";

axios.defaults.baseURL = "https://whitecrow-backend.herokuapp.com";

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider
      initialize={{
        languages: [{ name: "English", code: "EN" }, { name: "Español", code: "ES" }],
        translation: globalTranslations,
        options: {
          renderToStaticMarkup,
          renderInnerHtml: true,
          defaultLanguage: "ES"
        }
      }}
      store={store}>
      <Localization />
    </LocalizeProvider>
  </Provider>,
  document.getElementById("root")
);
