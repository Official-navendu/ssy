import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-cosmic px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[8rem] leading-none text-gradient-cosmic">404</h1>
        <h2 className="mt-2 font-display text-2xl">The path you seek is hidden</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The cosmos has redirected your journey. Let's guide you home.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center justify-center rounded-full btn-gold px-6 py-3 text-sm font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
