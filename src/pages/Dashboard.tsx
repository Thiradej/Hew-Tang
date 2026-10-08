import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import logo from '../assets/logo.jpg';
import { Coin, Star } from '../components/Doodles';

// Recharts draws SVG, so it needs raw hex values instead of Tailwind classes
const INK = '#0E3E66';
const ORANGE = '#F46A43';
const YELLOW = '#FEC969';

const monthlyPnl = [
  { day: '1', pnl: 0 },
  { day: '5', pnl: 1200 },
  { day: '10', pnl: 800 },
  { day: '15', pnl: 2400 },
  { day: '20', pnl: 1900 },
  { day: '25', pnl: 3100 },
  { day: '30', pnl: 2600 },
];

const recentActivity = [
  { id: 1, type: 'trade', label: 'XAUUSD Long', amount: 1250, date: '28 Sep' },
  { id: 2, type: 'expense', label: 'Food', amount: -180, date: '28 Sep' },
  { id: 3, type: 'trade', label: 'BTCUSD Short', amount: -420, date: '27 Sep' },
  { id: 4, type: 'expense', label: 'Transport', amount: -90, date: '26 Sep' },
  { id: 5, type: 'trade', label: 'EURUSD Long', amount: 310, date: '25 Sep' },
];

const budgetCategories = [
  { name: 'Food', spent: 3200, limit: 5000, color: 'bg-tang-yellow' },
  { name: 'Transport', spent: 1400, limit: 2000, color: 'bg-sky' },
  { name: 'Investing', spent: 4000, limit: 4000, color: 'bg-pig' },
];

const cardClass =
  'bg-white border-[3px] border-ink rounded-3xl shadow-[6px_6px_0_0_var(--color-ink)]';

function formatBaht(amount: number, withSign = false) {
  const sign = amount < 0 ? '-' : withSign ? '+' : '';
  return `${sign}฿${Math.abs(amount).toLocaleString()}`;
}

// Staggered pop-in: each section starts a little after the previous one
function entrance(index: number): CSSProperties {
  return { animationDelay: `${index * 80}ms` };
}

