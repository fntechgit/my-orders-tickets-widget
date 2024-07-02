import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Grid } from "@mui/material";
import OrderListItem from "./OrderListItem";
import OrderSummary from "../OrderSummary/OrdersSummary";
import { ONE, getTicketsByOrder } from "../../actions";
import { getOrderTickets } from "../../utils";
import "./styles.scss";

function OrdersList(props) {
  const {
    summit,
    order,
  } = props;
  const dispatch = useDispatch();
  const {
    total,
    current_page,
    per_page,
    memberOrders,
  } = useSelector((state) => state.widgetState || {}, shallowEqual);
  const fetchTicketsByOrder = async () => {
    await dispatch(getTicketsByOrder({ orderId: order.id, page: current_page, perPage: per_page }))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchTicketsByOrder();
  }, []);

  const onPaginateClick = () => dispatch(getTicketsByOrder({
    orderId: order.id,
    page: current_page + ONE,
    perPage: per_page,
    next: true,
  }));

  return (
    <Grid
      key={order.id}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="order-ticket-container"
    >
      <Grid
        padding={2}
        item
        lg={7}
        md={7}
        sm={12}
        xs={12}
        order={{ md: 1, lg: 1 }}
        className="ticket-list-container"
      >
        <OrderListItem
          order={order}
          tickets={getOrderTickets(memberOrders, order.id)}
          total={total}
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
  );
}

OrdersList.propTypes = {
  summit: PropTypes.object,
  order: PropTypes.object,
};

export default OrdersList;
