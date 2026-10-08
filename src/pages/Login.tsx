import { useState, type FormEvent } from 'react'
import logo from '../assets/logo.jpg'
import { Coin, Star } from '../components/Doodles'

// Floating background decorations, echoing the coins and stars around the logo
const decorations = [
    { kind: 'coin', className: 'top-[7%] left-[5%] w-12', delay: '0s' },
    { kind: 'coin', className: 'top-[62%] left-[3%] w-9 hidden sm:block', delay: '-2s' },
    { kind: 'coin', className: 'bottom-[6%] left-[22%] w-10 hidden md:block', delay: '-4s' },
    { kind: 'coin', className: 'top-[10%] right-[8%] w-10', delay: '-1s' },
    { kind: 'coin', className: 'bottom-[10%] right-[5%] w-14 hidden sm:block', delay: '-3s' },
    { kind: 'star', className: 'top-[24%] left-[14%] w-6 hidden sm:block', delay: '0s' },
    { kind: 'star', className: 'top-[4%] left-[45%] w-5 hidden md:block', delay: '-0.8s' },
    { kind: 'star', className: 'top-[34%] right-[4%] w-7', delay: '-1.6s' },
    { kind: 'star', className: 'bottom-[4%] right-[30%] w-6 hidden md:block', delay: '-1.2s' },
    { kind: 'star', className: 'bottom-[18%] left-[8%] w-5', delay: '-0.4s' },
] as const

