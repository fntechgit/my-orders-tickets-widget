import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import OrderListTickets from "./OrderListTickets";
import { PAGINATION_DISPLAY } from "../../utils";
import * as styles from "./styles.module.scss";

function OrderListItem({ order, tickets, total, onPaginateClick }) {
  const { t } = useTranslation();
  const [itemsToDisplay, setItemsToDisplay] = useState(PAGINATION_DISPLAY);
  const slicedTickets = tickets?.slice(0, itemsToDisplay);
  const onViewMore = () => {
    if (total > tickets.length) {
      onPaginateClick();
    }
    setItemsToDisplay(itemsToDisplay + itemsToDisplay);
  };

  const onViewLess = () => setItemsToDisplay(PAGINATION_DISPLAY);

  return (
    <>
      {slicedTickets?.map((ticket) => (
        <OrderListTickets key={ticket.id} order={order} ticket={ticket} />
      ))}
      {tickets?.length > itemsToDisplay ? (
        <Button className={styles.viewMoreButton} onClick={onViewMore}>
          {t("orders-tickets.view_more")}
        </Button>
      ) : (
        ""
      )}
      {slicedTickets?.length && slicedTickets?.length === total ? (
        <Button className={styles.viewMoreButton} onClick={onViewLess}>
          {t("orders-tickets.view_less")}
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
