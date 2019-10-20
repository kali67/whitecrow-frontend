import React from "react";
import { Provider as ReduxProvider} from "react-redux";
import store from "../src/store";
import globalTranslations from "../src/static/translations/global";
import { renderToStaticMarkup } from "react-dom/server";
import { LocalizeProvider } from "react-localize-redux";
import "@atlaskit/css-reset";

export default function Provider({ story }) {
  return (
    <ReduxProvider store={store}>
      <LocalizeProvider
        store={store}
        initialize={{
          languages: [
            { name: "English", code: "EN" },
            { name: "Español", code: "ES" }
          ],
          translation: globalTranslations,
          options: {
            renderToStaticMarkup,
            renderInnerHtml: true,
            defaultLanguage: "EN"
          }
        }}
      >
        {story}
      </LocalizeProvider>
    </ReduxProvider>
  );
}
