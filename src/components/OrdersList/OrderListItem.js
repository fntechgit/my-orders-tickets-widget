import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import OrderListTickets from "./OrderListTickets";
import { PAGINATION_DISPLAY } from "../../utils";
import * as styles from "./styles.module.scss";

function OrderListItem({
  order, tickets, total, onPaginateClick,
}) {
  const { t } = useTranslation();
  const [itemsToDisplay, setItemsToDisplay] = useState(PAGINATION_DISPLAY);
  const slicedTickets = tickets?.slice(0, itemsToDisplay);

  const onPaginate = () => {
    if (total > tickets.length) {
      onPaginateClick();
    }
    setItemsToDisplay(itemsToDisplay + itemsToDisplay);
  };

  return (
    <>
      {slicedTickets?.map((ticket) => (
        <OrderListTickets key={ticket.id} order={order} ticket={ticket} />
      ))}
      {total > itemsToDisplay ? (
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
  tickets: PropTypes.arrayOf(Object),
};

export default OrderListItem;
