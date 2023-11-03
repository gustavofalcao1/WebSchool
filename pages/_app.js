import React from 'react';

import "../styles/index.css"
import "../styles/app/index.css"
import "../styles/app/loading.css"
import "../styles/navigation/index.css"
import "../styles/header/index.css"
import "../styles/auth/index.css"
import "../styles/auth/login.css"
import "../styles/components/alert.css"
import "../styles/main/index.css"
import "../styles/main/dashboard.css"
import "../styles/main/requests.css"
import "../styles/main/inventory.css"
import "../styles/main/users.css"
import "../styles/main/rooms.css"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}