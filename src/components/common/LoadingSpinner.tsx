type LoadingSpinnerProps = {
  loading: boolean
}

/** ローディング表示 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = props => {
  return(
    props.loading && (
      <div className='loading-message'>
        📡 為替レートを取得中...
      </div>
    )
  )
}
