import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Tutorial Site</h1>
      <Link href="/signup">
        Go to Tutorials
      </Link>
    </div>
  );
}
