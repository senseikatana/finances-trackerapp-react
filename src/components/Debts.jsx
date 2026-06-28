export default function Debts({ data, setData }) {
  const update = (id, field, value) => setData(d => ({
    ...d, debts: d.debts.map(g => g.id === id ? { ...g, [field]: value } : g)
  }));
  const addDebt = () => {
    const newId = Math.max(...data.debts.map(g => g.id), 0) + 1;
    setData(d => ({ ...d, debts: [...d.debts, { id: newId, creditor: '', concept: '', total: 0, paid: 0, monthlyPayment: 0, notes: '' }] }));
  };
  const remove = (id) => setData(d => ({ ...d, debts: d.debts.filter(g => g.id !== id) }));
  const totalDebt = data.debts.reduce((s, d) => s + Number(d.total), 0);
  const totalPaid = data.debts.reduce((s, d) => s + Number(d.paid), 0);
  const remaining = totalDebt - totalPaid;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Deudas</span>
          <button className="btn btn-primary" onClick={addDebt}>+ Añadir</button>
        </div>
        {data.debts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <div className="empty-state-text">Sin deudas registradas</div>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr>
                <th>Acreedor</th><th>Concepto</th><th className="text-right">Total</th><th className="text-right">Pagado</th>
                <th className="text-right">Restante</th><th className="text-right">Cuota/mes</th><th>Notas</th><th></th>
              </tr></thead>
              <tbody>
                {data.debts.map(d => {
                  const rest = Number(d.total) - Number(d.paid);
                  return (
                    <tr key={d.id}>
                      <td><input type="text" value={d.creditor} onChange={e => update(d.id, 'creditor', e.target.value)} placeholder="Acreedor" /></td>
                      <td><input type="text" value={d.concept} onChange={e => update(d.id, 'concept', e.target.value)} placeholder="Concepto" /></td>
                      <td><input type="number" step="0.01" min="0" value={d.total} onChange={e => update(d.id, 'total', e.target.value)} className="text-right" style={{width:'90px'}} /></td>
                      <td><input type="number" step="0.01" min="0" value={d.paid} onChange={e => update(d.id, 'paid', e.target.value)} className="text-right" style={{width:'90px'}} /></td>
                      <td className="text-right" style={{fontWeight: rest > 0 ? '700' : '400', color: rest > 0 ? 'var(--red)' : 'var(--green)'}}>{rest.toFixed(2)}€</td>
                      <td><input type="number" step="0.01" min="0" value={d.monthlyPayment} onChange={e => update(d.id, 'monthlyPayment', e.target.value)} className="text-right" style={{width:'80px'}} /></td>
                      <td><input type="text" value={d.notes} onChange={e => update(d.id, 'notes', e.target.value)} placeholder="Notas" style={{minWidth:'80px'}} /></td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => remove(d.id)}>✕</button></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{background:'var(--red-light)',fontWeight:'700'}}>
                  <td colSpan="2">TOTAL DEUDAS</td>
                  <td className="text-right">{totalDebt.toFixed(2)}€</td>
                  <td className="text-right">{totalPaid.toFixed(2)}€</td>
                  <td className="text-right">{remaining.toFixed(2)}€</td>
                  <td className="text-right">{data.debts.reduce((s, d) => s + Number(d.monthlyPayment), 0).toFixed(2)}€</td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {remaining > 0 && (
          <div style={{marginTop:'10px',padding:'10px',background:'var(--red-light)',borderRadius:'8px',fontSize:'13px'}}>
            <strong>Resumen:</strong> Deuda total {totalDebt.toFixed(2)}€ · Pagado {totalPaid.toFixed(2)}€ ·
            <span style={{color:'var(--red)',fontWeight:'700'}}> Pendiente {remaining.toFixed(2)}€</span>
            {totalDebt > 0 && ` · ${((totalPaid/totalDebt)*100).toFixed(0)}% liquidado`}
          </div>
        )}
      </div>
    </div>
  );
}
