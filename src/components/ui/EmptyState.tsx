interface EmptyStateProps {
  message: string
  action?: React.ReactNode
}

export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Belum tersedia</p>
      <p className="mb-4 max-w-xl text-base leading-7 font-light text-slate-600">{message}</p>
      {action}
    </div>
  )
}
