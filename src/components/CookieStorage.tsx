import { useEffect } from 'react'
import { hosts } from '../constants/hosts'
import { setCookieValue } from '../utils/cookies'

const CookieStorage = () => {

  useEffect(() => {
    window.addEventListener('message', function (event) {
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
  return null
}

export default CookieStorage