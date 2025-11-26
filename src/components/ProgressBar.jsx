import '../styles/ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps = 6 }) => {
  const steps = [
    { number: 1, label: 'DNV Quote Request' },
    { number: 2, label: 'Facility Details' },
    { number: 3, label: 'Leadership Contacts' },
    { number: 4, label: 'Site Information' },
    { number: 5, label: 'Services & Certifications' },
    { number: 6, label: 'Review & Submit' },
  ];

  return (
    <div className="progress-bar">
      <div className="step-indicator">
        Step {currentStep} of {totalSteps}
      </div>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`progress-step ${
              currentStep >= step.number ? 'active' : ''
            } ${currentStep === step.number ? 'current' : ''}`}
          >
            <div className="step-label">{step.label}</div>
            <div className="step-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
