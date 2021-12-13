
function Header() {
  return (
    <header
      className='
        w-full fixed bg-cover bg-center bg-[url("/header/header_bg.jpg")]
        before:absolute  before:-z-50 before:inset-0 before:bg-gradient-to-b before:from-[#fffef2E6] before:to-[#edecb3F2]
        '>
      <img
        src='/header/logo.png'
        className='h-56 m-auto p-8 z-10'
      />
    </header>
  )
}

export default Header