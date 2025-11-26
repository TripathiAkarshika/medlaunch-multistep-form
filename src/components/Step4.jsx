import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './Button';
import '../styles/Step4.css';

const Step4 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [errors, setErrors] = useState({});

  const handleLocationTypeSelect = (type) => {
    updateFormData('hasMultipleSites', type);
    if (type === 'single') {
      updateFormData('uploadMethod', '');
      updateFormData('uploadedFiles', []);
    }
  };

  const handleUploadMethodSelect = (method) => {
    updateFormData('uploadMethod', method);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    updateFormData('uploadedFiles', files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    updateFormData('uploadedFiles', updatedFiles);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.hasMultipleSites) {
      newErrors.locationType = 'Please select a location option';
    }

    if (formData.hasMultipleSites === 'multiple' && formData.uploadMethod === 'csv' && formData.uploadedFiles.length === 0) {
      newErrors.fileUpload = 'Please upload at least one file';
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
        <h2>Site Information</h2>
      </div>

      <div className="form-section">
        <h3>Do you have multiple sites or locations?</h3>

        <div className="location-cards">
          <div
            className={`location-card ${
              formData.hasMultipleSites === 'single' ? 'selected' : ''
            }`}
            onClick={() => handleLocationTypeSelect('single')}
          >
            <div className="card-title">Single Location</div>
            <div className="card-description">We operate from one facility only</div>
          </div>

          <div
            className={`location-card ${
              formData.hasMultipleSites === 'multiple' ? 'selected' : ''
            }`}
            onClick={() => handleLocationTypeSelect('multiple')}
          >
            <div className="card-title">Multiple Locations</div>
            <div className="card-description">
              We have multiple facilities or practice locations
            </div>
          </div>
        </div>

        {errors.locationType && (
          <span className="error-message">{errors.locationType}</span>
        )}

        {formData.hasMultipleSites === 'multiple' && (
          <div className="upload-section">
            <h3>How would you like to add your site information?</h3>

            <div
              className={`upload-option ${
                formData.uploadMethod === 'csv' ? 'selected' : ''
              }`}
              onClick={() => handleUploadMethodSelect('csv')}
            >
              <div className="option-title">Upload CSV / Excel</div>
              <div className="option-description">
                Upload a spreadsheet with all site information
              </div>
            </div>

            {formData.uploadMethod === 'csv' && (
              <div className="file-upload-area">
                <div className="upload-box">
                  <div className="upload-icon">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M20 26.6667V13.3333M20 13.3333L26.6667 20M20 13.3333L13.3333 20"
                        stroke="#4A5568"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="upload-title">Upload Site Information</div>
                  <div className="upload-description">
                    Drag and drop your CSV or Excel file here or click to select
                  </div>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="file-input"
                    id="file-upload"
                    multiple
                  />
                  <label htmlFor="file-upload" className="file-input-label">
                    <Button variant="primary">Select file</Button>
                  </label>
                  <a href="#" className="download-template">
                    Download CSV Template
                  </a>
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="uploaded-files">
                    <h4>Uploaded</h4>
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="uploaded-file-item">
                        <div className="file-info">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M9.33333 1.33334H4C3.46957 1.33334 2.96086 1.54405 2.58579 1.91913C2.21071 2.2942 2 2.80291 2 3.33334V12.6667C2 13.1971 2.21071 13.7058 2.58579 14.0809C2.96086 14.456 3.46957 14.6667 4 14.6667H12C12.5304 14.6667 13.0391 14.456 13.4142 14.0809C13.7893 13.7058 14 13.1971 14 12.6667V6L9.33333 1.33334Z"
                              stroke="#4A5568"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{file.name}</span>
                          <span className="file-size">
                            {(file.size / 1024).toFixed(2)}kb
                          </span>
                        </div>
                        <button
                          className="remove-file"
                          onClick={() => handleRemoveFile(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.fileUpload && (
                  <span className="error-message">{errors.fileUpload}</span>
                )}
              </div>
            )}
          </div>
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

export default Step4;
