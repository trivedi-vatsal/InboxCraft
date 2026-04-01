import { useCallback } from 'react'

export type TemplateCategory =
  | 'Collaboration'
  | 'Finance'
  | 'CRM'
  | 'Dev Tools'
  | 'Cloud'
  | 'Productivity'

export interface TemplateIndex {
  id: string
  name: string
  category: TemplateCategory
  description: string
  folder: string
  emoji: string
  updated: string
  senderCount: number
}

export interface TemplateDetail extends TemplateIndex {
  senders: string[]
}

// Load all YAML template files at build time
const rawModules = import.meta.glob('/templates/*.yaml', { eager: true }) as Record<
  string,
  { default: Omit<TemplateDetail, 'senderCount'> }
>

// Build detail map and derive senderCount from senders array
const DETAIL_MAP: Record<string, TemplateDetail> = {}
for (const [, mod] of Object.entries(rawModules)) {
  const raw = mod.default
  const detail: TemplateDetail = { ...raw, senderCount: raw.senders.length }
  DETAIL_MAP[raw.id] = detail
}

// Index cards sorted: preserve order from YAML filenames (alphabetical), keep stable
const CARDS: TemplateIndex[] = Object.values(DETAIL_MAP).map(
  ({ senders: _senders, ...index }) => index,
)

export function useTemplates() {
  const fetchCard = useCallback(async (id: string): Promise<TemplateDetail> => {
    const detail = DETAIL_MAP[id]
    if (!detail) throw new Error(`Template "${id}" not found`)
    return detail
  }, [])

  return {
    cards: CARDS,
    loading: false,
    error: false,
    retry: () => {},
    fetchCard,
  }
}
