type Props = {
  children: string
}

export default function RoadmapUnlockHeadline({ children }: Props) {
  return <h2 className="rm-unlock-headline">{children}</h2>
}
