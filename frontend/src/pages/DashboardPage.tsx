import { useHealth } from '../hooks/useHealth';

export default function DashboardPage() {
  const { data: health, isLoading, isError } = useHealth();

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-brand-200 bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-brand-900">App</h1>
          <span className="text-sm text-brand-500">Dashboard</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-900">Welcome</h2>
          <p className="mt-1 text-brand-600">
            Your application is up and running.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Health Status Card */}
          <div className="rounded-lg border border-brand-200 bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-medium text-brand-500">API Health</h3>
            <div className="mt-2">
              {isLoading && (
                <span className="text-sm text-brand-400">Checking…</span>
              )}
              {isError && (
                <span className="text-sm text-red-600">Unreachable</span>
              )}
              {health && (
                <div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    {health.status}
                  </span>
                  <p className="mt-1 text-xs text-brand-400">
                    {new Date(health.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Placeholder Card */}
          <div className="rounded-lg border border-brand-200 bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-medium text-brand-500">Quick Stats</h3>
            <p className="mt-2 text-2xl font-bold text-brand-900">—</p>
            <p className="mt-1 text-xs text-brand-400">
              Add your metrics here
            </p>
          </div>

          {/* Placeholder Card */}
          <div className="rounded-lg border border-brand-200 bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-medium text-brand-500">Activity</h3>
            <p className="mt-2 text-2xl font-bold text-brand-900">—</p>
            <p className="mt-1 text-xs text-brand-400">
              Add your activity feed here
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-brand-200 bg-surface p-6 shadow-sm">
          <h3 className="text-sm font-medium text-brand-500">Getting Started</h3>
          <p className="mt-2 text-sm text-brand-600">
            This is your scaffold dashboard. Replace these placeholder cards with
            your application's content. Edit{' '}
            <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs font-mono text-brand-700">
              src/pages/DashboardPage.tsx
            </code>{' '}
            to get started.
          </p>
        </div>
      </main>
    </div>
  );
}
