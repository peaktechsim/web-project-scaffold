import { useHealth } from '@/hooks/useHealth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const AVAILABLE_COMPONENTS = [
  { name: 'Button', path: '@/components/ui/button', description: 'Actions and form submissions' },
  { name: 'Card', path: '@/components/ui/card', description: 'Content containers with header, body, and footer' },
  { name: 'Input', path: '@/components/ui/input', description: 'Text input fields' },
  { name: 'Label', path: '@/components/ui/label', description: 'Form field labels' },
  { name: 'Dialog', path: '@/components/ui/dialog', description: 'Modal dialogs and confirmations' },
  { name: 'DropdownMenu', path: '@/components/ui/dropdown-menu', description: 'Contextual menus and action lists' },
  { name: 'Toast', path: '@/components/ui/toast', description: 'Notifications and feedback messages' },
  { name: 'Badge', path: '@/components/ui/badge', description: 'Status indicators and labels' },
  { name: 'Separator', path: '@/components/ui/separator', description: 'Visual dividers between sections' },
  { name: 'Skeleton', path: '@/components/ui/skeleton', description: 'Loading placeholders' },
] as const;

function HealthStatusCard() {
  const { data: health, isLoading, isError } = useHealth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">API Health</CardTitle>
        <CardDescription>Backend connection status</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        )}
        {isError && (
          <Badge variant="destructive">Unreachable</Badge>
        )}
        {health && (
          <div className="space-y-1">
            <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-green-500" />
              {health.status}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {new Date(health.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickStatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
        <CardDescription>Your key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">—</p>
        <p className="text-xs text-muted-foreground">Add your metrics here</p>
      </CardContent>
    </Card>
  );
}

function ActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Activity</CardTitle>
        <CardDescription>Recent events</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">—</p>
        <p className="text-xs text-muted-foreground">Add your activity feed here</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-brand-200 bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-brand-900">App</h1>
          <Badge variant="secondary">Dashboard</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand-900">
            Welcome
          </h2>
          <p className="mt-1 text-brand-600">
            Your application is up and running.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <HealthStatusCard />
          <QuickStatsCard />
          <ActivityCard />
        </div>

        <Separator className="my-8" />

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              This is your scaffold dashboard — a starting point for your application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Replace these placeholder cards with your application&apos;s content. Edit{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                src/pages/DashboardPage.tsx
              </code>{' '}
              to get started.
            </p>
            <div className="flex gap-3">
              <Button size="sm">Get Started</Button>
              <Button variant="outline" size="sm">
                View Docs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Available Components Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Available UI Components</CardTitle>
            <CardDescription>
              shadcn/ui components included in this scaffold. Add more
              with{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                npx shadcn@latest add [component]
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {AVAILABLE_COMPONENTS.map((component) => (
                <div
                  key={component.name}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{component.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
