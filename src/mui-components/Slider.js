import { Slider } from "@material-ui/core";

export default function({ editor, model, view }) {
  editor.BlockManager.add("slider", {
    label: "<div class='gjs-fonts gjs-f-b1'>Slider</div>",
    content: "<Slider />"
  });

  editor.DomComponents.addType("Slider", {
    model: {
      ...model,
      defaults: {
        component: Slider,
        stylable: false,
        editable: true,
        void: true,
        attributes: {
          min: 0,
          max: 100
        },
        traits: [
          {
            type: "number",
            label: "Min",
            name: "min"
          },
          {
            type: "number",
            label: "Max",
            name: "max"
          }
        ]
      }
    },
    view,
    isComponent: el => el.tagName === "SLIDER"
  });
}
