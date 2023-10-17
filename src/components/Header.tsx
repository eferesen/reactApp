// import VisitIdIframe from "./VisitIdIframe"
import { useEffect } from 'react'
import { hosts } from '../constants/hosts'
import { setCookieValue } from '../utils/cookies'
import { Outlet } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    window.addEventListener('message', function (event) {
      const host = event.origin;

      // Only take action if origin is present and visitId is present
      if (event.data.eh_visit_id && hosts.includes(host)) {
        console.log(`event ${event.data.eh_visit_id}`)
        console.log(`Setting cookie ${host}`)
        setCookieValue(`eh_visit_id_${host}`, event.data.eh_visit_id, {
          sameSite: 'lax'
        });
        setCookieValue(`eh_visit_ts${host}`, event.data.eh_visit_ts, {
          sameSite: 'lax'
        });
        window.sessionStorage.setItem('eh_visit_id', event.data.eh_visit_id)
      }
    })
  }, [])
  return (
    <>
      <h1>Github Host</h1>
      <Outlet />
    </>
  )
}

export default Header