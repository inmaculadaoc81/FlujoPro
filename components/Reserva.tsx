"use client";

import Cal from "@calcom/embed-react";

export default function Reserva() {
  return (
    <Cal
      calLink="n8n-automatizaciones/30min"
      style={{ width: "100%", minHeight: 680 }}
      config={{ layout: "month_view", theme: "light", background: "#ffffff" }}
    />
  );
}
