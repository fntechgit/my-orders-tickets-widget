import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Box } from "@mui/material";
import OrdersList from "./OrdersList";
import { getSummitFormattedDate } from "../utils";
import { getUserOrders } from "../actions";
import * as styles from "./styles.module.scss";

function MyOrdersTickets() {
  const dispatch = useDispatch();
  const {
    summit,
    summit: { name },
    memberOrders,
    current_page,
    per_page
  } = useSelector((state) => state.widgetState || {}, shallowEqual);
  const fetchData = async () => {
    dispatch(getUserOrders({ page: current_page, perPage: per_page })).catch(
      (e) => {
        console.log(e);
      }
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        className={styles.widgetHeader}
        sx={{ padding: { xs: 2, md: 0, lg: 0 } }}
      >
        <h2 className={styles.summitTitleDate}>{name}</h2>
        <h2 className={styles.summitTitleDate}>
          {getSummitFormattedDate(summit)}
        </h2>
      </Box>
      {memberOrders?.map((order) => (
        <OrdersList key={order.id} order={order} summit={summit} />
      ))}
    </>
  );
}
export default MyOrdersTickets;
