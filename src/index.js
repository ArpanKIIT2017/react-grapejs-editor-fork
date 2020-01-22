import grapesjs from "grapesjs";
import "grapesjs-blocks-basic";

import ReactDOM from "react-dom";
import React from "react";

import baseReactComponent from "./base-react-component";

import Listing from "./Listing";

import "./styles.css";
import MuiComponents from "./mui-components";

const editor = grapesjs.init({
  container: "#gjs",
  fromElement: 1,
  height: "100%",
  storageManager: { type: 0 },
  plugins: ["gjs-blocks-basic"]
});

const { baseReactComponentModel, baseReactComponentView } = baseReactComponent(
  editor
);

MuiComponents(editor);

editor.BlockManager.add("listing", {
  label: "<div class='gjs-fonts gjs-f-b1'>Listing</div>",
  content: "<Listing>Foo</Listing>"
});

editor.DomComponents.addType("Listing", {
  model: {
    ...baseReactComponentModel,
    defaults: {
      component: Listing,
      stylable: true,
      resizable: true,
      editable: true,
      draggable: true,
      droppable: true,
      attributes: {
        mlsid: "Default MLSID",
        editable: true
      },
      traits: [
        {
          type: "number",
          label: "MLS ID",
          name: "mlsid"
        }
      ]
    }
  },
  view: baseReactComponentView,
  isComponent: el => el.tagName === "LISTING"
});

editor.setComponents(`
  <html>
  <head>
  </head>
  <body>
    <div>
      <span>
        Foo
      </span>
      <Listing>
        Hi
      </Listing>
      <MuiButton color="primary" variant="contained">
          Click Me
        </MuiButton>
      <Slider />
    </div>
  </body>
`);
