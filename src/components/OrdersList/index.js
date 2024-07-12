import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import OrderListItem from "./OrderListItem";
import OrderSummary from "../OrderSummary";
import { ONE, getTicketsByOrder } from "../../actions";
import { getOrderTickets, getFormattedDate } from "../../utils";
import OrderNumber from "./OrderNumber";
import * as styles from "./styles.module.scss";

function OrdersList(props) {
  const { summit, order } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { per_page, last_page, memberOrders } = useSelector(
    (state) => state.widgetState || {},
    shallowEqual
  );
  const detailsRequired = order.memberTickets?.find(
    (ticket) => ticket.owner?.status === "Incomplete"
  );
  const fetchTicketsByOrder = async () => {
    await dispatch(
      getTicketsByOrder({
        orderId: order.id,
        current_page: last_page,
        perPage: per_page
      })
    ).catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    fetchTicketsByOrder();
  }, []);

  const onPaginateClick = () =>
    dispatch(
      getTicketsByOrder({
        orderId: order.id,
        page: order.tickets_page_current + ONE,
        perPage: per_page,
        next: true
      })
    );

  return (
    <>
      <Box
        sx={{
          padding: {
            xs: 2,
            md: 1,
            lg: 0
          }
        }}
      >
        <span className={styles.orderTicketInfo}>
          {t("orders.purchased")}: {getFormattedDate(order.created)} |{" "}
          {t("order_summary.order_no")}:{" "}
          <OrderNumber number={order.number} copy />
        </span>
        {detailsRequired && (
          <span className={styles.detailsRequiredLabel}>
            <ErrorIcon sx={{ color: "#FF9800" }} />
            {t("ticket_status.status_details_required")}
          </span>
        )}
      </Box>
      <Grid
        key={order.id}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className={styles.orderTicketContainer}
        sx={{
          flexDirection: {
            xs: "column-reverse",
            md: "row",
            lg: "row"
          },
          padding: {
            xs: 2,
            md: 0,
            lg: 0
          }
        }}
      >
        <Grid
          padding={2}
          item
          lg={7}
          md={7}
          sm={12}
          xs={12}
          order={{ md: 1, lg: 1 }}
          className={styles.ticketListContainer}
        >
          <OrderListItem
            order={order}
            tickets={getOrderTickets(memberOrders, order.id)}
            total={order.tickets_total}
            onPaginateClick={onPaginateClick}
          />
        </Grid>
        <Grid
          padding={2}
          item
          lg={5}
          md={5}
          sm={12}
          xs={12}
          order={{ md: 1, lg: 1 }}
        >
          <OrderSummary
            order={order}
            summit={summit}
            tickets={getOrderTickets(memberOrders, order.id)}
          />
        </Grid>
      </Grid>
    </>
  );
}

OrdersList.propTypes = {
  summit: PropTypes.object,
  order: PropTypes.object
};

export default OrdersList;
