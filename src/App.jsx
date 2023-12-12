import './App.css'

function App() {


  return (
    <div className='h-screen w-full p-0 flex'>
      <div className='bg-gray-300 h-full w-1/2 flex justify-center items-center '>
        <div className='flex flex-col w-4/5 h-3/4 border-solid border-2 rounded-lg  bg-white'>
          <div className='flex flex-row h-36 m-4'>
            <h2 className='font-semibold p-3 text-2xl'>NicoAdministracion</h2>
            <p className='font-semibold text-blue-800 text-xs ml-12 p-5'> <a href="www.google.com" className='border-b-[1px] border-blue-800'>Te olvidaste la contraseña?</a></p>
          </div>
          <div className='flex flex-col'>
            <form>
              <div class="mb-4 relative">
                <input type="text" id="username" name="username" placeholder="Usuario" className=" placeholder:text-slate-400 w-4/5 border rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <input type="password" id="password" placeholder='Contraseña' name="password" className="w-4/5 placeholder:text-slate-400 border rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="bg-blue-500 text-white w-4/5 py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">Iniciar Sesión</button>
              <div className='flex m-4 ml-12 w-4/5'>
                <button type="submit" className="border-solid border border-black hover:bg-blue-500 hover:text-white text-black w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">Google</button>
                <button type="submit" className="border-solid border border-black hover:bg-blue-500 hover:text-white text-black w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">Facebook</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='bg-yellow-700 h-full w-1/2'>
        <img src="src/assets/login.jpg" alt="" className='object-cover w-full h-full' />
      </div>
    </div>
  )
}
export default App
