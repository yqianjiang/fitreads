import { parseISO, format } from 'date-fns'

const formats = {
  'en': 'LLLL d, yyyy HH:mm:ss',
  'zh': 'yyyy-LL-dd HH:mm:ss',
}

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, formats.zh)}</time>
}
