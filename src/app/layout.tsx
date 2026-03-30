"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
