import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../stores/store"
import { useNavigate } from "react-router-dom"
import { CreateLogin } from "../../../stores/slices/auth.slice"
import thumbnail from '../../../assets/parentingpet.jpg'
const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [logins, setLogins] = useState<object | null>({
    username: "johndoe",
    password: "securePassword123"
  })

  const handleChange = (e) => {
    setLogins({ ...logins, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    for (const [key, value] of Object.entries(logins)) {
      if (value === '') {
        alert('Please fill all the fields')
        return;
      }
    }
    const formdata = new FormData()
    for (const [key, value] of Object.entries(logins)) {
      formdata.append(key, value)
    }
    dispatch(CreateLogin(formdata))
  }

  const teamsGateAwayLoginState = useSelector((state: RootState) => state.auth.login)

  const { pending, data, error } = teamsGateAwayLoginState

  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error.message))
    }
    if (data) {
      navigate('/')
    }
  }, [pending, data, error ])


  return (
    // <div className="grid grid-cols-5 gap-4 h-screen">
    //   <div className="col-span-2 w-full h-full space-y-4 flex items-center flex-col justify-center p-12">
    //     <div className="space-y-[1px] w-full">
    //       <label htmlFor="username" className="text-xs font-semibold text-black/50">Enter Username</label>
    //       <Input name="username" value={logins.username} onChange={handleChange} icon={MailCheck} placeholder="Type password here" type="text" className="w-full" />
    //     </div>
    //     <div className="space-y-[1px] w-full">
    //       <label htmlFor="email" className="text-xs font-semibold text-black/50">Enter Password</label>
    //       <Input name="password" value={logins.password} onChange={handleChange} icon={SquareAsterisk} placeholder="Type password here" type="password" className="w-full" />
    //     </div>
    //     <div className="flex justify-center">
    //       <Button loading={pending} onClick={handleLogin} variant="primary">Login</Button>
    //     </div>
    //   </div>
    //   <div className="col-span-3 h-full w-full overflow-hidden">
    //     <img src={thumbnail} className="" alt="" />
    //   </div>
    // </div>
    <section className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <img className="object-cover object-top w-full h-full" src={thumbnail} alt="" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

            <div className="relative">
                <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                    <h3 className="text-4xl font-bold text-white">35+ brands &  50+<br className="hidden xl:block" />categories to takes care of your pets.</h3>
                    <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white"> Quality Products </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white"> One Stop Shop </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white"> 12+ Products Certified </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white"> Less Price </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in to Whisker</h2>
                <p className="mt-2 text-base text-gray-600">Don’t have an account? <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Create a free account</a></p>

                <div  className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label for="" className="text-base font-medium text-gray-900"> Username </label>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>

                                <input
                                name="username" value={logins.username} onChange={handleChange}
                                    placeholder="Enter username to get started"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="" className="text-base font-medium text-gray-900"> Password </label>

                                <a href="#" title="" className="text-sm font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"> Forgot password? </a>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                        />
                                    </svg>
                                </div>

                                <input
                                    name="password" value={logins.password} onChange={handleChange} type="password"
                                    placeholder="Enter your password"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                            onClick={handleLogin}
                                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-3 space-y-3">
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                ></path>
                            </svg>
                        </div>
                        Sign in with Google
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                            </svg>
                        </div>
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

  )
}

export default Login