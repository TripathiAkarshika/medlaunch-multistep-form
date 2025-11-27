import { useState, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandards, setSelectedStandards] = useState(formData.standardsToApply || []);
  const [thrombolyticDates, setThrombolyticDates] = useState(formData.thrombolyticDates || []);
  const [thrombectomyDates, setThrombectomyDates] = useState(formData.thrombectomyDates || []);

  // Initialize local state from formData when component mounts or formData changes
  useEffect(() => {
    if (formData.standardsToApply) setSelectedStandards(formData.standardsToApply);
    if (formData.thrombolyticDates) setThrombolyticDates(formData.thrombolyticDates);
    if (formData.thrombectomyDates) setThrombectomyDates(formData.thrombectomyDates);
  }, []);

  const serviceCategories = {
    emergency: [
      { key: 'emergencyDepartment', label: 'Emergency Department' },
      { key: 'neonatalIntensiveCare', label: 'Neonatal Intensive Care Services' },
      { key: 'pediatricIntensiveCare', label: 'Pediatric Intensive Care Services' },
      { key: 'pediatricIntensiveCare2', label: 'Pediatric Intensive Care Services' },
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
      { key: 'physicalRehabilitation', label: 'Physical Rehabilitation Services' },
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

  const handleRemoveStandard = (standard) => {
    setSelectedStandards(selectedStandards.filter(s => s !== standard));
  };

  const handleStandardSelect = (e) => {
    const value = e.target.value;
    if (value && !selectedStandards.includes(value)) {
      setSelectedStandards([...selectedStandards, value]);
    }
    e.target.value = '';
  };

  const handleRemoveThrombolyticDate = (index) => {
    setThrombolyticDates(thrombolyticDates.filter((_, i) => i !== index));
  };

  const handleAddThrombolyticDate = (e) => {
    const value = e.target.value;
    if (value && !thrombolyticDates.includes(value)) {
      setThrombolyticDates([...thrombolyticDates, value]);
    }
    e.target.value = '';
  };

  const handleRemoveThrombectomyDate = (index) => {
    setThrombectomyDates(thrombectomyDates.filter((_, i) => i !== index));
  };

  const handleAddThrombectomyDate = (e) => {
    const value = e.target.value;
    if (value && !thrombectomyDates.includes(value)) {
      setThrombectomyDates([...thrombectomyDates, value]);
    }
    e.target.value = '';
  };

  const validate = () => {
    const newErrors = {};
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
      // Save local state to formData before proceeding
      updateFormData('thrombolyticDates', thrombolyticDates);
      updateFormData('thrombectomyDates', thrombectomyDates);
      updateFormData('standardsToApply', selectedStandards);
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
        {Object.entries(serviceCategories).map(([categoryKey, services]) => (
          <div key={categoryKey} className="service-category-card">
            <h4>
              {categoryKey === 'emergency' && 'Emergency & Critical Care'}
              {categoryKey === 'cardiac' && 'Cardiac Services'}
              {categoryKey === 'diagnostic' && 'Diagnostic Services'}
              {categoryKey === 'rehabilitation' && 'Rehabilitation Services'}
            </h4>
            <div className="service-checkbox-list">
              {services.map((service) => (
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
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="form-content">
        <div className="step-container">
          <div className="form-section step5-white-container">
            <div className="service-offering-section">
              <h3 className="section-main-title">Service Offering</h3>
              <p className="section-subtitle">Primary Site Service offering</p>

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

              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
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

              {renderServicesByCategory()}

              <button className="add-other-service-btn" onClick={handleAddOtherService}>
                + Add Other Service
              </button>

              {showOtherService && (
                <div className="other-service-section">
                  <Input
                    label="Other Service"
                    name="otherService"
                    value={formData.otherService}
                    onChange={handleOtherServiceChange}
                    placeholder="Specify other service"
                  />
                   <button
                    type="button"
                    className="close-other-service"
                    onClick={() => setShowOtherService(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              )}

              {errors.services && (
                <span className="error-message">{errors.services}</span>
              )}
            </div>

            <div className="standards-section">
              <h3 className="section-title">Standards to Apply</h3>

              <div className="standards-dropdown">
                <select className="select-field" onChange={handleStandardSelect}>
                  <option value="">Select Standard(s)</option>
                  <option value="Action1">Action1</option>
                  <option value="Action2">Action2</option>
                </select>
              </div>

              <div className="selected-standards">
                {selectedStandards.map((standard) => (
                  <span key={standard} className="standard-tag">
                    {standard}
                    <button
                      type="button"
                      onClick={() => handleRemoveStandard(standard)}
                      className="remove-standard"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="dates-row">
              <div className="date-field-group">
                <label className="input-label">Expiration Date of Current Stroke Certification</label>
                <input type="date" className="input-field" placeholder="mm/dd/yyyy" />
              </div>

              <div className="date-field-group">
                <label className="input-label">Date of Application</label>
                <input type="date" className="input-field" placeholder="mm/dd/yyyy" />
              </div>
            </div>

            <div className="multiple-dates-section">
              <label className="input-label">Dates of last twenty-five thrombolytic administrations</label>
              <input 
                type="date" 
                className="input-field" 
                onChange={handleAddThrombolyticDate}
              />
              <div className="date-tags">
                {thrombolyticDates.map((date, index) => (
                  <span key={index} className="date-tag">
                    {date}
                    <button
                      type="button"
                      onClick={() => handleRemoveThrombolyticDate(index)}
                      className="remove-date"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="multiple-dates-section">
              <label className="input-label">Dates of last fifteen thrombectomies</label>
              <input 
                type="date" 
                className="input-field" 
                onChange={handleAddThrombectomyDate}
              />
              <div className="date-tags">
                {thrombectomyDates.map((date, index) => (
                  <span key={index} className="date-tag">
                    {date}
                    <button
                      type="button"
                      onClick={() => handleRemoveThrombectomyDate(index)}
                      className="remove-date"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
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

export default Step5;
