interface Props {
  count: number
  total: number
}

export function ResultsCount({ count, total }: Props) {
  const isFiltered = count !== total
  return (
    <p className="text-sm text-muted-foreground">
      {isFiltered ? (
        <>
          Showing <span className="font-medium text-foreground">{count.toLocaleString()}</span> of{' '}
          <span className="font-medium text-foreground">{total.toLocaleString()}</span> posts
        </>
      ) : (
        <>
          <span className="font-medium text-foreground">{total.toLocaleString()}</span> posts total
        </>
      )}
    </p>
  )
}
