// React rendering
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// Components
import SidePanel from "./Components/Sidepanel";

// Style
import "./css/variables.css";
import "./css/reset.css";

// Redux initialization
import { Provider } from "react-redux";
import { Store } from "webext-redux";

const store = new Store();



store.ready().then(() => {
  const root = createRoot(document.getElementById("root")!);

  root.render(
    <Provider store={store}>
      <SidePanel />
    </Provider>
  );
});
