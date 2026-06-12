type Props = {
  goals: string[]
  showTbd?: boolean
}

export default function RoadmapInputGoals({ goals, showTbd }: Props) {
  return (
    <section>
      <p className="rm-section-label">Input goals for this phase</p>
      <ul className="rm-goals-list">
        {goals.map((goal) => (
          <li key={goal} className="rm-goal-item">
            <span>{goal}</span>
            {showTbd && <span className="rm-tbd">Target TBD</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
