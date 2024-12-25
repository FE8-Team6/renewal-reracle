import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h2>
      <pre className="text-sm text-error-40 mb-4 max-w-[100%] whitespace-pre-wrap break-words text-center">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple/80"
        type="button"
      >
        다시 시도
      </button>
    </div>
  );
};

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
