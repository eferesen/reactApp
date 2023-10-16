import cookie, { serialize } from 'cookie'

export const parseCookies = () => cookie.parse(document.cookie)

export const setCookieValue = (name: string, value: string, options: object) => {
  document.cookie = serialize(name, value, options)
}