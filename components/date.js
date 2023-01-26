import { parseISO, format } from 'date-fns'

const formats = {
  'en': 'LLLL d, yyyy',
  'zh': 'yyyy-LL-dd',
}

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, formats.zh)}</time>
}
