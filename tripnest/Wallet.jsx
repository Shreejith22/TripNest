
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet as WalletIcon,
  Plus,
  ArrowDownLeft,
  TrendingUp,
  Plane,
  History
} from "lucide-react";

const quickAmounts = [500, 1000, 2000, 5000];

function getSavedValue(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function Wallet() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(() =>
    getSavedValue("tripnestWalletBalance", 0)
  );
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState(() =>
    getSavedValue("tripnestWalletGoal", 10000)
  );
  const [transactions, setTransactions] = useState(() =>
    getSavedValue("tripnestWalletTransactions", [])
  );

  useEffect(() => {
    localStorage.setItem("tripnestWalletBalance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("tripnestWalletGoal", JSON.stringify(goal));
  }, [goal]);

  useEffect(() => {
    localStorage.setItem(
      "tripnestWalletTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function addMoney(e) {
    e.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setBalance((previous) => previous + value);

    setTransactions((previous) => [
      {
        id: Date.now(),
        type: "Money added",
        amount: value,
        date: new Date().toLocaleDateString("en-IN")
      },
      ...previous
    ]);

    setAmount("");
  }

  const progress =
    goal > 0 ? Math.min((balance / goal) * 100, 100) : 0;

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);

  return (
    <main className="wallet-page">
      <section className="wallet-heading">
        <div>
          <p className="wallet-eyebrow">YOUR TRAVEL FUND</p>
          <h1>Your Travel Wallet</h1>
          <p>Every great journey begins with a little saving.</p>
        </div>
      </section>

      <section className="wallet-main-grid">
        <div className="wallet-balance-card">
          <div className="wallet-card-top">
            <span><WalletIcon size={21} /> TripNest Balance</span>
            <span className="wallet-card-label">VIRTUAL WALLET</span>
          </div>

          <p className="wallet-balance-label">Available savings</p>
          <h2>{money(balance)}</h2>

          <div className="wallet-card-bottom">
            <span>Save smart. Travel more.</span>
            <Plane size={28} />
          </div>
        </div>

        <div className="wallet-add-card">
          <h2><Plus size={21} /> Add money</h2>
          <p>Choose an amount or enter your own.</p>

          <div className="wallet-quick-amounts">
            {quickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                className={Number(amount) === value ? "selected" : ""}
                onClick={() => setAmount(String(value))}
              >
                ₹{value.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <form onSubmit={addMoney}>
            <label htmlFor="wallet-custom-amount">
              Enter custom amount (₹)
            </label>

            <input
              id="wallet-custom-amount"
              type="number"
              min="1"
              step="1"
              placeholder="Enter any amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button className="wallet-add-button" type="submit">
              <Plus size={18} /> Add to travel wallet
            </button>
          </form>

          <p className="wallet-demo-note">
            Demo wallet: this adds virtual savings only.
            No real payment or bank transfer takes place.
          </p>
        </div>
      </section>

      <section className="wallet-goal-card">
        <div className="wallet-goal-heading">
          <div>
            <p className="wallet-eyebrow">YOUR SAVINGS JOURNEY</p>
            <h2><TrendingUp size={21} /> Travel savings goal</h2>
          </div>
          <strong>{Math.round(progress)}%</strong>
        </div>

        <div className="wallet-progress-track">
          <div
            className="wallet-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="wallet-goal-values">
          <span>Saved: {money(balance)}</span>
          <label>
            Goal: ₹
            <input
              type="number"
              min="1"
              value={goal}
              onChange={(e) =>
                setGoal(Math.max(1, Number(e.target.value)))
              }
            />
          </label>
        </div>
      </section>

      <section className="wallet-history-card">
        <div className="wallet-history-heading">
          <h2><History size={21} /> Recent transactions</h2>
          <span>{transactions.length} transactions</span>
        </div>

        {transactions.length === 0 ? (
          <p className="wallet-empty">
            No transactions yet. Add your first savings amount!
          </p>
        ) : (
          transactions.map((transaction) => (
            <div className="wallet-transaction" key={transaction.id}>
              <div className="wallet-transaction-icon">
                <ArrowDownLeft size={20} />
              </div>

              <div className="wallet-transaction-info">
                <strong>{transaction.type}</strong>
                <span>{transaction.date}</span>
              </div>

              <strong className="wallet-transaction-amount">
                +{money(transaction.amount)}
              </strong>
            </div>
          ))
        )}
      </section>

      <button
        className="wallet-discover-button"
        onClick={() =>
          navigate("/explore", {
            state: { budget: balance }
          })
        }
      >
        <Plane size={19} /> Discover trips within my budget
      </button>
    </main>
  );
}
