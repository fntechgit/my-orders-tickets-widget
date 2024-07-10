import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import OrderListTickets from "./OrderListTickets";
import { PAGINATION_DISPLAY, getFormattedDate } from "../../utils";
import OrderNumber from "./OrderNumber";
import * as styles from "./styles.module.scss";

function OrderListItem({ order, tickets, total, onPaginateClick }) {
  const { t } = useTranslation();
  const [itemsToDisplay, setItemsToDisplay] = useState(PAGINATION_DISPLAY);
  const slicedTickets = tickets?.slice(0, itemsToDisplay);
  const detailsRequired = tickets?.find(
    (ticket) => ticket.owner?.status === "Incomplete"
  );

  const onPaginate = () => {
    if (total > tickets.length) {
      onPaginateClick();
    }
    setItemsToDisplay(itemsToDisplay + itemsToDisplay);
  };

  return (
    <>
      <Box>
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

      {slicedTickets?.map((ticket) => (
        <OrderListTickets key={ticket.id} order={order} ticket={ticket} />
      ))}
      {tickets?.length > itemsToDisplay ? (
        <Button className={styles.viewMoreButton} onClick={onPaginate}>
          {t("orders-tickets.view_more")}
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

OrderListItem.propTypes = {
  order: PropTypes.object,
  tickets: PropTypes.arrayOf(Object)
};

export default OrderListItem;
