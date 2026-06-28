import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultData, INCOME_CATEGORIES, FIXED_CATEGORIES, EXPENSE_CATEGORIES } from './data/defaultData';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import FixedExpenses from './components/FixedExpenses';
import VariableExpenses from './components/VariableExpenses';
import Subscriptions from './components/Subscriptions';
import DailyRegister from './components/DailyRegister';
import Budget from './components/Budget';
import SavingsGoals from './components/SavingsGoals';
import Debts from './components/Debts';
import Categories from './components/Categories';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'income', label: 'Ingresos', icon: '💰' },
  { id: 'fixed', label: 'Gastos Fijos', icon: '📋' },
  { id: 'variable', label: 'Gastos Variables', icon: '🛒' },
  { id: 'subscriptions', label: 'Suscripciones', icon: '🔄' },
  { id: 'daily', label: 'Registro Diario', icon: '📝' },
  { id: 'budget', label: 'Presupuesto', icon: '🎯' },
  { id: 'categories', label: 'Categorías', icon: '🏷️' },
  { id: 'savings', label: 'Metas Ahorro', icon: '🏦' },
  { id: 'debts', label: 'Deudas', icon: '💳' },
];

export default function App() {
  const [data, setData] = useLocalStorage('finanzas-app-data-v2', defaultData);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const safeData = {
    ...data,
    incomeCategories: data.incomeCategories || INCOME_CATEGORIES,
    fixedCategories: data.fixedCategories || FIXED_CATEGORIES,
    expenseCategories: data.expenseCategories || EXPENSE_CATEGORIES,
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard data={safeData} setData={setData} />;
      case 'income': return <Income data={safeData} setData={setData} />;
      case 'fixed': return <FixedExpenses data={safeData} setData={setData} />;
      case 'variable': return <VariableExpenses data={safeData} setData={setData} />;
      case 'subscriptions': return <Subscriptions data={safeData} setData={setData} />;
      case 'daily': return <DailyRegister data={safeData} setData={setData} />;
      case 'budget': return <Budget data={safeData} setData={setData} />;
      case 'categories': return <Categories data={safeData} setData={setData} />;
      case 'savings': return <SavingsGoals data={safeData} setData={setData} />;
      case 'debts': return <Debts data={safeData} setData={setData} />;
      default: return <Dashboard data={safeData} setData={setData} />;
    }
  };

  return (
    <div className="app">
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}>
        <div className="sidebar-header">
          <h1>Finanzas App</h1>
          <p>Control personal</p>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`nav-item ${activeView === n.id ? 'active' : ''}`}
              onClick={() => setActiveView(n.id)}
            >
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </nav>
        <div style={{padding:'16px',fontSize:'10px',opacity:0.4,textAlign:'center',marginTop:'auto'}}>
          v1.0 · Datos en local
        </div>
      </aside>

      <main className="main">
        {renderView()}
      </main>
    </div>
  );
}
