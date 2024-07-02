import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import * as styles from "./styles.module.scss";

function RefundEmailSupport({
  onRefundClick,
  onRefundDetailClick,
  onEmailSupportClick,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Button
        className={styles.orderSummaryButton}
        variant="outlined"
        size="large"
        onClick={onRefundClick}
      >
        {t("order_summary.request_refund")}
      </Button>
      <Button
        className={styles.orderSummaryButton}
        variant="outlined"
        size="large"
        onClick={onRefundDetailClick}
      >
        {t("order_summary.refund_details")}
      </Button>
      <Button
        className={styles.orderSummaryButton}
        variant="outlined"
        size="large"
        onClick={onEmailSupportClick}
      >
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
