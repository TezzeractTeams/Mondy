export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-[#1C1A17] sm:text-6xl mb-6">
          Welcome to Mondy.ai
        </h1>
        <p className="text-lg leading-8 text-gray-600 mb-8 max-w-2xl mx-auto">
          Scroll down to see the floating navbar remain fixed at the top of your screen with its backdrop blur effect.
        </p>
        <div className="h-[200vh] w-full border-t border-dashed border-gray-300 pt-8 opacity-50">
          <p>Scrolling area designed to test scroll effects...</p>
        </div>
      </div>
    </main>
  );
}
