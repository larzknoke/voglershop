import Link from "next/link";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/header/logo.png" className="h-56 m-auto p-8 z-10" />
      </div>
      <nav className="nav">
        <Link href="/">
          <a>Hofladen</a>
        </Link>
        <Link href="/backwaren">
          <a>Backwaren</a>
        </Link>
        <a href="#">Obst/Gemüse</a>
        <a href="#">Fleisch/Wurst</a>
        <a href="#">Milchprodukte</a>
        <a href="#">Sonstiges</a>
      </nav>
    </header>
  );
}

export default Header;
