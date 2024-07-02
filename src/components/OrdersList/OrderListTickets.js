import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, Grid } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "../ButtonStyled";

function OrderListTickets({ ticket }) {
  const { t } = useTranslation();
  return (
    <Grid key={ticket.id} className="order-wrapper" container>
      <Grid xs={7} padding={2} item className="ticket-ticket-type">
        <h4>{ticket.ticket_type?.name}</h4>
      </Grid>
      <Grid xs={5} padding={2} item>
        {/* To add badge features */}
      </Grid>
      <Grid xs={12} sx={{ px: 2, pb: 2 }} item>
        {ticket.owner?.email
          ? (
            <>
              <Box className="label">
                {t("ticket_status.assigned_to")}
                :
              </Box>
              <Box className="ticket-owner-email">
                {ticket.owner?.email}
              </Box>
              <Box className="ticket-no-container">
                <span>Ticket #:</span>
                <span className="ticket-ticket-number">
                  {ticket.number}
                </span>
                <ContentCopyIcon
                  className="copy-icon"
                  onClick={() => navigator.clipboard.writeText(ticket.number)}
                />
              </Box>
            </>
          ) : (
            <span className="ticket-owner-email">
              {t("ticket_status.attendee_status_unassigned")}
            </span>
          )}
      </Grid>
      <Grid container>
        <Grid padding={2} xs={4} item>
          {/** statuses: incomplete, complete, unassigned */}
        </Grid>
        <Grid padding={2} xs={8} container item>
          <Grid item xs={4}>
            {/* TO CHANGE */}
            {ticket.total_refunded_amount ? <div className="">Refund Requested</div> : ""}
          </Grid>
          <Grid item xs={8} align="right">
            {ticket.owner
              ? (
                <>
                  <Button
                    styles={{
                      padding: "5px 10px",
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      border: "1px solid #000000",
                      fontSize: "1em",
                      marginRight: "10px",
                    }}
                  >
                    {t("ticket_status.view_ticket")}
                  </Button>
                  <Button
                    styles={{
                      padding: "5px 10px",
                      color: "#000000",
                      display: "inline-block",
                      border: "1px solid #000000",
                      fontSize: "1em",
                    }}
                  >
                    {t("ticket_status.reassign_ticket")}
                  </Button>
                </>
              )
              : (
                <Button
                  styles={{
                    padding: "5px 10px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "1px solid #000000",
                    fontSize: "1em",
                    marginRight: "10px",
                  }}
                >
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
      email: PropTypes.string,
    }),
    number: PropTypes.string,
    total_refunded_amount: PropTypes.number,
    ticket_type: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default OrderListTickets;
