import Profile from "./subcomps/Profile"

const Navbar = () => {
  return (
    <div className=''>
      <div className='p-2 flex items-center justify-between'>
        <p className='p-0 m-0'>1</p>
        <div className='p-0'>
        <Profile />
        </div>
      </div>
    </div>
  )
}

export default Navbar