function Dashboard() {
  // Summary numbers calculated from mock data (will come from real data later)
  const totalBalance = 45680;
  const monthlyChange = 2600;
  const isPositive = monthlyChange >= 0;
  const winRate = 68;
  const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent, 0);
  const totalLimit = budgetCategories.reduce((sum, c) => sum + c.limit, 0);
  const budgetUsed = Math.round((totalSpent / totalLimit) * 100);
  const leftToSpend = totalLimit - totalSpent;

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink px-4 py-8 sm:px-6 md:px-12 md:py-10">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(var(--color-ink)_1.2px,transparent_1.2px)] bg-size-[22px_22px]"
      />
      <div aria-hidden="true" className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky/40 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/2 -right-40 w-[32rem] h-[32rem] rounded-full bg-pig/40 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* --- Header --- */}
        <header
          className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 motion-safe:animate-card-entrance"
          style={entrance(0)}
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[3px] border-ink bg-cream shadow-[4px_4px_0_0_var(--color-ink)] motion-safe:animate-bob">
              <img src={logo} alt="Chop Tang logo" className="w-full h-full object-cover scale-[1.28]" />
            </div>
            <div>
              <span className="inline-block -rotate-2 bg-sky border-2 border-ink rounded-full px-3 py-0.5 text-[12px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]">
                September recap
              </span>
              <h1 className="mt-1 font-display text-[34px] sm:text-[40px] leading-tight font-semibold text-ink">
                Dashboard
              </h1>
              <p className="text-[15px] text-ink/60">Here's how your money is moving this month.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/expenses"
              className="flex-1 md:flex-none text-center bg-white border-[3px] border-ink rounded-2xl px-5 py-2.5 font-display font-medium
                         shadow-[3px_3px_0_0_var(--color-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_var(--color-ink)]
                         active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              + Add expense
            </Link>
            <Link
              to="/trading-log"
              className="flex-1 md:flex-none text-center bg-linear-to-b from-tang-yellow to-tang-orange border-[3px] border-ink rounded-2xl px-5 py-2.5
                         font-display font-semibold text-ink-deep shadow-[3px_3px_0_0_var(--color-ink)] transition-all
                         hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              + Log a trade
            </Link>
          </div>

          <Star className="hidden md:block absolute -top-2 left-[42%] w-7 motion-safe:animate-twinkle" />
          <Coin className="hidden md:block absolute top-6 left-[52%] w-9 motion-safe:animate-float" />
        </header>

        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            label="Total Balance"
            value={formatBaht(totalBalance)}
            icon={<WalletIcon />}
            highlight
            hint="Across trading & savings"
            style={entrance(1)}
          />
          <SummaryCard
            label="Monthly P&L"
            value={formatBaht(monthlyChange, true)}
            valueColor={isPositive ? 'text-gain' : 'text-loss'}
            icon={<TrendIcon />}
            iconBg="bg-sky"
            hint={isPositive ? 'Nice! You\'re in the green' : 'Rough month, hang in there'}
            style={entrance(2)}
          />
          <SummaryCard
            label="Win Rate"
            value={`${winRate}%`}
            icon={<TargetIcon />}
            iconBg="bg-pig"
            progress={winRate}
            progressColor="bg-pig"
            style={entrance(3)}
          />
          <SummaryCard
            label="Budget Used"
            value={`${budgetUsed}%`}
            icon={<PieIcon />}
            iconBg="bg-tang-yellow"
            progress={budgetUsed}
            progressColor={budgetUsed >= 100 ? 'bg-loss' : 'bg-tang-yellow'}
            style={entrance(4)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Chart --- */}
          <section
            className={`lg:col-span-2 flex flex-col p-5 sm:p-6 ${cardClass} motion-safe:animate-card-entrance`}
            style={entrance(5)}
          >
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
              <div>
                <h2 className="font-display text-[20px] font-semibold">Cumulative P&L</h2>
                <p className="text-[14px] text-ink/55">This month, day by day</p>
              </div>
              <span
                className={`border-2 border-ink rounded-full px-3 py-1 font-display text-[15px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]
                            ${isPositive ? 'bg-gain/15 text-gain' : 'bg-loss/15 text-loss'}`}
              >
                {formatBaht(monthlyChange, true)}
              </span>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPnl} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={YELLOW} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={YELLOW} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={INK} strokeOpacity={0.1} strokeDasharray="4 6" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: INK, fillOpacity: 0.6, fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: INK, fillOpacity: 0.6, fontSize: 12 }}
                    tickFormatter={(v: number) => (v === 0 ? '฿0' : `฿${v / 1000}k`)}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                  />
                  <Tooltip
                    cursor={{ stroke: INK, strokeWidth: 2, strokeDasharray: '4 4' }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-white border-2 border-ink rounded-2xl px-3 py-2 shadow-[3px_3px_0_0_var(--color-ink)]">
                          <p className="text-[12px] text-ink/60">Day {label}</p>
                          <p className="font-display text-[16px] font-semibold text-ink">
                            {formatBaht(Number(payload[0].value), true)}
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="pnl"
                    stroke={ORANGE}
                    strokeWidth={3}
                    fill="url(#pnlFill)"
                    dot={{ r: 4, fill: '#fff', stroke: INK, strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: YELLOW, stroke: INK, strokeWidth: 2.5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* --- Budget Overview --- */}
          <section
            className={`flex flex-col p-5 sm:p-6 ${cardClass} motion-safe:animate-card-entrance`}
            style={entrance(6)}
          >
            <h2 className="font-display text-[20px] font-semibold">Budget by Category</h2>
            <p className="text-[14px] text-ink/55 mb-5">How much of each limit you've used</p>

            <div className="flex flex-col gap-5">
              {budgetCategories.map((cat) => {
                const percent = Math.min(Math.round((cat.spent / cat.limit) * 100), 100);
                const isFull = percent >= 100;
                return (
                  <div key={cat.name}>
                    <div className="flex justify-between items-center text-[14px] mb-1.5">
                      <span className="flex items-center gap-2 font-semibold">
                        <span className={`w-3 h-3 rounded-full border-2 border-ink ${cat.color}`} />
                        {cat.name}
                        {isFull && (
                          <span className="rotate-3 bg-loss text-white border-2 border-ink rounded-full px-2 text-[11px] font-bold">
                            FULL
                          </span>
                        )}
                      </span>
                      <span className="text-ink/60">
                        {formatBaht(cat.spent)} / {formatBaht(cat.limit)}
                      </span>
                    </div>
                    <div className="w-full h-4 bg-cream border-2 border-ink rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-[width] duration-700 ${
                          isFull ? 'bg-loss' : cat.color
                        } ${percent > 0 && percent < 100 ? 'border-r-2 border-ink' : ''}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Piggy bank callout */}
            <div className="mt-6 flex items-center gap-3 bg-pig/35 border-2 border-dashed border-ink/40 rounded-2xl p-3">
              <Coin className="w-10 shrink-0 motion-safe:animate-float" />
              <div>
                <p className="text-[13px] text-ink/70">Still in the piggy bank</p>
                <p className="font-display text-[20px] font-semibold leading-tight">{formatBaht(leftToSpend)}</p>
              </div>
            </div>

            <Link
              to="/budget"
              className="mt-auto pt-5 text-[14px] font-semibold text-ring hover:text-tang-orange transition-colors"
            >
              View all budgets →
            </Link>
          </section>
        </div>

        {/* --- Recent Activity --- */}
        <section
          className={`p-5 sm:p-6 mt-6 ${cardClass} motion-safe:animate-card-entrance`}
          style={entrance(7)}
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="font-display text-[20px] font-semibold">Recent Activity</h2>
              <p className="text-[14px] text-ink/55">Your latest trades and expenses</p>
            </div>
            <Link
              to="/trading-log"
              className="text-[14px] font-semibold text-ring hover:text-tang-orange transition-colors"
            >
              View all →
            </Link>
          </div>
          <ul className="flex flex-col divide-y-2 divide-dashed divide-ink/10">
            {recentActivity.map((item) => {
              const isTrade = item.type === 'trade';
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center gap-3 py-3 px-2 -mx-2 rounded-2xl transition-colors hover:bg-cream"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`shrink-0 grid place-items-center w-11 h-11 rounded-full border-2 border-ink
                                  ${isTrade ? 'bg-sky' : 'bg-pig'}`}
                    >
                      {isTrade ? <TrendIcon className="w-5 h-5" /> : <WalletIcon className="w-5 h-5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{item.label}</p>
                      <p className="text-[12px] text-ink/55">
                        {isTrade ? 'Trade' : 'Expense'} · {item.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 font-display text-[16px] font-semibold ${
                      item.amount >= 0 ? 'text-gain' : 'text-loss'
                    }`}
                  >
                    {formatBaht(item.amount, true)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

// --- Reusable small component for a summary card ---
function SummaryCard({
  label,
  value,
  icon,
  valueColor = 'text-ink',
  iconBg = 'bg-white',
  highlight = false,
  hint,
  progress,
  progressColor = 'bg-tang-yellow',
  style,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  valueColor?: string;
  iconBg?: string;
  highlight?: boolean;
  hint?: string;
  progress?: number;
  progressColor?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`relative overflow-hidden p-5 border-[3px] border-ink rounded-3xl shadow-[5px_5px_0_0_var(--color-ink)]
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_8px_0_0_var(--color-ink)]
                  motion-safe:animate-card-entrance
                  ${highlight ? 'bg-linear-to-br from-tang-yellow to-tang-orange' : 'bg-white'}`}
    >
      {highlight && <Coin className="absolute -right-4 -bottom-4 w-20 opacity-40 rotate-12" />}
      <div className="relative flex items-center justify-between mb-3">
        <p className={`text-[13px] font-semibold ${highlight ? 'text-ink-deep' : 'text-ink/60'}`}>{label}</p>
        <span className={`grid place-items-center w-10 h-10 rounded-full border-2 border-ink ${iconBg}`}>
          {icon}
        </span>
      </div>
      <p className={`relative font-display text-[28px] leading-none font-semibold ${highlight ? 'text-ink-deep' : valueColor}`}>
        {value}
      </p>
      {hint && (
        <p className={`relative mt-2 text-[12px] ${highlight ? 'text-ink-deep/75' : 'text-ink/55'}`}>{hint}</p>
      )}
      {progress !== undefined && (
        <div className="relative mt-3 w-full h-3 bg-cream border-2 border-ink rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
      )}
    </div>
  );
}

// --- Icons (inline SVG, drawn with the current text color) ---
function IconBase({ className = 'w-5 h-5', children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 7a2 2 0 0 1 2-2h11v4" />
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M16 13.5h2" />
    </IconBase>
  );
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </IconBase>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </IconBase>
  );
}

function PieIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M12 3a9 9 0 1 0 9 9h-9z" />
      <path d="M15 3.5A9 9 0 0 1 20.5 9H15z" />
    </IconBase>
  );
}

export default Dashboard;
