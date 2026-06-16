import { useState } from 'react'
import { designPrinciples, operatingLayers } from '@/data/operating-stack-brief'

type ToggleMode = 'today' | 'bet'

export default function RetailStackTable() {
  const [mode, setMode] = useState<ToggleMode>('bet')

  return (
    <div className="mc-stack-table-wrap">
      <p className="caption-text mc-stack-table-intro">{designPrinciples.headline}</p>

      <div className="mc-stack-table-toggle" role="tablist" aria-label="Toggle column view">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'today'}
          className={`mc-stack-table-toggle-btn${mode === 'today' ? ' mc-stack-table-toggle-btn--active' : ''}`}
          onClick={() => setMode('today')}
        >
          Janata today
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'bet'}
          className={`mc-stack-table-toggle-btn${mode === 'bet' ? ' mc-stack-table-toggle-btn--active' : ''}`}
          onClick={() => setMode('bet')}
        >
          Best bet
        </button>
      </div>

      <div className="mc-stack-table-scroll">
        <table className="mc-stack-table">
          <thead>
            <tr>
              <th className="mc-stack-table-th mc-stack-table-th--layer">Layer</th>
              <th className="mc-stack-table-th">Inventory inward</th>
              <th className="mc-stack-table-th">Order journey</th>
              <th
                className={`mc-stack-table-th mc-stack-table-th--toggle${mode === 'bet' ? ' mc-stack-table-th--bet' : ''}`}
              >
                {mode === 'bet' ? 'Best bet' : 'Janata today'}
              </th>
            </tr>
          </thead>
          <tbody>
            {operatingLayers.map((layer) => (
              <tr key={layer.id}>
                <td className="mc-stack-table-td mc-stack-table-td--layer">
                  <span className="mc-stack-table-order">{layer.order}</span>
                  <span className="mc-stack-table-name">{layer.name}</span>
                  <span className="mc-stack-table-concept">{layer.concept}</span>
                </td>
                <td className="mc-stack-table-td">{layer.inventoryInward}</td>
                <td className="mc-stack-table-td">{layer.orderJourney}</td>
                <td
                  className={`mc-stack-table-td mc-stack-table-td--toggle${mode === 'bet' ? ' mc-stack-table-td--bet' : ''}`}
                >
                  {mode === 'bet' ? layer.bestBet : layer.janataToday}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
