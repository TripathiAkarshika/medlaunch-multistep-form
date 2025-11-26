import { FormProvider, useFormContext } from './context/FormContext';
import ProgressBar from './components/ProgressBar';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import ReviewSubmit from './components/ReviewSubmit';
import './App.css';

const AppContent = () => {
  const { currentStep } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <ReviewSubmit />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">DNV Healthcare</h1>
          <div className="user-info">
            <div className="user-avatar">KM</div>
            <span className="user-name">Katherine Martinez</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {currentStep <= 6 && <ProgressBar currentStep={currentStep} totalSteps={6} />}
          <div className="form-content">{renderStep()}</div>
        </div>
      </main>

      <div className="support-chat">
        <button className="support-chat-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <path d="M10 0C4.477 0 0 4.477 0 10c0 1.89.525 3.66 1.438 5.168L0 20l4.832-1.438A9.956 9.956 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0z" />
          </svg>
          <span>Support Chat</span>
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

export default App;
