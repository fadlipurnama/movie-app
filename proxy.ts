import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

export default createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id'
});

export const config = {
  matcher: ['/', '/(id|en)/:path*']
};