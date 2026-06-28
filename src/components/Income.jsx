import { INCOME_CATEGORIES } from '../data/defaultData';

export default function Income({ data, setData }) {
  const addRow = () => {
    const newId = Math.max(...data.income.map(i => i.id), 0) + 1;
    setData(d => ({ ...d, income: [...d.income, { id: newId, date: '', category: 'Otros', concept: '', amount: 0, notes: '' }] }));
  };
  const removeRow = (id) => setData(d => ({ ...d, income: d.income.filter(i => i.id !== id) }));
  const update = (id, field, value) => setData(d => ({
    ...d, income: d.income.map(i => i.id === id ? { ...i, [field]: value } : i)
  }));
  const total = data.income.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Ingresos</span>
          <button className="btn btn-primary" onClick={addRow}>+ Añadir</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th>Notas</th><th></th>
            </tr></thead>
            <tbody>
              {data.income.map(i => (
                <tr key={i.id}>
                  <td><input type="date" value={i.date} onChange={e => update(i.id, 'date', e.target.value)} style={{minWidth:'100px'}} /></td>
                  <td>
                    <select value={i.category} onChange={e => update(i.id, 'category', e.target.value)}>
                      {INCOME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={i.concept} onChange={e => update(i.id, 'concept', e.target.value)} placeholder="Concepto" /></td>
                  <td><input type="number" step="0.01" min="0" value={i.amount} onChange={e => update(i.id, 'amount', e.target.value)} className="text-right" style={{width:'100px'}} /></td>
                  <td><input type="text" value={i.notes} onChange={e => update(i.id, 'notes', e.target.value)} placeholder="Notas" /></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => removeRow(i.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'var(--green-light)',fontWeight:'700'}}>
                <td colSpan="3">TOTAL INGRESOS</td>
                <td className="text-right">{total.toFixed(2)}€</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
