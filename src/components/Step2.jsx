import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './Button';
import '../styles/Step2.css';

const Step2 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [errors, setErrors] = useState({});

  const facilityTypes = [
    { value: 'short-term-acute', label: 'Short-Term Acute Care' },
    { value: 'long-term-acute', label: 'Long-Term Acute Care' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'childrens', label: "Children's" },
    { value: 'free-standing-psychiatric', label: 'Free-Standing Psychiatric' },
    { value: 'same-as-legal', label: 'Same as Legal Entity Name' },
    { value: 'critical-access', label: 'Critical Access' },
    { value: 'ltac', label: 'Long-Term Acute Care (LTAC)' },
    { value: 'other', label: 'Other' },
  ];

  const handleFacilityTypeSelect = (value) => {
    updateFormData('facilityType', value);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.facilityType) {
      newErrors.facilityType = 'Please select a facility type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleSave = () => {
    console.log('Form data saved:', formData);
    alert('Progress saved!');
  };

  return (
    <>
      <div className="form-content">
        <div className="step-container">
          <div className="form-section">
            <h3>Facility and Organization Type</h3>

            <div className="facility-type-label">
              Facility Type <span style={{ color: 'var(--error)' }}>*</span>
            </div>

            <div className="radio-group">
              {facilityTypes.map((type) => (
                <label key={type.value} className="radio-option">
                  <input
                    type="radio"
                    name="facilityType"
                    value={type.value}
                    checked={formData.facilityType === type.value}
                    onChange={() => handleFacilityTypeSelect(type.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{type.label}</span>
                </label>
              ))}
            </div>

            {errors.facilityType && (
              <span className="error-message">{errors.facilityType}</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline-blue" onClick={previousStep}>
          Previous
        </Button>
        <div className="right-actions">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step2;
