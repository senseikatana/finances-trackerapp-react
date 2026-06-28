import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultData, MONTHS, CURRENT_MONTH } from '../data/defaultData';

export default function Dashboard({ data, setData }) {
  const incomeTotal = data.income.reduce((s, i) => s + Number(i.amount), 0);
  const fixedTotal = data.fixedExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const varTotal = data.variableExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const subsMonthly = data.subscriptions
    .filter(s => s.active)
    .reduce((total, s) => {
      const monthly = s.billingCycle === 'annual' ? s.amount / 12 : s.amount;
      return total + monthly;
    }, 0);
  const totalExpenses = fixedTotal + varTotal + subsMonthly;
  const netBalance = incomeTotal - totalExpenses;
  const savingsRate = incomeTotal > 0 ? (netBalance / incomeTotal) * 100 : 0;
  const totalSaved = data.savingsGoals.reduce((s, g) => s + Number(g.saved), 0);
  const totalTarget = data.savingsGoals.reduce((s, g) => s + Number(g.target), 0);
  const totalDebt = data.debts.reduce((s, d) => s + Number(d.total) - Number(d.paid), 0);

  return (
    <div>
      <h2 style={{fontSize:'20px',color:'var(--primary)',marginBottom:'16px'}}>
        Panel de Control · {data.settings.month || CURRENT_MONTH} {data.settings.year}
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Ingresos</div>
          <div className="stat-value stat-positive">{incomeTotal.toFixed(2)}€</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gastos</div>
          <div className="stat-value stat-negative">{totalExpenses.toFixed(2)}€</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Saldo Neto</div>
          <div className={`stat-value ${netBalance >= 0 ? 'stat-positive' : 'stat-negative'}`}>
            {netBalance >= 0 ? '+' : ''}{netBalance.toFixed(2)}€
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tasa Ahorro</div>
          <div className="stat-value stat-positive">{savingsRate.toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Ahorrado / Meta</div>
          <div className="stat-value stat-neutral">
            {totalSaved.toFixed(0)}€ / {totalTarget.toFixed(0)}€
          </div>
          <div className="progress-bar" style={{marginTop:'6px'}}>
            <div className={`progress-fill ${totalSaved/totalTarget > 0.5 ? 'progress-green' : 'progress-orange'}`}
                 style={{width:`${Math.min(100, (totalSaved/totalTarget)*100)}%`}} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Deuda Pendiente</div>
          <div className="stat-value stat-negative">{totalDebt.toFixed(2)}€</div>
          <div style={{fontSize:'11px',color:'var(--text-light)',marginTop:'2px'}}>
            {data.debts.filter(d => d.total > 0).length} deudas activas
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Desglose de Gastos</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          <div style={{padding:'12px',background:'var(--blue-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Fijos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--blue)'}}>{fixedTotal.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--orange-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Variables</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--orange)'}}>{varTotal.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--green-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Suscripciones/mes</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--green)'}}>{subsMonthly.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--red-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Total Gastos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--red)'}}>{totalExpenses.toFixed(2)}€</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Suscripciones Activas</span>
        </div>
        {data.subscriptions.filter(s => s.active).length === 0 ? (
          <div className="empty-state"><div className="empty-state-text">Sin suscripciones activas</div></div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr>
                <th>Servicio</th><th>Ciclo</th><th>Importe</th><th>Próximo Pago</th><th>Coste/mes</th>
              </tr></thead>
              <tbody>
                {data.subscriptions.filter(s => s.active).map(s => {
                  const monthly = s.billingCycle === 'annual' ? s.amount / 12 : s.amount;
                  return (
                    <tr key={s.id}>
                      <td><strong>{s.name}</strong><br /><span className="text-muted">{s.category}</span></td>
                      <td><span className={`badge ${s.billingCycle === 'annual' ? 'badge-blue' : 'badge-green'}`}>{s.billingCycle === 'annual' ? 'Anual' : 'Mensual'}</span></td>
                      <td className="text-right"><strong>{s.amount.toFixed(2)}€</strong></td>
                      <td style={{fontSize:'12px'}}>{s.nextPayment}</td>
                      <td className="text-right">{monthly.toFixed(2)}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Metas de Ahorro</span>
        </div>
        <div className="stats-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))'}}>
          {data.savingsGoals.map(g => {
            const pct = g.target > 0 ? (g.saved / g.target) * 100 : 0;
            return (
              <div key={g.id} className="goal-card">
                <div className="goal-header">
                  <span className="goal-name">{g.name}</span>
                  <span className="goal-amount">{g.saved.toFixed(0)}€ / {g.target.toFixed(0)}€</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${pct >= 75 ? 'progress-green' : pct >= 40 ? 'progress-orange' : 'progress-red'}`}
                       style={{width:`${Math.min(100, pct)}%`}} />
                </div>
                <div style={{fontSize:'11px',color:'var(--text-light)',marginTop:'4px',textAlign:'right'}}>
                  {pct.toFixed(0)}% completado
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
