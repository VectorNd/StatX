// components/Navbar.tsx
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/history">Search History</Link>
      {session ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}