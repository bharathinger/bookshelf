const formatDate = date =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: '2-digit' }).format(
    date,
  )

export { formatDate }
