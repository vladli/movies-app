import React from "react";
import { Metadata } from "next/types";

import Container from "./Container";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function Page() {
  return <Container />;
}
