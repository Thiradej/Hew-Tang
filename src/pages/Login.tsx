import { useState, type FormEvent } from 'react'
import logo from '../assets/logo.jpg'

export default function Login() {
    const [loading, setLoading] = useState(false)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
    }

    return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4a9da]">
        <main className="w-full max-w-[420px]">
        <div className="bg-[#78acdf] backdrop-blur-md border border-[#78acdf] rounded-lg p-8 flex flex-col gap-6 shadow-2xl">

            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center">
                <img src={logo} alt="Hew Tang logo" className="w-16 h-16 object-cover rounded" />
                    <div>
                        <h1 className="text-[32px] font-semibold text-[#78acdf] mb-1">Chop Tang</h1>
                        <p className="text-[16px] text-[#C2C6D7]">Welcome back. Log in to continue.</p>
                    </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-[12px] font-bold uppercase tracking-wider text-[#C2C6D7]">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        className="bg-[#0B0E11] border border-[#2D333B] rounded px-4 py-3 text-[16px] text-[#E1E2E7]
                                    focus:outline-none focus:border-[#2F6FED] focus:ring-1 focus:ring-[#2F6FED]
                                    placeholder:text-[#C2C6D7]/50"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="text-[12px] font-bold uppercase tracking-wider text-[#C2C6D7]">
                            Password
                        </label>
                        <a href="#" className="text-[14px] text-[#2F6FED] hover:opacity-80">Forgot password?</a>
                    </div>
                    <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-[#0B0E11] border border-[#2D333B] rounded px-4 py-3 text-[16px] text-[#E1E2E7]
                                focus:outline-none focus:border-[#2F6FED] focus:ring-1 focus:ring-[#2F6FED]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full h-12 bg-[#2F6FED] hover:bg-[#2F6FED]/90 text-white font-semibold rounded
                                transition-all active:scale-[0.98] disabled:opacity-60 flex justify-center items-center"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Log In'
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
                <div className="flex-grow border-t border-[#2D333B]" />
                <span className="text-[14px] text-[#C2C6D7]">or</span>
                <div className="flex-grow border-t border-[#2D333B]" />
            </div>

            {/* Footer link */}
            <div className="text-center text-[16px] text-[#C2C6D7]">
                Don't have an account?{' '}
                <a href="#" className="text-[#2F6FED] font-medium hover:opacity-80">Sign up</a>
            </div>
        </div>

        <p className="mt-8 text-center text-[14px] text-[#C2C6D7]/80">
            Institutional Grade • Secure Encrypted Connection
        </p>
        </main>
    </div>
    )
};