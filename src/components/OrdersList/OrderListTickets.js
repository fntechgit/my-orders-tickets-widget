import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, Grid, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import * as styles from "./styles.module.scss";
import TicketStatus from "../TicketStatus";

function OrderListTickets({ ticket }) {
  const { t } = useTranslation();
  return (
    <Grid key={ticket.id} className={styles.orderWrapper} container>
      <Grid xs={7} padding={2} item className={styles.ticketTicketType}>
        <h4>{ticket.ticket_type?.name}</h4>
      </Grid>
      <Grid xs={5} padding={2} item>
        {/* To add badge features */}
      </Grid>
      <Grid xs={12} sx={{ px: 2, pb: 2 }} item>
        {ticket.owner?.email ? (
          <>
            <Box className={styles.label}>
              {t("ticket_status.assigned_to")}:
            </Box>
            <Box className={styles.ticketOwnerEmail}>{ticket.owner?.email}</Box>
            <Box className={styles.ticketNoContainer}>
              <span>Ticket #:</span>
              <span className={styles.ticketTicketNumber}>{ticket.number}</span>
              <ContentCopyIcon
                className={styles.copyIcon}
                onClick={() => navigator.clipboard.writeText(ticket.number)}
              />
            </Box>
          </>
        ) : (
          <span className={styles.ticketOwnerEmail}>
            {t("ticket_status.attendee_status_unassigned")}
          </span>
        )}
      </Grid>
      <Grid container>
        <Grid
          container
          direction="row"
          xs={5}
          justify="flex-end"
          alignItems="center"
          item
        >
          <TicketStatus ticket={ticket} />
        </Grid>
        <Grid padding={2} xs={7} container item>
          <Grid item xs={4}>
            {/* TO CHANGE */}
            {ticket.total_refunded_amount ? (
              <div className="">Refund Requested</div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={8} align="right">
            {ticket.owner ? (
              <>
                <Button className={styles.viewTicketButton}>
                  {t("ticket_status.view_ticket")}
                </Button>
                <Button className={styles.reassignButton}>
                  {t("ticket_status.reassign_ticket")}
                </Button>
              </>
            ) : (
              <Button className={styles.assignTicketButton}>
                {t("ticket_status.assign_ticket")}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

OrderListTickets.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.shape({
      email: PropTypes.string
    }),
    number: PropTypes.string,
    total_refunded_amount: PropTypes.number,
    ticket_type: PropTypes.shape({
      name: PropTypes.string
    })
  })
};

export default OrderListTickets;
