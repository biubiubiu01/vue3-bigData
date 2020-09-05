import { h, provide } from "vue";

export default {
  name: "ZRow",
  functional: true,
  props: {
    gutter: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: "div",
    },
    className: {
      type: String,
      default: "",
    },
    type: String,
    justify: String,
    align: String,
  },

  setup(props, context) {
    const { gutter, type, justify, align, tag, className } = props;

    provide("ZRow", gutter);

    return () => [
      h(
        tag,
        {
          class: [
            "z-row",
            type == "flex" ? "z-row-flex" : "",
            justify ? `z-justify-${justify}` : "",
            align ? `z-algin-${align}` : "",
            className,
          ],
        },
        context.slots
      ),
    ];
  },
};
