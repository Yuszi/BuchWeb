import './page.module.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';

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
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" href="/notes">
                    Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/create">
                    Add a book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/books">
                    List of all books
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
