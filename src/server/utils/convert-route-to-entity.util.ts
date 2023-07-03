const mapping: Record<string, string> = {
  companies: 'company',
  investigations: 'investigation',
  reports: 'report',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
