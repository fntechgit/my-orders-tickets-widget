import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import OrderListTickets from "./OrderListTickets";
import ButtonStyled from "../ButtonStyled";
import { PAGINATION_DISPLAY } from "../../utils";

function OrderListItem({
  order,
  tickets,
  total,
  onPaginateClick,
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
      {total > itemsToDisplay
        ? (
          <ButtonStyled
            styles={{
              display: "block",
              padding: "5px 10px",
              color: "#000000",
              fontSize: "1.3em",
              textDecoration: "underline",
              margin: "0 auto",
              textTransform: "none",
              cursor: "pointer",
            }}
            onClick={onPaginate}
          >
            {t("orders-tickets.view_more")}
          </ButtonStyled>
        ) : ""}
    </>
  );
}

OrderListItem.propTypes = {
  order: PropTypes.object,
  tickets: PropTypes.arrayOf(Object),
};

export default OrderListItem;
