import { FIXED_CATEGORIES } from '../data/defaultData';

export default function FixedExpenses({ data, setData }) {
  const update = (id, field, value) => setData(d => ({
    ...d, fixedExpenses: d.fixedExpenses.map(e => e.id === id ? { ...e, [field]: value } : e)
  }));
  const addRow = () => {
    const newId = Math.max(...data.fixedExpenses.map(e => e.id), 0) + 1;
    setData(d => ({ ...d, fixedExpenses: [...d.fixedExpenses, { id: newId, category: 'Otros', concept: '', provider: '', amount: 0, dueDate: 1, paid: false }] }));
  };
  const removeRow = (id) => setData(d => ({ ...d, fixedExpenses: d.fixedExpenses.filter(e => e.id !== id) }));
  const total = data.fixedExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const paid = data.fixedExpenses.filter(e => e.paid).reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Gastos Fijos Mensuales</span>
          <button className="btn btn-primary" onClick={addRow}>+ Añadir</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Categoría</th><th>Concepto</th><th>Proveedor</th><th className="text-right">Importe</th><th>Día Pago</th><th style={{textAlign:'center'}}>Pagado</th><th></th>
            </tr></thead>
            <tbody>
              {data.fixedExpenses.map(e => (
                <tr key={e.id} style={e.paid ? {opacity:0.6} : {}}>
                  <td>
                    <select value={e.category} onChange={e2 => update(e.id, 'category', e2.target.value)}>
                      {FIXED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={e.concept} onChange={e2 => update(e.id, 'concept', e2.target.value)} placeholder="Concepto" /></td>
                  <td><input type="text" value={e.provider} onChange={e2 => update(e.id, 'provider', e2.target.value)} placeholder="Proveedor" /></td>
                  <td><input type="number" step="0.01" min="0" value={e.amount} onChange={e2 => update(e.id, 'amount', e2.target.value)} className="text-right" style={{width:'90px'}} /></td>
                  <td><input type="number" min="1" max="31" value={e.dueDate} onChange={e2 => update(e.id, 'dueDate', e2.target.value)} style={{width:'60px'}} /></td>
                  <td style={{textAlign:'center'}}>
                    <input type="checkbox" checked={e.paid} onChange={e2 => update(e.id, 'paid', e2.target.checked)} style={{width:'auto',transform:'scale(1.2)'}} />
                  </td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => removeRow(e.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'var(--blue-light)',fontWeight:'700'}}>
                <td colSpan="3">TOTAL GASTOS FIJOS</td>
                <td className="text-right">{total.toFixed(2)}€</td>
                <td colSpan="3">Pagado: {paid.toFixed(2)}€ / {total > 0 ? ((paid/total)*100).toFixed(0) : 0}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
