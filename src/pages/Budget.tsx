import { useState } from 'react';
import type { FormEvent } from 'react';
import { Coin } from '../components/Doodles';

interface BudgetCategory {
  id: number;
  name: string;
  limit: number;
  spent: number;
  color: string;
}

const initialBudgets: BudgetCategory[] = [
  { id: 1, name: 'Food', limit: 5000, spent: 3200, color: 'bg-tang-yellow' },
  { id: 2, name: 'Transport', limit: 2000, spent: 1400, color: 'bg-sky' },
  { id: 3, name: 'Investing', limit: 4000, spent: 4000, color: 'bg-pig' },
];

const cardClass =
  'bg-white border-[3px] border-ink rounded-3xl shadow-[6px_6px_0_0_var(--color-ink)]';

function formatBaht(amount: number) {
  return `฿${Math.abs(amount).toLocaleString()}`;
}

function Budget() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets);

  const [form, setForm] = useState({ name: '', limit: '' });

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLeft = totalLimit - totalSpent;

  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.limit) return;

    const newBudget: BudgetCategory = {
      id: Date.now(),
      name: form.name,
      limit: Number(form.limit),
      spent: 0,
      color: 'bg-cream',
    };

    setBudgets([...budgets, newBudget]);
    setForm({ name: '', limit: '' });
  };

  
  const handleLimitChange = (id: number, newLimit: number) => {
    setBudgets(
      budgets.map((b) => (b.id === id ? { ...b, limit: newLimit } : b)),
    );
  };

  const handleRemove = (id: number) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-cream text-ink px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <span className="inline-block -rotate-2 bg-sky border-2 border-ink rounded-full px-3 py-0.5 text-[12px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]">
            Budget
          </span>
          <h1 className="mt-1 font-display text-[34px] sm:text-[40px] leading-tight font-semibold">
            งบประมาณ
          </h1>
          <p className="text-[15px] text-ink/60">ตั้งวงเงินแต่ละหมวด แล้วดูว่าใช้ไปเท่าไหร่แล้ว</p>
        </header>

        {/* --- Summary strip --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Total Budget</p>
            <p className="font-display text-[22px] font-semibold">{formatBaht(totalLimit)}</p>
          </div>
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Spent</p>
            <p className="font-display text-[22px] font-semibold text-loss">{formatBaht(totalSpent)}</p>
          </div>
          <div className={`${cardClass} p-5 flex items-center gap-3`}>
            <Coin className="w-9 shrink-0" />
            <div>
              <p className="text-[13px] font-semibold text-ink/60 mb-1">Left to spend</p>
              <p className={`font-display text-[22px] font-semibold ${totalLeft >= 0 ? 'text-gain' : 'text-loss'}`}>
                {formatBaht(totalLeft)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Add category form --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-1 h-fit`}>
            <h2 className="font-display text-[18px] font-semibold mb-4">เพิ่มหมวดงบ</h2>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  ชื่อหมวด
                </label>
                <input
                  type="text"
                  placeholder="เช่น Entertainment"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  วงเงิน (บาท/เดือน)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 1500"
                  value={form.limit}
                  onChange={(e) => setForm({ ...form, limit: e.target.value })}
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
                + เพิ่มหมวด
              </button>
            </form>
          </section>

          {/* --- Category list with editable limit --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-2`}>
            <h2 className="font-display text-[18px] font-semibold mb-4">หมวดงบทั้งหมด</h2>

            {budgets.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-ink/50">
                <Coin className="w-12" />
                <p>ยังไม่มีหมวดงบเลย ลองเพิ่มดูสิ</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {budgets.map((b) => {
                  const percent = Math.min(Math.round((b.spent / b.limit) * 100), 100);
                  const isFull = percent >= 100;
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between items-center text-[14px] mb-1.5">
                        <span className="flex items-center gap-2 font-semibold">
                          <span className={`w-3 h-3 rounded-full border-2 border-ink ${b.color}`} />
                          {b.name}
                          {isFull && (
                            <span className="rotate-3 bg-loss text-white border-2 border-ink rounded-full px-2 text-[11px] font-bold">
                              FULL
                            </span>
                          )}
                        </span>
                        <button
                          onClick={() => handleRemove(b.id)}
                          aria-label={`ลบหมวด ${b.name}`}
                          className="text-ink/40 hover:text-loss transition-colors text-[13px]"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="w-full h-4 bg-cream border-2 border-ink rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-[width] duration-700 ${isFull ? 'bg-loss' : b.color}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[13px] text-ink/60">
                        <span>{formatBaht(b.spent)} ใช้ไปแล้ว</span>
                        <label className="flex items-center gap-2">
                          วงเงิน
                          <input
                            type="number"
                            value={b.limit}
                            onChange={(e) => handleLimitChange(b.id, Number(e.target.value))}
                            className="w-24 bg-cream border-2 border-ink rounded-lg px-2 py-1 text-[13px]"
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Budget;