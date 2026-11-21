import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

// Recharts draws SVG, so it needs raw hex values instead of Tailwind classes
const INK = '#0E3E66';
const GAIN = '#2F9E6A';
const LOSS = '#E8584B';
const SKY = '#93D6F0';
const PIG = '#FDB6B4';

interface SymbolStat {
  symbol: string;
  pnl: number;
}

const bySymbol: SymbolStat[] = [
  { symbol: 'XAUUSD', pnl: 1250 },
  { symbol: 'BTCUSD', pnl: -420 },
  { symbol: 'EURUSD', pnl: 310 },
  { symbol: 'GBPJPY', pnl: 180 },
];

const winLossSplit = [
  { name: 'Win', value: 3 },
  { name: 'Loss', value: 1 },
];

const winLossColors = [GAIN, LOSS];

const cardClass =
  'bg-white border-[3px] border-ink rounded-3xl shadow-[6px_6px_0_0_var(--color-ink)]';

function formatBaht(amount: number, withSign = false) {
  const sign = amount < 0 ? '-' : withSign ? '+' : '';
  return `${sign}฿${Math.abs(amount).toLocaleString()}`;
}

function TradingAnalytics() {

  const trades = [1250, -420, 310, 180];
  const wins = trades.filter((p) => p >= 0);
  const losses = trades.filter((p) => p < 0);

  const bestTrade = Math.max(...trades);
  const worstTrade = Math.min(...trades);
  const avgWin = wins.length ? wins.reduce((s, p) => s + p, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((s, p) => s + p, 0) / losses.length : 0;
  
  const grossWin = wins.reduce((s, p) => s + p, 0);
  const grossLoss = Math.abs(losses.reduce((s, p) => s + p, 0));
  const profitFactor = grossLoss === 0 ? grossWin : grossWin / grossLoss;

  return (
    <div className="relative min-h-screen bg-cream text-ink px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <span className="inline-block -rotate-2 bg-tang-yellow border-2 border-ink rounded-full px-3 py-0.5 text-[12px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]">
            Trading Analytics
          </span>
          <h1 className="mt-1 font-display text-[34px] sm:text-[40px] leading-tight font-semibold">
            วิเคราะห์การเทรด
          </h1>
          <p className="text-[15px] text-ink/60">ดูภาพรวมว่าเทรดคู่ไหนทำกำไร คู่ไหนขาดทุน</p>
        </header>

        {/* --- Stat cards --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Best Trade" value={formatBaht(bestTrade, true)} color="text-gain" />
          <StatCard label="Worst Trade" value={formatBaht(worstTrade, true)} color="text-loss" />
          <StatCard label="Avg Win" value={formatBaht(avgWin, true)} color="text-gain" />
          <StatCard
            label="Profit Factor"
            value={profitFactor.toFixed(2)}
            color={profitFactor >= 1 ? 'text-gain' : 'text-loss'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- P&L by symbol --- */}
          <section className={`lg:col-span-2 p-5 sm:p-6 ${cardClass}`}>
            <h2 className="font-display text-[18px] font-semibold mb-1">P&L แยกตามคู่เงิน</h2>
            <p className="text-[14px] text-ink/55 mb-4">คู่ไหนทำกำไร คู่ไหนขาดทุน</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bySymbol} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke={INK} strokeOpacity={0.1} strokeDasharray="4 6" vertical={false} />
                  <XAxis
                    dataKey="symbol"
                    tick={{ fill: INK, fillOpacity: 0.6, fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: INK, fillOpacity: 0.6, fontSize: 12 }}
                    tickFormatter={(v: number) => `฿${v}`}
                    tickLine={false}
                    axisLine={false}
                    width={56}
                  />
                  <Tooltip
                    cursor={{ fill: INK, fillOpacity: 0.06 }}
                    formatter={(value) => [formatBaht(Number(value), true), 'P&L']}
                  />
                  <Bar dataKey="pnl" radius={[8, 8, 8, 8]}>
                    {bySymbol.map((entry) => (
                      <Cell key={entry.symbol} fill={entry.pnl >= 0 ? GAIN : LOSS} stroke={INK} strokeWidth={2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* --- Win / Loss split --- */}
          <section className={`p-5 sm:p-6 ${cardClass}`}>
            <h2 className="font-display text-[18px] font-semibold mb-1">Win / Loss</h2>
            <p className="text-[14px] text-ink/55 mb-4">สัดส่วนไม้ที่ได้กำไรกับขาดทุน</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossSplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    stroke={INK}
                    strokeWidth={2}
                  >
                    {winLossSplit.map((entry, index) => (
                      <Cell key={entry.name} fill={winLossColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} trades`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-5 mt-2">
              <Legend color={GAIN} label={`Win (${winLossSplit[0].value})`} />
              <Legend color={LOSS} label={`Loss (${winLossSplit[1].value})`} />
            </div>
          </section>
        </div>

        {/* --- Extra callout cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className={`${cardClass} p-5 flex items-center gap-3`}>
            <span className="grid place-items-center w-10 h-10 rounded-full border-2 border-ink" style={{ background: SKY }}>
              📈
            </span>
            <div>
              <p className="text-[13px] text-ink/60">Avg Loss</p>
              <p className="font-display text-[18px] font-semibold text-loss">
                {formatBaht(avgLoss, true)}
              </p>
            </div>
          </div>
          <div className={`${cardClass} p-5 flex items-center gap-3`}>
            <span className="grid place-items-center w-10 h-10 rounded-full border-2 border-ink" style={{ background: PIG }}>
              🎯
            </span>
            <div>
              <p className="text-[13px] text-ink/60">Total Trades</p>
              <p className="font-display text-[18px] font-semibold">{trades.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`${cardClass} p-4`}>
      <p className="text-[12px] font-semibold text-ink/60 mb-1">{label}</p>
      <p className={`font-display text-[18px] sm:text-[20px] font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink/70">
      <span className="w-2.5 h-2.5 rounded-full border border-ink" style={{ background: color }} />
      {label}
    </span>
  );
}

export default TradingAnalytics;