import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Checkbox from './Checkbox';
import Input from './Input';
import Button from './Button';
import '../styles/Step5.css';

const Step5 = () => {
  const { formData, updateFormData, updateNestedFormData, nextStep, previousStep } =
    useFormContext();
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [showOtherService, setShowOtherService] = useState(false);

  const serviceCategories = {
    emergency: [
      { key: 'emergencyDepartment', label: 'Emergency Department' },
      { key: 'neonatalIntensiveCare', label: 'Neonatal Intensive Care Services' },
      { key: 'pediatricIntensiveCare', label: 'Pediatric Intensive Care Services' },
    ],
    cardiac: [
      { key: 'cardiacCatheterizationLab', label: 'Cardiac Catheterization Laboratory' },
      { key: 'openHeart', label: 'Open Heart' },
    ],
    diagnostic: [
      { key: 'mriImaging', label: 'Magnetic Resonance Imaging (MRI)' },
      { key: 'diagnosticRadioisotope', label: 'Diagnostic Radioisotope Facility' },
      { key: 'lithotripsy', label: 'Lithotripsy' },
    ],
    rehabilitation: [
      { key: 'physicalRehabilitationServices', label: 'Physical Rehabilitation Services' },
      { key: 'physicalTherapy', label: 'Physical Therapy' },
      { key: 'occupationalTherapy', label: 'Occupational Therapy' },
      { key: 'speechLanguageTherapy', label: 'Speech/Language Therapy' },
      { key: 'audiology', label: 'Audiology' },
    ],
  };

  const tabs = [
    { key: 'all', label: 'All Services' },
    { key: 'clinical', label: 'Clinical' },
    { key: 'surgical', label: 'Surgical' },
    { key: 'diagnostic', label: 'Diagnostic' },
    { key: 'rehabilitation', label: 'Rehabilitation' },
    { key: 'specialty', label: 'Specialty' },
  ];

  const handleServiceChange = (serviceKey) => {
    updateNestedFormData('siteServices', serviceKey, !formData.siteServices[serviceKey]);
  };

  const handleOtherServiceChange = (e) => {
    updateFormData('otherService', e.target.value);
  };

  const handleAddOtherService = () => {
    setShowOtherService(true);
  };

  const validate = () => {
    const newErrors = {};
    // At least one service should be selected or other service specified
    const hasSelectedService = Object.values(formData.siteServices).some(val => val);
    const hasOtherService = formData.otherService.trim() !== '';

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

  const renderServicesByCategory = () => {
    return (
      <div className="services-by-category">
        {/* Emergency & Critical Care */}
        <div className="service-category">
          <h4>Emergency & Critical Care</h4>
          <div className="service-grid">
            {serviceCategories.emergency.map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.siteServices[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>
        </div>

        {/* Cardiac Services */}
        <div className="service-category">
          <h4>Cardiac Services</h4>
          <div className="service-grid">
            {serviceCategories.cardiac.map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.siteServices[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>
        </div>

        {/* Diagnostic Services */}
        <div className="service-category">
          <h4>Diagnostic Services</h4>
          <div className="service-grid">
            {serviceCategories.diagnostic.map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.siteServices[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>
        </div>

        {/* Rehabilitation Services */}
        <div className="service-category">
          <h4>Rehabilitation Services</h4>
          <div className="service-grid">
            {serviceCategories.rehabilitation.map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                name={service.key}
                checked={formData.siteServices[service.key]}
                onChange={() => handleServiceChange(service.key)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h2>Site Information</h2>
      </div>

      <div className="form-section">
        <h3>Primary Contact Information</h3>
        <p className="section-description">
          Primary contact receives all DNV Healthcare official communications
        </p>

        {/* Service Tabs */}
        <div className="service-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
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

        {/* Services Display */}
        {renderServicesByCategory()}

        {/* Add Other Service Button */}
        <button className="add-other-service-btn" onClick={handleAddOtherService}>
          + Add Other Service
        </button>

        {/* Other Service Input */}
        {showOtherService && (
          <div className="other-service-section">
            <Input
              label="Other Service"
              name="otherService"
              value={formData.otherService}
              onChange={handleOtherServiceChange}
              placeholder="Specify other service"
            />
          </div>
        )}

        {errors.services && (
          <span className="error-message">{errors.services}</span>
        )}
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

export default Step5;
