import React from "react";
import { theme } from "../../constants";
import { Text } from "react-native-ui-lib";
import { useTranslation } from "../../hooks/useTranslation";

export const Typography = (props: any) => {
  const {
    textType = "regular",
    size = theme.fontSize.medium,
    color = theme.color.black,
    align = "left",
    style = {},
    numberOfLines = undefined,
  } = props;
  const { t, isLangRTL } = useTranslation();

  let textStyle = {
    lineHeight: isLangRTL ? size * 2.2 : size * 1.6,
    fontSize: size,
    color: color,
    textAlign: align,
    writingDirection: isLangRTL ? "rtl" : "ltr",
    ...style,
  };

  switch (textType) {
    case "bold":
      textStyle.fontFamily = theme.font.bold;
      break;
    case "semiBold":
      textStyle.fontFamily = theme.font.semibold;
      break;
    case "regular":
      textStyle.fontFamily = theme.font.regular;
      break;
    case "medium":
      textStyle.fontFamily = theme.font.medium;
      break;
  }

  return (
    <Text color={color} style={textStyle} numberOfLines={numberOfLines}>
      {t(props?.children ?? "")}
    </Text>
  );
};
