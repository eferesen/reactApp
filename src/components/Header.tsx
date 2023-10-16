// import VisitIdIframe from "./VisitIdIframe"
import { useEffect } from 'react'
import { hosts } from '../constants/hosts'
import { setCookieValue } from '../utils/cookies'
import { Outlet } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    window.addEventListener('message', function (event) {
      console.log('Header event', event)
      const host = event.origin;
      console.log(`Setting cookie ${host}`)

      // Only take action if origin is present and visitId is present
      if (event.data.eh_visit_id && hosts.includes(host)) {
        setCookieValue(`eh_visit_id`, event.data.eh_visit_id, {
          sameSite: 'strict'
        });
        setCookieValue(`eh_visit_ts`, event.data.eh_visit_ts, {
          sameSite: 'strict'
        });
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