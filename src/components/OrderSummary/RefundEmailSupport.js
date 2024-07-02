import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "../ButtonStyled";

function RefundEmailSupport({ onRefundClick, onRefundDetailClick, onEmailSupportClick }) {
  const { t } = useTranslation();
  const styles = {
    width: "100%",
    color: "#000000",
    display: "inline-block",
    border: "1px solid #000000",
    margin: "15px 0 0",
    fontSize: "1.3em",
    padding: "10px",
  };
  return (
    <>
      <Button variant="outlined" size="large" onClick={onRefundClick} styles={styles}>
        {t("order_summary.request_refund")}
      </Button>
      <Button variant="outlined" size="large" onClick={onRefundDetailClick} styles={styles}>
        {t("order_summary.refund_details")}
      </Button>
      <Button variant="outlined" size="large" onClick={onEmailSupportClick} styles={styles}>
        {t("order_info.email_support")}
      </Button>
    </>
  );
}

RefundEmailSupport.propTypes = {
  onRefundClick: PropTypes.func,
  onRefundDetailClick: PropTypes.func,
  onEmailSupportClick: PropTypes.func,
};

export default RefundEmailSupport;
