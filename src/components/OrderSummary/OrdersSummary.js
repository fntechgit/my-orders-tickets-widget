import React from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OrderSummaryTable } from "./OrderSummaryTable";
import RefundEmailSupport from "./RefundEmailSupport";
import "./styles.scss";

function OrderSummary({ order, summit, tickets }) {
  const { t } = useTranslation();
  return (
    <>
      <Box className="order-summary-wrapper" sx={{ pt: 4, px: 4 }}>
        <h3>{t("order_summary.order_summary")}</h3>
        <Grid container>
          <Grid
            xs={12}
            className="order-summary-purchased-info"
            sx={{ pb: 3 }}
            item
          >
            <OrderSummaryTable
              order={order}
              summit={summit}
              tickets={tickets}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="order-summary-refund-support" xs={12} sx={{ pb: 3 }}>
        <RefundEmailSupport
          onRefundClick={() => {}}
          onRefundDetailClick={() => {}}
          onEmailSupportClick={() => {}}
        />
      </Box>
    </>
  );
}

OrderSummary.propTypes = {
  order: PropTypes.object,
  summit: PropTypes.object,
  tickets: PropTypes.arrayOf(Object),
};

export default OrderSummary;
