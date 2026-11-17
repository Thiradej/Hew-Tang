import { useState } from 'react';
import type { FormEvent } from 'react';
import { Coin } from '../components/Doodles';

type Direction = 'Long' | 'Short';

interface Trade {
  id: number;
  symbol: string;
  direction: Direction;
  pnl: number;
  date: string;
}

const initialTrades: Trade[] = [
  { id: 1, symbol: 'XAUUSD', direction: 'Long', pnl: 1250, date: '28 Sep' },
  { id: 2, symbol: 'BTCUSD', direction: 'Short', pnl: -420, date: '27 Sep' },
  { id: 3, symbol: 'EURUSD', direction: 'Long', pnl: 310, date: '25 Sep' },
  { id: 4, symbol: 'GBPJPY', direction: 'Short', pnl: 180, date: '22 Sep' },
];

const cardClass =
    'bg-white border-[3px] border-ink rounded-3xl shadow-[6px_6px_0_0_var(--color-ink)]';

function formatBaht(amount: number, withSign = false) {
    const sign = amount < 0 ? '-' : withSign ? '+' : '';
    return `${sign}฿${Math.abs(amount).toLocaleString()}`;
}

function TradingLog() {

  const [trades, setTrades] = useState<Trade[]>(initialTrades);

  const [form, setForm] = useState({
    symbol: '',
    direction: 'Long' as Direction,
    pnl: '',
    date: '',
  });

  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winCount = trades.filter((t) => t.pnl >= 0).length;
  const winRate = trades.length ? Math.round((winCount / trades.length) * 100) : 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.pnl || !form.date) return;

    const newTrade: Trade = {
      id: Date.now(),
      symbol: form.symbol.toUpperCase(),
      direction: form.direction,
      pnl: Number(form.pnl),
      date: form.date,
    };

    setTrades([newTrade, ...trades]);

    setForm({ symbol: '', direction: 'Long', pnl: '', date: '' });
  };

  return (
    <div className="relative min-h-screen bg-cream text-ink px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <span className="inline-block -rotate-2 bg-sky border-2 border-ink rounded-full px-3 py-0.5 text-[12px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]">
            Trading Log
          </span>
          <h1 className="mt-1 font-display text-[34px] sm:text-[40px] leading-tight font-semibold">
            ประวัติการเทรด
          </h1>
          <p className="text-[15px] text-ink/60">บันทึกทุกไม้ที่เปิด/ปิด แล้วดูผลรวมได้ที่นี่</p>
        </header>

        {/* --- Summary strip --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Total P&L</p>
            <p className={`font-display text-[24px] font-semibold ${totalPnl >= 0 ? 'text-gain' : 'text-loss'}`}>
              {formatBaht(totalPnl, true)}
            </p>
          </div>
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Win Rate</p>
            <p className="font-display text-[24px] font-semibold">{winRate}%</p>
          </div>
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Total Trades</p>
            <p className="font-display text-[24px] font-semibold">{trades.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Add trade form --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-1 h-fit`}>
            <h2 className="font-display text-[18px] font-semibold mb-4">เพิ่มเทรดใหม่</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  Symbol
                </label>
                <input
                  type="text"
                  placeholder="เช่น XAUUSD"
                  value={form.symbol}
                  onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  Direction
                </label>
                <select
                  value={form.direction}
                  onChange={(e) =>
                    setForm({ ...form, direction: e.target.value as Direction })
                  }
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                >
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  P&L (บาท, ใส่ติดลบถ้าขาดทุน)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 500 หรือ -300"
                  value={form.pnl}
                  onChange={(e) => setForm({ ...form, pnl: e.target.value })}
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  วันที่
                </label>
                <input
                  type="text"
                  placeholder="เช่น 5 Oct"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-linear-to-b from-tang-yellow to-tang-orange border-[3px] border-ink rounded-2xl px-5 py-2.5
                           font-display font-semibold text-ink-deep shadow-[3px_3px_0_0_var(--color-ink)] transition-all
                           hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_var(--color-ink)]
                           active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                + บันทึกเทรด
              </button>
            </form>
          </section>

          {/* --- Trade list --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-2`}>
            <h2 className="font-display text-[18px] font-semibold mb-4">รายการเทรดทั้งหมด</h2>
            {trades.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-ink/50">
                <Coin className="w-12" />
                <p>ยังไม่มีเทรดเลย ลองเพิ่มดูสิ</p>
              </div>
            ) : (
              <ul className="flex flex-col divide-y-2 divide-dashed divide-ink/10">
                {trades.map((trade) => (
                  <li
                    key={trade.id}
                    className="flex justify-between items-center gap-3 py-3 px-2 -mx-2 rounded-2xl transition-colors hover:bg-cream"
                  >
                    <div>
                      <p className="font-semibold">
                        {trade.symbol}{' '}
                        <span
                          className={`ml-1 text-[11px] font-bold border-2 border-ink rounded-full px-2 py-0.5 ${
                            trade.direction === 'Long' ? 'bg-sky' : 'bg-pig'
                          }`}
                        >
                          {trade.direction}
                        </span>
                      </p>
                      <p className="text-[12px] text-ink/55">{trade.date}</p>
                    </div>
                    <span
                      className={`font-display text-[16px] font-semibold ${
                        trade.pnl >= 0 ? 'text-gain' : 'text-loss'
                      }`}
                    >
                      {formatBaht(trade.pnl, true)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default TradingLog;