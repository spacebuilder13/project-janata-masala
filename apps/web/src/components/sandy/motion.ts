import type { Variants, Transition } from 'framer-motion'

export const ease = {
  calm: [0.22, 0.61, 0.36, 1] as const,
  arrive: [0.16, 1, 0.3, 1] as const,
}

export const dur = {
  calm: 0.42,
  breath: 0.9,
  cinematic: 1.4,
}

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: dur.calm, ease: ease.arrive } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.calm, ease: ease.calm } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: dur.calm, ease: ease.arrive } },
}

export const stagger = (gap = 0.08): Transition => ({
  staggerChildren: gap,
  delayChildren: 0.04,
})
