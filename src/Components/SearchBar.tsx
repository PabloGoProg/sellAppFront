export function SearchBar():JSX.Element {

  return (
    <section className="w-full mx-[2.5%]">
      <form className="w-full">
        <input className='w-full px-3 py-2 font-semibold placeholder-black text-black rounded-xl placeholder-opacity-40 border-none ring-2 ring-gray-600 focus:ring-blue-600 focus:ring-2 focus:outline-none'
        type="text"
        name="search"
        placeholder="Busqueda"
        autoComplete="on"
        aria-label="Busqueda" />
      </form>
    </section>
  )
}