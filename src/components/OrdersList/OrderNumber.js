import React from "react";
import PropTypes from "prop-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import * as styles from "./styles.module.scss";

function OrderNumber({ number, copy = false }) {
  return (
    <div className={styles.orderTicketNoContainer}>
      <span className={styles.orderTicketNumber}>{number}</span>
      {copy && (
        <ContentCopyIcon
          className={styles.copyIcon}
          onClick={() => navigator.clipboard.writeText(number)}
        />
      )}
    </div>
  );
}

OrderNumber.propTypes = {
  number: PropTypes.string,
  copy: PropTypes.bool
};

export default OrderNumber;
