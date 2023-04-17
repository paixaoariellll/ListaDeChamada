import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';
import { AiOutlineLoading } from "react-icons/ai";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}


function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=É necessário está conectado à sua conta para acessar essa página!');
    },
  });
  
  if (status === 'loading') {
    return <AiOutlineLoading className="rotate" />;
  }

  if (adminOnly && !session.user.isTeacher) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default MyApp;
