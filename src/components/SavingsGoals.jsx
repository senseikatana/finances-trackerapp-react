export default function SavingsGoals({ data, setData }) {
  const update = (id, field, value) => setData(d => ({
    ...d, savingsGoals: d.savingsGoals.map(g => g.id === id ? { ...g, [field]: value } : g)
  }));
  const addGoal = () => {
    const newId = Math.max(...data.savingsGoals.map(g => g.id), 0) + 1;
    setData(d => ({ ...d, savingsGoals: [...d.savingsGoals, { id: newId, name: '', target: 0, saved: 0 }] }));
  };
  const remove = (id) => setData(d => ({ ...d, savingsGoals: d.savingsGoals.filter(g => g.id !== id) }));
  const totalTarget = data.savingsGoals.reduce((s, g) => s + Number(g.target), 0);
  const totalSaved = data.savingsGoals.reduce((s, g) => s + Number(g.saved), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Metas de Ahorro</span>
          <button className="btn btn-primary" onClick={addGoal}>+ Nueva Meta</button>
        </div>
        {data.savingsGoals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎯</div>
            <div className="empty-state-text">Sin metas definidas</div>
          </div>
        ) : (
          <div className="stats-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))'}}>
            {data.savingsGoals.map(g => {
              const pct = g.target > 0 ? (g.saved / g.target) * 100 : 0;
              return (
                <div key={g.id} className="goal-card">
                  <div className="goal-header">
                    <input type="text" value={g.name} onChange={e => update(g.id, 'name', e.target.value)}
                           style={{fontWeight:'600',fontSize:'13px',border:'none',background:'transparent',padding:'0',width:'60%'}}
                           placeholder="Nombre de la meta" />
                    <button className="btn btn-ghost btn-sm" onClick={() => remove(g.id)}>✕</button>
                  </div>
                  <div className="form-row" style={{gap:'8px',margin:'8px 0'}}>
                    <div className="form-group">
                      <label>Objetivo</label>
                      <input type="number" step="0.01" min="0" value={g.target}
                             onChange={e => update(g.id, 'target', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Ahorrado</label>
                      <input type="number" step="0.01" min="0" value={g.saved}
                             onChange={e => update(g.id, 'saved', e.target.value)} />
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${pct >= 75 ? 'progress-green' : pct >= 40 ? 'progress-orange' : 'progress-red'}`}
                         style={{width:`${Math.min(100, pct)}%`}} />
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'var(--text-light)',marginTop:'4px'}}>
                    <span>Progreso: {pct.toFixed(0)}%</span>
                    <span>Restan: {Math.max(0, g.target - g.saved).toFixed(2)}€</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="card" style={{background:'var(--green-light)',marginTop:'10px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:'700',fontSize:'15px'}}>
            <span>Total Ahorrado</span>
            <span>{totalSaved.toFixed(2)}€ / {totalTarget.toFixed(2)}€ ({totalTarget > 0 ? ((totalSaved/totalTarget)*100).toFixed(0) : 0}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
