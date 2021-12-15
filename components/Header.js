
function Header() {
  return (
    <header>
      <div className='logo'>
        <img
          src='/header/logo.png'
          className='h-56 m-auto p-8 z-10'
        />
      </div>
      <nav className="nav">
        <a href='#'>Voglerhof</a>
        <a href='#'>Hofladen</a>
        <a href='#'>Ferienwohnung</a>
        <a href='#'>Biogasanlage</a>
        <a href='#'>Ausbildung</a>
        <a href='#'>Kontakt</a>
      </nav>
    </header>
  )
}

export default Header