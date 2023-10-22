import { Button } from "native-base";
import React from "react";
import Colors from "../constants/Colors";

type Props = {
  isSelected?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

const TagButton = ({ isSelected, onClick, children }: Props) => {
  return (
    <Button
      size="sm"
      variant="subtle"
      style={{
        borderRadius: 20,
        backgroundColor: isSelected ? Colors.lightPrimary : "transparent",
      }}
      onPress={onClick}
    >
      {children}
    </Button>
  );
};

export default TagButton;
