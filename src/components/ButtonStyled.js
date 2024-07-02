import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)((props) => ({
  ...props.styles,
}));

function ButtonStyled({
  children,
  onClick,
  styles,
  variant,
}) {
  return (
    <StyledButton variant={variant} onClick={onClick} styles={styles}>
      {children}
    </StyledButton>
  );
}

ButtonStyled.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.object,
};

export default ButtonStyled;
