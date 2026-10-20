import Icon from './Icon.jsx'

/** نشان کوچک برای محتوایی که به تأیید یا بازبینی نیاز دارد. */
export default function ContentBadge({ label = 'نیازمند تأیید', icon = 'AlertCircle', title }) {
  return (
    <span className="content-badge" title={title || 'این مورد باید با اطلاعات واقعی تأیید شود'}>
      <Icon name={icon} size={13} />
      {label}
    </span>
  )
}
