export default function VariableExpenses({ data, setData }) {
  const update = (id, field, value) => setData(d => ({
    ...d, variableExpenses: d.variableExpenses.map(e => e.id === id ? { ...e, [field]: value } : e)
  }));
  const addRow = () => {
    const newId = Math.max(...data.variableExpenses.map(e => e.id), 0) + 1;
    setData(d => ({ ...d, variableExpenses: [...d.variableExpenses, { id: newId, date: '', category: 'Otros', concept: '', amount: 0, necessary: true, notes: '' }] }));
  };
  const removeRow = (id) => setData(d => ({ ...d, variableExpenses: d.variableExpenses.filter(e => e.id !== id) }));
  const total = data.variableExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const necessary = data.variableExpenses.filter(e => e.necessary).reduce((s, e) => s + Number(e.amount), 0);

  const categories = data.expenseCategories || [];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Gastos Variables</span>
          <button className="btn btn-primary" onClick={addRow}>+ Añadir</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th style={{textAlign:'center'}}>Necesario</th><th>Notas</th><th></th>
            </tr></thead>
            <tbody>
              {data.variableExpenses.map(e => (
                <tr key={e.id}>
                  <td><input type="date" value={e.date} onChange={e2 => update(e.id, 'date', e2.target.value)} style={{minWidth:'100px'}} /></td>
                  <td>
                    <select value={e.category} onChange={e2 => update(e.id, 'category', e2.target.value)}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={e.concept} onChange={e2 => update(e.id, 'concept', e2.target.value)} placeholder="Concepto" /></td>
                  <td><input type="number" step="0.01" min="0" value={e.amount} onChange={e2 => update(e.id, 'amount', e2.target.value)} className="text-right" style={{width:'90px'}} /></td>
                  <td style={{textAlign:'center'}}>
                    <input type="checkbox" checked={e.necessary} onChange={e2 => update(e.id, 'necessary', e2.target.checked)} style={{width:'auto',transform:'scale(1.2)'}} />
                  </td>
                  <td><input type="text" value={e.notes} onChange={e2 => update(e.id, 'notes', e2.target.value)} placeholder="Notas" style={{minWidth:'80px'}} /></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => removeRow(e.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'var(--orange-light)',fontWeight:'700'}}>
                <td colSpan="3">TOTAL GASTOS VARIABLES</td>
                <td className="text-right">{total.toFixed(2)}€</td>
                <td colSpan="3">Necesario: {necessary.toFixed(2)}€ · Capricho: {(total-necessary).toFixed(2)}€</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
