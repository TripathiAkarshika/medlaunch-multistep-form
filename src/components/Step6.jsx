import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Checkbox from './Checkbox';
import Input from './Input';
import Button from './Button';
import '../styles/Step6.css';

const Step6 = () => {
  const { formData, updateFormData, updateNestedFormData, nextStep, previousStep } =
    useFormContext();
  const [errors, setErrors] = useState({});
  const [thrombolyticInput, setThrombolyticInput] = useState('');
  const [thrombectomyInput, setThrombectomyInput] = useState('');

  const services = [
    { key: 'emergencyDepartment', label: 'Emergency Department' },
    { key: 'neonatalIntensiveCare', label: 'Neonatal Intensive Care Services' },
    { key: 'pediatricIntensiveCare', label: 'Pediatric Intensive Care Services' },
    { key: 'cardiacCatheterizationLab', label: 'Cardiac Catheterization Laboratory' },
    { key: 'openHeart', label: 'Open Heart' },
    { key: 'mriImaging', label: 'Magnetic Resonance Imaging (MRI)' },
    { key: 'diagnosticRadioisotope', label: 'Diagnostic Radioisotope Facility' },
    { key: 'lithotripsy', label: 'Lithotripsy' },
  ];

  const handleServiceChange = (serviceKey) => {
    updateNestedFormData(
      'serviceOffering',
      serviceKey,
      !formData.serviceOffering[serviceKey]
    );
  };

  const handleOtherServiceChange = (e) => {
    updateFormData('otherServiceOffering', e.target.value);
  };

  const handleStandardsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    updateFormData('standardsToApply', selectedOptions);
  };

  const handleDateChange = (field, value) => {
    updateFormData(field, value);
  };

  const handleAddThrombolyticDate = () => {
    if (thrombolyticInput) {
      const newDates = [...formData.thrombolyticDates, thrombolyticInput];
      updateFormData('thrombolyticDates', newDates);
      setThrombolyticInput('');
    }
  };

  const handleRemoveThrombolyticDate = (index) => {
    const newDates = formData.thrombolyticDates.filter((_, i) => i !== index);
    updateFormData('thrombolyticDates', newDates);
  };

  const handleAddThrombectomyDate = () => {
    if (thrombectomyInput) {
      const newDates = [...formData.thrombectomyDates, thrombectomyInput];
      updateFormData('thrombectomyDates', newDates);
      setThrombectomyInput('');
    }
  };

  const handleRemoveThrombectomyDate = (index) => {
    const newDates = formData.thrombectomyDates.filter((_, i) => i !== index);
    updateFormData('thrombectomyDates', newDates);
  };

  const validate = () => {
    const newErrors = {};

    // At least one service should be selected
    const hasSelectedService = Object.values(formData.serviceOffering).some(val => val);
    const hasOtherService = formData.otherServiceOffering.trim() !== '';

    if (!hasSelectedService && !hasOtherService) {
      newErrors.services = 'Please select at least one service';
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
    <div className="step-container">
      <div className="step-header">
        <h2>Services & Certifications</h2>
      </div>

      <div className="form-section">
        <h3>Service Offering</h3>
        <p className="section-description">Primary Site Service offering</p>

        {/* All Services Tab */}
        <div className="service-tabs">
          <button className="tab-button active">All Services</button>
        </div>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search services..."
            className="search-input"
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Services */}
        <div className="services-grid">
          <div className="service-category">
            <h4>Emergency & Critical Care</h4>
            {services.slice(0, 3).map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.serviceOffering[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>

          <div className="service-category">
            <h4>Cardiac Services</h4>
            {services.slice(3, 5).map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.serviceOffering[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>

          <div className="service-category">
            <h4>Diagnostic Services</h4>
            {services.slice(5).map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.serviceOffering[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>
        </div>

        {/* Add Other Service */}
        <button className="add-other-service-btn">+ Add Other Service</button>

        {/* Other Service Input */}
        <div className="other-service-input">
          <Input
            label="Other Service"
            name="otherServiceOffering"
            value={formData.otherServiceOffering}
            onChange={handleOtherServiceChange}
            placeholder="Specify other service"
          />
        </div>

        {errors.services && (
          <span className="error-message">{errors.services}</span>
        )}
      </div>

      <div className="form-section">
        <h3>Standards to Apply</h3>

        <div className="standards-select">
          <label className="input-label">Select Standard(s)</label>
          <select
            multiple
            value={formData.standardsToApply}
            onChange={handleStandardsChange}
            className="select-field multi-select"
          >
            <option value="action1">Action1</option>
            <option value="action2">Action2</option>
            <option value="action3">Action3</option>
          </select>
        </div>

        {/* Selected Standards Tags */}
        <div className="selected-standards">
          {formData.standardsToApply.map((standard, index) => (
            <span key={index} className="standard-tag">
              {standard}
              <button
                onClick={() => {
                  const newStandards = formData.standardsToApply.filter(
                    (_, i) => i !== index
                  );
                  updateFormData('standardsToApply', newStandards);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Date Fields */}
        <div className="date-fields">
          <div className="form-row">
            <Input
              label="Expiration Date of Current Stroke Certification"
              name="strokeCertificationExpiration"
              type="date"
              value={formData.strokeCertificationExpiration}
              onChange={(e) =>
                handleDateChange('strokeCertificationExpiration', e.target.value)
              }
              className="half-width"
            />
            <Input
              label="Date of Application"
              name="applicationDate"
              type="date"
              value={formData.applicationDate}
              onChange={(e) => handleDateChange('applicationDate', e.target.value)}
              className="half-width"
            />
          </div>
        </div>

        {/* Thrombolytic Dates */}
        <div className="date-list-section">
          <label className="input-label">
            Dates of last twenty-five thrombolytic administrations
          </label>
          <div className="date-input-group">
            <input
              type="date"
              value={thrombolyticInput}
              onChange={(e) => setThrombolyticInput(e.target.value)}
              className="date-input"
            />
            <Button variant="primary" onClick={handleAddThrombolyticDate}>
              Add
            </Button>
          </div>

          <div className="date-tags">
            {formData.thrombolyticDates.map((date, index) => (
              <span key={index} className="date-tag">
                {date}
                <button onClick={() => handleRemoveThrombolyticDate(index)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Thrombectomy Dates */}
        <div className="date-list-section">
          <label className="input-label">Dates of last fifteen thrombectomies</label>
          <div className="date-input-group">
            <input
              type="date"
              value={thrombectomyInput}
              onChange={(e) => setThrombectomyInput(e.target.value)}
              className="date-input"
            />
            <Button variant="primary" onClick={handleAddThrombectomyDate}>
              Add
            </Button>
          </div>

          <div className="date-tags">
            {formData.thrombectomyDates.map((date, index) => (
              <span key={index} className="date-tag">
                {date}
                <button onClick={() => handleRemoveThrombectomyDate(index)}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline" onClick={previousStep}>
          Previous
        </Button>
        <div className="right-actions">
          <Button variant="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step6;
