import { Button } from "@material-ui/core";

export default function({ editor, model, view }) {
  editor.BlockManager.add("muibutton", {
    label: "<div class='gjs-fonts gjs-f-b1'>Button</div>",
    content:
      "<MuiButton variant='contained' color='primary'>Click Me</MuiButton>"
  });

  editor.DomComponents.addType("MuiButton", {
    model: {
      ...model,
      attributes: {
        color: "primary",
        variant: "contained"
      },
      defaults: {
        component: Button,
        stylable: false,
        editable: true,
        traits: []
      }
    },
    view,
    isComponent: el => el.tagName === "MUIBUTTON"
  });
}
