type ErrorMessageProps = {
  error?: string | null
}

/** エラーメッセージ表示部 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null
  return (
    <div className='error-message'>
      ⚠️ {error}
    </div>
  )
}
