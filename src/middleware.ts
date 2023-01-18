// import { withAuth } from 'next-auth/middleware';

// export default withAuth({
//   pages: {
//     signIn: '/auth/signin',
//   },
// });

import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default withAuth(
  (req: NextRequest) => {
    const sessionToken = req.cookies.get('next-auth.session-token');

    if (
      req.nextUrl.pathname.startsWith('/auth') ||
      req.nextUrl.pathname.startsWith('/_next')
    ) {
      return NextResponse.next();
    }
    if (!sessionToken) {
      const loginUrl = new URL('/auth/signin', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);
