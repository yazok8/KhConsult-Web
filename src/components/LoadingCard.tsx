
export function LoadingCard() {
    return (
      <div className="w-full animate-pulse space-y-8">
        <div className="h-8 bg-primary/10 rounded-lg w-2/3" />
        <div className="space-y-3">
          <div className="h-4 bg-primary/10 rounded-lg" />
          <div className="h-4 bg-primary/10 rounded-lg w-5/6" />
          <div className="h-4 bg-primary/10 rounded-lg w-4/6" />
        </div>
        <div className="relative aspect-video bg-primary/10 rounded-xl" />
      </div>
    );
  }