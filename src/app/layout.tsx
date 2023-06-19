import styles from './page.module.css';
import Link from 'next/link';
import Login from './login';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BuchWeb',
  description: 'Search and create a book',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main>
          <nav
            className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}
          >
            <Link className={`navbar-brand ${styles.navbarBrand}`} href="/">
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
              <ul className={`navbar-nav ${styles.navbarList}`}>
                <li className={`nav-item ${styles.navbarItem}`}>
                  <Link className="nav-link" href="/books">
                    Liste aller Bücher
                  </Link>
                </li>
                <li className={`nav-item ${styles.navbarItem}`}>
                  <Link className="nav-link" href="/create">
                    Buch hinzufügen
                  </Link>
                </li>
                <li className={`nav-item ${styles.navbarItem}`}>
                  <Link className="nav-link" href="/notes">
                    Notizen
                  </Link>
                </li>
                <li className={`nav-item ${styles.navbarItem}`}>
                  <Login />
                </li>
              </ul>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
