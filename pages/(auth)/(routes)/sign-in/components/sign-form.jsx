"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { FaEyeLowVision, FaEye } from "react-icons/fa6"
import indorama from "@/public/icons/indorama.png"
import vizi from "@/public/icons/visonize.svg"
import Image from "next/image"

const SignInForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [pass, setPass] = useState("")
  const [err, setErr] = useState("")
  const [type, setType] = useState("password")

  function validateEmailRegex(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function checkPasswordLength(password) {
    const passwordString = String(password)
    return passwordString.length >= 6
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const values = {
      identifier: name,
      password: pass,
    }
    const validMail = validateEmailRegex(name)
    const validPass = checkPasswordLength(pass)

    if (!validPass) {
      setErr("Password should be at least 6 characters")
    }
    if (!validMail) {
      setErr("Invalid email address")
    }
    if (validMail && validPass) {
      setErr("")
      try {
        setLoading(true)
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error?.message)
        } else {
          router.push("/chat")
        }
      } catch (error) {
        alert(`Something went wrong ${error}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password")
  }

  return (
    <form>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <Image src={indorama} className="w-40" alt="indorama" />
          <Image src={vizi} className="w-40" alt="visonize" />
        </div>
      </div>

      <div>
        <label
          className="block font-medium text-sm text-gray-700"
          htmlFor="email"
        >
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="mt-4">
        <label
          className="block font-medium text-sm text-gray-700"
          htmlFor="password"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={type}
            name="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              type="button"
              onClick={handleToggle}
              className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
            >
              {type === "password" ? <FaEyeLowVision /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>
      <p
        className="text-sm text-red-600 mt-2"
        id="hs-validation-name-error-helper"
      >
        {err}
      </p>
      <div className="block mt-4">
        <label htmlFor="remember_me" className="flex items-center">
          <input
            type="checkbox"
            id="remember_me"
            name="remember"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
          />

          <span className="ms-2 text-sm text-gray-600">Remember Me</span>
        </label>
      </div>

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={onSubmit}
          className="ms-4 inline-flex items-center px-4 py-2 bg-[#112e87] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </form>
  )
}

export default SignInForm