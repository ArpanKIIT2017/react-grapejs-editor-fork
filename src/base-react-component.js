import ReactDOM from "react-dom";
import React from "react";

const Wrapper = props => {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: props.html }
  });
};

export default editor => {
  const defaultType = editor.DomComponents.getType("default");

  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const model = {
    ...defaultModel,
    toHTML(opts = {}) {
      this.attributes.tagName = this.attributes.type;
      return defaultModel.prototype.toHTML.apply(this, opts);
    }
  };

  const view = {
    ...defaultView,
    tagName: "div",
    init: function() {
      this._render();
      this.listenTo(
        this.model,
        "change:attributes change:src",
        this._render.bind(this)
      );

      this.model.get("components").on("add remove", this._render.bind(this));
    },

    getChildrenContainer() {
      const { childrenContainer } = this;
      if (childrenContainer) return childrenContainer;

      return (this.childrenContainer = document.createElement("div"));
    },

    _getComponent() {
      this.renderChildren();

      const html = this.getChildrenContainer().outerHTML;

      const props = {
        ...this.model.get("attributes"),
        children: [
          Wrapper({
            html
          })
        ]
      };

      const component = this.model.get("component");

      return React.createElement(component, props);
    },

    _render: function() {
      ReactDOM.render(this._getComponent(), this.el);
      return this;
    },

    render: function() {
      return this._render();
    }
  };

  return {
    baseReactComponentModel: model,
    baseReactComponentView: view
  };
};
