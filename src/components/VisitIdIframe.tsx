import { useEffect } from 'react';
import { parseCookies, setCookieValue } from '../utils/cookies'
import { removeHostUrl } from '../utils/filterHost';

const VisitIdIframe = () => {
  // Filtering so we don't create an iframe for the current host
  const filteredHosts = removeHostUrl(window.location.origin);

  useEffect(() => {

    window.onload = function () {
      const host = window.location.origin;
      const cookies = parseCookies();
      let visitId = cookies.eh_visit_id;
      let visitIdTs = cookies.eh_visit_ts;
      const currentTime = new Date();

      console.log(`${host} : visitId ${visitId}`);

      // Mimicking delay of setting cookie
      const timeOutId = setTimeout(() => {
        console.log(`${host} : Setting visitId cookie`);
        if (!visitId) {
          const uuid = Math.floor(new Date().valueOf() * Math.random())
          visitId = uuid.toString();
          visitIdTs = currentTime.toString();
          setCookieValue(`eh_visit_id`, uuid.toString(), {
            sameSite: 'strict'
          });
          setCookieValue(`eh_visit_ts`, currentTime.toString(), {
            sameSite: 'strict'
          });
        }
      }, 100);

      // Posting after visitId is set in cookie
      const intervalId = setInterval(function () {

        // Clearing interval if visitId is found
        if (visitId) {
          console.log(`${host} : Setting visitId to ${visitId}`);
          const postMsg = { eh_visit_id: visitId, eh_visit_ts: visitIdTs };
          postCrossDomainMessage(postMsg);
          clearInterval(intervalId);
          clearTimeout(timeOutId);
        }
      }, 500);

      const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
        input !== null && input.tagName === 'IFRAME';

      const postCrossDomainMessage = (msg: unknown) => {
        console.log(`${host} : Posting message to ${filteredHosts}`);
        filteredHosts.forEach((host) => {
          const win = document.getElementById(host);
          if (isIFrame(win) && win.contentWindow) {
            win.contentWindow.postMessage(msg, `${host}/cookieStorage`);
          }
        })
      }
    }

  })

  return (
    filteredHosts.map((host) => {
      const visitIdRoute = `${host}/cookieStorage`
      // We will have multiple iframes, one for each host
      // so the `id` has to be unique
      // In the postCrossDomainMessage function 👆 we will use hostname to pull getElementById
      return (
        <iframe
          key={host}
          style={{ display: 'none' }}
          src={visitIdRoute}
          loading='lazy'
          id={host}
        ></iframe>
      );
    })
  );
}

export default VisitIdIframe;

