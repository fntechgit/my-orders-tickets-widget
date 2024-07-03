import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Box } from "@mui/material";
import OrdersList from "./OrdersList";
import { getSummitFormattedDate } from "../utils";
import { getUserOrders } from "../actions";

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
      <Box className="widget-header">
        <h2 className="summit-title">{name}</h2>
        <h3 className="summit-date">{getSummitFormattedDate(summit)}</h3>
      </Box>
      {memberOrders?.map((order) => (
        <OrdersList key={order.id} order={order} summit={summit} />
      ))}
    </>
  );
}
export default MyOrdersTickets;
