type LoadingSpinnerProps = {
  loading?: boolean   // @memo 表示、非表示をカスタマイズしやすくしている。
  message?: string    // @memo カスタムメッセージに変更することも可能。
}

/** ローディング表示 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading = false,
  message = '📡 為替レートを取得中...'
}) => {
  return(
    loading && (
      <div className='loading-message'>
        {message}
      </div>
    )
  )
}
