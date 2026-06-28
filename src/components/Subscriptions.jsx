export default function Subscriptions({ data, setData }) {
  const addSub = () => {
    const newId = Math.max(...data.subscriptions.map(s => s.id), 0) + 1;
    setData(d => ({
      ...d,
      subscriptions: [...d.subscriptions, {
        id: newId, name: '', category: 'Otros', provider: '', amount: 0,
        billingCycle: 'monthly', nextPayment: '', active: true, notes: '',
      }]
    }));
  };
  const update = (id, field, value) => setData(d => ({
    ...d, subscriptions: d.subscriptions.map(s => s.id === id ? { ...s, [field]: value } : s)
  }));
  const remove = (id) => setData(d => ({
    ...d, subscriptions: d.subscriptions.filter(s => s.id !== id)
  }));

  const sorted = [...data.subscriptions].sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Suscripciones</span>
          <button className="btn btn-primary" onClick={addSub}>+ Nueva</button>
        </div>
        <p style={{fontSize:'12px',color:'var(--text-light)',marginBottom:'12px'}}>
          Gestiona todas tus suscripciones. Soporta pagos <strong>mensuales</strong> y <strong>anuales</strong> — el coste mensual equivalente se calcula automáticamente.
        </p>

        <div className="subscription-grid">
          {sorted.map(s => {
            const monthly = s.billingCycle === 'annual' ? s.amount / 12 : s.amount;
            return (
              <div key={s.id} className="sub-card" style={{opacity: s.active ? 1 : 0.5}}>
                {s.active && <span className="sub-badge badge badge-green">Activa</span>}
                {!s.active && <span className="sub-badge badge badge-red">Inactiva</span>}

                <div className="sub-header">
                  <div>
                    <div className="sub-name">{s.name || 'Nueva suscripción'}</div>
                    <div className="sub-category">{s.category}{s.provider ? ` · ${s.provider}` : ''}</div>
                  </div>
                </div>

                <div className="sub-price">
                  {s.amount.toFixed(2)}€
                  <span style={{fontSize:'12px',color:'var(--text-light)',fontWeight:'400'}}>
                    /{s.billingCycle === 'annual' ? 'año' : 'mes'}
                  </span>
                </div>

                <div className="sub-detail">
                  Coste mensual: <strong>{monthly.toFixed(2)}€</strong>
                </div>
                <div className="sub-detail">
                  Próximo pago: {s.nextPayment || '—'}
                </div>
                {s.notes && <div className="sub-detail">{s.notes}</div>}

                <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'10px 0'}} />

                <div className="form-row" style={{gap:'6px'}}>
                  <div className="form-group" style={{flex:'2'}}>
                    <label>Nombre</label>
                    <input type="text" value={s.name} onChange={e => update(s.id, 'name', e.target.value)} placeholder="Nombre" />
                  </div>
                  <div className="form-group" style={{flex:'1'}}>
                    <label>Categoría</label>
                    <input type="text" value={s.category} onChange={e => update(s.id, 'category', e.target.value)} placeholder="Categoría" />
                  </div>
                </div>
                <div className="form-row" style={{gap:'6px'}}>
                  <div className="form-group">
                    <label>Proveedor</label>
                    <input type="text" value={s.provider} onChange={e => update(s.id, 'provider', e.target.value)} placeholder="Proveedor" />
                  </div>
                  <div className="form-group">
                    <label>Importe</label>
                    <input type="number" step="0.01" min="0" value={s.amount} onChange={e => update(s.id, 'amount', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Ciclo</label>
                    <select value={s.billingCycle} onChange={e => update(s.id, 'billingCycle', e.target.value)}>
                      <option value="monthly">Mensual</option>
                      <option value="annual">Anual</option>
                    </select>
                  </div>
                </div>
                <div className="form-row" style={{gap:'6px'}}>
                  <div className="form-group" style={{flex:'1'}}>
                    <label>Próximo pago</label>
                    <input type="date" value={s.nextPayment} onChange={e => update(s.id, 'nextPayment', e.target.value)} />
                  </div>
                  <div className="form-group" style={{flex:'1'}}>
                    <label>Activa</label>
                    <input type="checkbox" checked={s.active} onChange={e => update(s.id, 'active', e.target.checked)}
                           style={{width:'auto',marginTop:'6px',transform:'scale(1.3)',display:'block'}} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notas</label>
                  <input type="text" value={s.notes} onChange={e => update(s.id, 'notes', e.target.value)} placeholder="Notas" />
                </div>

                <div className="sub-actions">
                  <button className="btn btn-red btn-sm" onClick={() => remove(s.id)}>Eliminar</button>
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div className="empty-state-text">No hay suscripciones todavía</div>
              <button className="btn btn-primary" onClick={addSub} style={{marginTop:'10px'}}>+ Añadir primera</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
