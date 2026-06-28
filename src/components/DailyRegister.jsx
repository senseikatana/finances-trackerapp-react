import { useState } from 'react';

export default function DailyRegister({ data, setData }) {
  const [filter, setFilter] = useState('all');
  const entries = data.dailyRegister || [];

  const addEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const newId = Math.max(...entries.map(e => e.id), 0) + 1;
    setData(d => ({
      ...d,
      dailyRegister: [{ id: newId, date: today, category: 'Otros', concept: '', amount: 0, type: 'Variable', necessary: true, notes: '' }, ...d.dailyRegister]
    }));
  };

  const update = (id, field, value) => setData(d => ({
    ...d, dailyRegister: d.dailyRegister.map(e => e.id === id ? { ...e, [field]: value } : e)
  }));

  const remove = (id) => {
    if (confirm('¿Eliminar este gasto?')) {
      setData(d => ({ ...d, dailyRegister: d.dailyRegister.filter(e => e.id !== id) }));
    }
  };

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
  const total = filtered.reduce((s, e) => s + Number(e.amount), 0);
  const totalFijo = entries.filter(e => e.type === 'Fijo').reduce((s, e) => s + Number(e.amount), 0);
  const totalVar = entries.filter(e => e.type === 'Variable').reduce((s, e) => s + Number(e.amount), 0);
  const totalExtra = entries.filter(e => e.type === 'Extraordinario').reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Registro Diario</span>
          <button className="btn btn-primary" onClick={addEntry}>+ Nuevo Gasto</button>
        </div>
        <p style={{fontSize:'12px',color:'var(--text-light)',marginBottom:'12px'}}>
          Anota cada gasto nada más producirlo. Clasifícalo como Fijo, Variable o Extraordinario.
        </p>

        <div style={{display:'flex',gap:'8px',marginBottom:'12px',flexWrap:'wrap'}}>
          {[
            { key: 'all', label: `Todos (${entries.length})` },
            { key: 'Fijo', label: `Fijos (${entries.filter(e => e.type === 'Fijo').length})` },
            { key: 'Variable', label: `Variables (${entries.filter(e => e.type === 'Variable').length})` },
            { key: 'Extraordinario', label: `Extraordinarios (${entries.filter(e => e.type === 'Extraordinario').length})` },
          ].map(f => (
            <button key={f.key}
              className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th>Tipo</th><th style={{textAlign:'center'}}>Necesario</th><th>Notas</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td><input type="date" value={e.date} onChange={e2 => update(e.id, 'date', e2.target.value)} style={{minWidth:'90px'}} /></td>
                  <td>
                    <select value={e.category} onChange={e2 => update(e.id, 'category', e2.target.value)}>
                      {(data.expenseCategories || []).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={e.concept} onChange={e2 => update(e.id, 'concept', e2.target.value)} placeholder="¿Qué compraste?" style={{minWidth:'100px'}} /></td>
                  <td><input type="number" step="0.01" min="0" value={e.amount} onChange={e2 => update(e.id, 'amount', e2.target.value)} className="text-right" style={{width:'80px'}} /></td>
                  <td>
                    <select value={e.type} onChange={e2 => update(e.id, 'type', e2.target.value)}>
                      <option value="Variable">Variable</option>
                      <option value="Fijo">Fijo</option>
                      <option value="Extraordinario">Extraordinario</option>
                    </select>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <input type="checkbox" checked={e.necessary} onChange={e2 => update(e.id, 'necessary', e2.target.checked)}
                           style={{width:'auto',transform:'scale(1.2)'}} />
                  </td>
                  <td><input type="text" value={e.notes} onChange={e2 => update(e.id, 'notes', e2.target.value)} placeholder="Notas" style={{minWidth:'60px'}} /></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => remove(e.id)}>✕</button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" style={{textAlign:'center',padding:'20px',color:'var(--text-light)'}}>
                  No hay gastos registrados. ¡Añade el primero!
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Resumen del Registro</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'10px'}}>
          <div style={{padding:'12px',background:'var(--blue-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Fijos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--blue)'}}>{totalFijo.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--orange-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Variables</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--orange)'}}>{totalVar.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--red-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Extraordinarios</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--red)'}}>{totalExtra.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--green-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Total</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--green)'}}>{(totalFijo+totalVar+totalExtra).toFixed(2)}€</div>
          </div>
        </div>
      </div>
    </div>
  );
}
