interface EmptyStateProps {
  message: string
  action?: React.ReactNode
}

export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="mb-4 text-base text-gray-400">{message}</p>
      {action}
    </div>
  )
}
