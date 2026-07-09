import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export const runtime = 'edge';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ko|en|ja|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
