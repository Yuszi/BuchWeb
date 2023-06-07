import Login from "../login";

export default function CreateLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
return (
  <section>
    <nav>
      <Login />
    </nav>
    {children}
  </section>
);

  }