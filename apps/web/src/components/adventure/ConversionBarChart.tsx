import { conversionChart } from '@/data/commerce-101-brief'

export default function ConversionBarChart() {
  const maxValue = Math.max(...conversionChart.bars.map((b) => b.value))

  return (
    <div className="adv-chart surface-card">
      <p className="caption-label caption-label--spice">{conversionChart.title}</p>
      <div className="adv-chart-bars" role="img" aria-label={conversionChart.caption}>
        {conversionChart.bars.map((bar) => (
          <div key={bar.label} className="adv-chart-row">
            <span className="adv-chart-label">{bar.label}</span>
            <div className="adv-chart-track">
              <div
                className="adv-chart-fill"
                style={{
                  width: `${(bar.value / maxValue) * 100}%`,
                  background: `var(${bar.colorVar})`,
                }}
              />
            </div>
            <span className="adv-chart-value">{bar.value} sales</span>
          </div>
        ))}
      </div>
      <p className="caption-text mt-4">{conversionChart.caption}</p>
    </div>
  )
}
