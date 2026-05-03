export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-4 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      Built with Claude Code |{" "}
      <a
        href="https://github.com/colt8880/pathfinder_demo"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        View source on GitHub
      </a>
    </footer>
  );
}
