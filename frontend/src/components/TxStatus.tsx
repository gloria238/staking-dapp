type Props = {
  state: string
  hash?: `0x${string}`
}

export const TxStatus = ({ state, hash }: Props) => {
  if (!hash) return null

  return (
    <div className="mt-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400">Status:</span>
        <span
          className={`font-semibold ${
            state === 'success'
              ? 'text-green-400'
              : state === 'error'
              ? 'text-red-400'
              : 'text-cyan-400'
          }`}
        >
          {state}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1 break-all">
        Tx: {hash}
      </p>
    </div>
  )
}