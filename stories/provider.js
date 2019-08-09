import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from "../src/store";

export default function Provider({ story }) {
    return (
        <ReduxProvider store={store}>
            {story}
        </ReduxProvider>
    );
};