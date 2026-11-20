import { useState } from 'react';
import type { FormEvent } from 'react';
import { Coin } from '../components/Doodles';

type Category = 'Food' | 'Transport' | 'Investing' | 'Other';

interface Expense {
  id: number;
  label: string;
  category: Category;
  amount: number;
  date: string;
}

const initialExpenses: Expense[] = [
  { id: 1, label: 'Lunch', category: 'Food', amount: 180, date: '28 Sep' },
  { id: 2, label: 'BTS fare', category: 'Transport', amount: 90, date: '26 Sep' },
  { id: 3, label: 'Index fund top-up', category: 'Investing', amount: 2000, date: '24 Sep' },
  { id: 4, label: 'Coffee', category: 'Food', amount: 65, date: '22 Sep' },
];

const categoryStyles: Record<Category, string> = {
  Food: 'bg-tang-yellow',
  Transport: 'bg-sky',
  Investing: 'bg-pig',
  Other: 'bg-cream',
};

const cardClass =
  'bg-white border-[3px] border-ink rounded-3xl shadow-[6px_6px_0_0_var(--color-ink)]';

function formatBaht(amount: number) {
  return `฿${Math.abs(amount).toLocaleString()}`;
}

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const [form, setForm] = useState({
    label: '',
    category: 'Food' as Category,
    amount: '',
    date: '',
  });

  // ตัวกรอง: 'All' หรือชื่อหมวดหมู่ที่เลือก
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const visibleExpenses =
    filter === 'All' ? expenses : expenses.filter((e) => e.category === filter);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  // สร้างสรุปยอดรวมต่อหมวด ด้วย reduce ให้ได้ object เช่น { Food: 245, Transport: 90 }
  const totalsByCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.label || !form.amount || !form.date) return;

    const newExpense: Expense = {
      id: Date.now(),
      label: form.label,
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
    };

    setExpenses([newExpense, ...expenses]);
    setForm({ label: '', category: 'Food', amount: '', date: '' });
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-cream text-ink px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <span className="inline-block -rotate-2 bg-pig border-2 border-ink rounded-full px-3 py-0.5 text-[12px] font-semibold shadow-[2px_2px_0_0_var(--color-ink)]">
            Expense Log
          </span>
          <h1 className="mt-1 font-display text-[34px] sm:text-[40px] leading-tight font-semibold">
            ค่าใช้จ่าย
          </h1>
          <p className="text-[15px] text-ink/60">บันทึกทุกรายจ่าย แยกตามหมวดหมู่</p>
        </header>

        {/* --- Summary strip --- */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className={`${cardClass} p-5`}>
            <p className="text-[13px] font-semibold text-ink/60 mb-1">Total Spent</p>
            <p className="font-display text-[22px] font-semibold">{formatBaht(totalSpent)}</p>
          </div>
          {(['Food', 'Transport', 'Investing'] as Category[]).map((cat) => (
            <div key={cat} className={`${cardClass} p-5`}>
              <p className="flex items-center gap-2 text-[13px] font-semibold text-ink/60 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full border-2 border-ink ${categoryStyles[cat]}`} />
                {cat}
              </p>
              <p className="font-display text-[20px] font-semibold">
                {formatBaht(totalsByCategory[cat] ?? 0)}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Add expense form --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-1 h-fit`}>
            <h2 className="font-display text-[18px] font-semibold mb-4">เพิ่มรายจ่าย</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  รายการ
                </label>
                <input
                  type="text"
                  placeholder="เช่น ค่าข้าวเที่ยง"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  หมวดหมู่
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as Category })
                  }
                  className="w-full bg-cream border-2 border-ink rounded-xl px-3 py-2 text-[14px]"
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Investing">Investing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink/70 mb-1">
                  จำนวนเงิน (บาท)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 150"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
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
                + บันทึกรายจ่าย
              </button>
            </form>
          </section>

          {/* --- Expense list --- */}
          <section className={`${cardClass} p-5 sm:p-6 lg:col-span-2`}>
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <h2 className="font-display text-[18px] font-semibold">รายการค่าใช้จ่าย</h2>

              {/* --- Filter chips --- */}
              <div className="flex flex-wrap gap-2">
                {(['All', 'Food', 'Transport', 'Investing', 'Other'] as (Category | 'All')[]).map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => setFilter(option)}
                      className={`text-[12px] font-semibold border-2 border-ink rounded-full px-3 py-1 transition-colors ${
                        filter === option ? 'bg-ink text-cream' : 'bg-white hover:bg-cream'
                      }`}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>

            {visibleExpenses.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-ink/50">
                <Coin className="w-12" />
                <p>ไม่มีรายการในหมวดนี้</p>
              </div>
            ) : (
              <ul className="flex flex-col divide-y-2 divide-dashed divide-ink/10">
                {visibleExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="flex justify-between items-center gap-3 py-3 px-2 -mx-2 rounded-2xl transition-colors hover:bg-cream"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 shrink-0 rounded-full border-2 border-ink ${categoryStyles[expense.category]}`}
                      />
                      <div>
                        <p className="font-semibold">{expense.label}</p>
                        <p className="text-[12px] text-ink/55">
                          {expense.category} · {expense.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[16px] font-semibold text-loss">
                        -{formatBaht(expense.amount)}
                      </span>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        aria-label={`ลบ ${expense.label}`}
                        className="text-ink/40 hover:text-loss transition-colors"
                      >
                        ✕
                      </button>
                    </div>
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

export default Expenses;