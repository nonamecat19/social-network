type Route = {
  name: string
  path: string
  icon: string
}

export const ROUTES: Route[] = [
  {
    name: 'feed',
    path: '/feed',
    icon: 'carbon:rss',
  },
  {
    name: 'profile',
    path: '/profile',
    icon: 'carbon:settings',
  },
  {
    name: 'chat',
    path: '/chat',
    icon: 'carbon:chat',
  },
  {
    name: 'friends',
    path: '/friends',
    icon: 'carbon:group',
  },
]
