import './page.module.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './login';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BuchWeb',
  description: 'Search and create a book',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/create">Add a book</Link>
            <Link href="/books">List of all books</Link>
            <Login />
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
