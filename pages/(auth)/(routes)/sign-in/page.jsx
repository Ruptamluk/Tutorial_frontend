import SignInForm from "./components/sign-form"
export default function Dashboard() {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#e8f4fd]">
        <div>
          <a href="/">
            {/* <h2 className="font-bold text-xl">
              Log in{" "}
              <span className="bg-[#f84525] text-white px-2 rounded-md">
                HSE chatbot with Vizi copilot
              </span>
            </h2> */}
            <div className="text-[#2E70DD] text-3xl pt-10 font-bold">
              HSE ChatBot with VIZI CoPilot
            </div>
          </a>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}