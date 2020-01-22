import { SnackbarContent } from "@material-ui/core";
import React from "react";

const Component = props => {
  return <SnackbarContent {...props} message={props.children} />;
};

export default function({ editor, model, view }) {
  editor.BlockManager.add("snackbar", {
    label: "<div class='gjs-fonts gjs-f-b1'>Snackbar</div>",
    content: "<Snackbar>Click Me</Snackbar>"
  });

  editor.DomComponents.addType("Snackbar", {
    model: {
      ...model,
      attributes: {},
      defaults: {
        component: Component,
        stylable: false,
        editable: true,
        traits: []
      }
    },
    view,
    isComponent: el => el.tagName === "SNACKBAR"
  });
}
