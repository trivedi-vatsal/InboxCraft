import { RiCheckLine, RiFileCopyLine } from '@remixicon/react'
import { Button } from './Button'

interface CopyButtonProps {
  onCopy: () => void
  state: 'idle' | 'copied'
}

export function CopyButton({ onCopy, state }: CopyButtonProps) {
  return (
    <Button variant="secondary" size="sm" onClick={onCopy}>
      {state === 'copied' ? (
        <>
          <RiCheckLine className="mr-1.5 size-4 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <RiFileCopyLine className="mr-1.5 size-4" />
          Copy to Clipboard
        </>
      )}
    </Button>
  )
}
