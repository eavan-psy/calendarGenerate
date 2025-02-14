import Calendar from "../components/Calendar";
import ErrorBoundary from "../components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <ErrorBoundary>
        <Calendar />
      </ErrorBoundary>
    </div>
  );
};

export default Index;
