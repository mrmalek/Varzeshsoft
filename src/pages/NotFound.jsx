import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <div style={{ padding: '10rem 0', textAlign: 'center' }} className="container">
      <h1 style={{ fontSize: '4rem', color: 'var(--navy)' }}>404</h1>
      <p style={{ color: 'var(--gray-500)', margin: '1rem 0 2rem', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Button to="/" variant="primary" size="lg">Back Home</Button>
    </div>
  )
}
