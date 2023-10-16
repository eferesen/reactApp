import { hosts } from '../constants/hosts';

export const removeHostUrl = (excludeHost: string) => {
  return hosts.filter((host) => {
    return host !== excludeHost;
  })
}