const inputClass =
    'w-full bg-cream/70 border-2 border-ink rounded-2xl pl-11 pr-4 py-3 text-[16px] text-ink-deep ' +
    'shadow-[3px_3px_0_0_var(--color-ink)] transition-all duration-200 placeholder:text-ink/35 ' +
    'focus:outline-none focus:bg-white focus:-translate-y-0.5 focus:shadow-[4px_5px_0_0_var(--color-ink)] ' +
    'focus:ring-4 focus:ring-tang-yellow/60'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
    }

    return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink flex items-center justify-center px-4 py-10">
        {/* Background */}
        <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(var(--color-ink)_1.2px,transparent_1.2px)] bg-size-[22px_22px]"
        />
        <div aria-hidden="true" className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 -right-32 w-[32rem] h-[32rem] rounded-full bg-pig/45 blur-3xl" />
        {decorations.map((d, i) => (
            <div
                key={i}
                aria-hidden="true"
                className={`absolute ${d.className} ${d.kind === 'coin' ? 'motion-safe:animate-float' : 'motion-safe:animate-twinkle'}`}
                style={{ animationDelay: d.delay }}
            >
                {d.kind === 'coin' ? <Coin className="w-full" /> : <Star className="w-full" />}
            </div>
        ))}

        <main className="relative w-full max-w-[960px] motion-safe:animate-card-entrance">
        <div className="grid md:grid-cols-2 bg-white border-[3px] border-ink rounded-[28px] shadow-[8px_8px_0_0_var(--color-ink)] overflow-hidden">

            {/* Brand panel (desktop) */}
            <section className="relative hidden md:flex flex-col items-center justify-center gap-7 p-10 bg-[#DDF1FB] border-r-[3px] border-ink overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute w-[720px] h-[720px] rounded-full motion-safe:animate-slow-spin
                                bg-[repeating-conic-gradient(rgba(255,255,255,0.75)_0deg_8deg,transparent_8deg_16deg)]
                                mask-[radial-gradient(circle,black_20%,transparent_65%)]"
                />
                <div className="relative motion-safe:animate-bob">
                    <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-ink" />
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-[3px] border-ink bg-cream">
                        <img src={logo} alt="Chop Tang logo" className="w-full h-full object-cover scale-[1.28]" />
                    </div>
                    <Star className="absolute -top-2 -right-3 w-9 motion-safe:animate-twinkle" />
                    <Coin className="absolute bottom-2 -left-5 w-11 motion-safe:animate-float" />
                </div>

                <div className="relative text-center">
                    <p className="font-display text-[26px] leading-tight font-semibold text-ink">
                        Track every trade.<br />
                        Tame every <span className="text-tang-orange">baht.</span>
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {[
                            { label: 'Trading P&L', bg: 'bg-tang-yellow' },
                            { label: 'Expenses', bg: 'bg-pig' },
                            { label: 'Budget', bg: 'bg-sky' },
                        ].map((chip) => (
                            <span
                                key={chip.label}
                                className={`${chip.bg} border-2 border-ink rounded-full px-3 py-1 text-[13px] font-semibold text-ink shadow-[2px_2px_0_0_var(--color-ink)]`}
                            >
                                {chip.label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form panel */}
            <section className="flex flex-col gap-6 p-7 sm:p-10">
                {/* Header */}
                <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                    <div className="md:hidden w-28 h-28 rounded-full overflow-hidden border-[3px] border-ink bg-cream shadow-[4px_4px_0_0_var(--color-ink)]">
                        <img src={logo} alt="Chop Tang logo" className="w-full h-full object-cover scale-[1.28]" />
                    </div>
                    <span className="-rotate-3 bg-pig border-2 border-ink rounded-full px-3 py-0.5 text-[13px] font-semibold text-ink shadow-[2px_2px_0_0_var(--color-ink)]">
                        Welcome back!
                    </span>
                    <div>
                        <h1
                            className="font-display text-[52px] leading-none font-bold bg-linear-to-b from-tang-yellow to-tang-orange
                                        bg-clip-text text-transparent [-webkit-text-stroke:2px_var(--color-ink)]
                                        drop-shadow-[3px_3px_0_var(--color-ink)] py-1"
                        >
                            ชอบตัง
                        </h1>
                        <p className="font-display text-[15px] font-medium tracking-[0.25em] text-ring">CHOP-TANG</p>
                        <p className="mt-2 text-[16px] text-ink/70">Log in to keep your money moving.</p>
                    </div>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[14px] font-semibold text-ink">
                            Email Address
                        </label>
                        <div className="relative">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50 pointer-events-none"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                <path d="m4 7 8 6 8-6" />
                            </svg>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="name@company.com"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-[14px] font-semibold text-ink">
                                Password
                            </label>
                            <a href="#" className="text-[14px] font-medium text-ring hover:text-tang-orange transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50 pointer-events-none"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <rect x="4" y="10" width="16" height="11" rx="3" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                            </svg>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className={`${inputClass} pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-ink/50 hover:text-ink
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                    {showPassword && <path d="M4 4l16 16" />}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full h-14 bg-linear-to-b from-tang-yellow to-tang-orange border-[3px] border-ink rounded-2xl
                                    font-display text-[18px] font-semibold text-ink-deep shadow-[4px_4px_0_0_var(--color-ink)]
                                    transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_6px_0_0_var(--color-ink)]
                                    active:translate-x-1 active:translate-y-1 active:shadow-none
                                    focus:outline-none focus-visible:ring-4 focus-visible:ring-sky
                                    disabled:opacity-80 disabled:cursor-wait flex justify-center items-center gap-2 [perspective:200px]"
                    >
                        {loading ? (
                            <>
                                <Coin className="w-7 h-7 motion-safe:animate-coin-flip" />
                                <span>Counting coins…</span>
                            </>
                        ) : (
                            'Log In'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-grow border-t-2 border-dashed border-ink/20" />
                    <span className="text-[14px] font-medium text-ink/50">or</span>
                    <div className="flex-grow border-t-2 border-dashed border-ink/20" />
                </div>

                {/* Footer link */}
                <div className="text-center text-[16px] text-ink/70">
                    Don't have an account?{' '}
                    <a
                        href="#"
                        className="font-semibold text-ring underline decoration-wavy decoration-tang-orange underline-offset-4 hover:text-tang-orange transition-colors"
                    >
                        Sign up
                    </a>
                </div>
            </section>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-[14px] text-ink/60">
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
                <rect x="4" y="10" width="16" height="11" rx="3" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            Institutional Grade • Secure Encrypted Connection
        </p>
        </main>
    </div>
    )
};
