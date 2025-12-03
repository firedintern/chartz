import Header from "../../../components/Header";
import ChartCustomizer from "../../../components/ChartCustomizer";

export default function ChartPage(props) {
  const { symbol } = props.params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      {/* HEADER SECTION */}
      <Header />

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ChartCustomizer symbol={symbol} />
      </main>
    </div>
  );
}
