import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './Button';
import '../styles/Step4.css';

const Step4 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

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
    const currentFiles = formData.uploadedFiles || [];

    // Simulate upload progress for each file
    files.forEach((file, index) => {
      const fileId = `${file.name}-${Date.now()}-${index}`;
      file.fileId = fileId;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 500);
        }
      }, 100);
    });

    updateFormData('uploadedFiles', [...currentFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    updateFormData('uploadedFiles', updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFiles = files.filter(
      (file) =>
        file.type === 'text/csv' ||
        file.name.endsWith('.csv') ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls')
    );

    if (csvFiles.length > 0) {
      const currentFiles = formData.uploadedFiles || [];

      // Simulate upload progress for dropped files
      csvFiles.forEach((file, index) => {
        const fileId = `${file.name}-${Date.now()}-${index}`;
        file.fileId = fileId;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress <= 100) {
            setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
          }
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileId];
                return newProgress;
              });
            }, 500);
          }
        }, 100);
      });

      updateFormData('uploadedFiles', [...currentFiles, ...csvFiles]);
    }
  };

  const handlePreviewFile = (file) => {
    const fileURL = URL.createObjectURL(file);

    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      window.open(fileURL, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = file.name;
      link.click();
    }

    setTimeout(() => URL.revokeObjectURL(fileURL), 100);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + sizes[i];
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
    <>
      <div className="form-content">
        <div className="step-container">
          <div className="form-section">
            <h3>Do you have multiple sites or locations?</h3>

            <div className="location-cards">
              <div
                className={`location-card ${formData.hasMultipleSites === 'single' ? 'selected' : ''
                  }`}
                onClick={() => handleLocationTypeSelect('single')}
              >
                <div className="card-title">Single Location</div>
                <div className="card-description">We operate from one facility only</div>
              </div>

              <div
                className={`location-card ${formData.hasMultipleSites === 'multiple' ? 'selected' : ''
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
                  className={`upload-option ${formData.uploadMethod === 'csv' ? 'selected' : ''
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
                    <div
                      className={`upload-box ${isDragging ? 'dragging' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="upload-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.27126 16C4.31103 14.7751 3 12.5463 3 10C3 6.13401 6.02208 3 9.75 3C13.1779 3 16.009 5.64982 16.4425 9.08201C16.4575 9.20119 16.5708 9.28382 16.6895 9.26537C16.8724 9.23695 17.0595 9.22222 17.25 9.22222C19.3211 9.22222 21 10.9633 21 13.1111C21 14.2576 20.5216 15.2882 19.7605 16" stroke="#737373" strokeWidth="0.8" strokeLinecap="round" />
                          <path d="M13 13.5V21" stroke="#737373" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 16L13.5 13.5V13.5C13.2239 13.2239 12.7761 13.2239 12.5 13.5V13.5L10 16" stroke="#737373" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="upload-title">Upload Site Information</div>
                      <div className="upload-description">
                        Drag and drop your CSV or Excel file here; or click to select
                      </div>
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="file-input"
                        id="file-upload"
                        multiple
                      />
                      <div className="file-input-label">
                        <label htmlFor="file-upload" className="select-file-btn">
                          Select file
                        </label>
                      </div>
                      <div>
                        <a href="/site-information-template.csv" download="site-information-template.csv" className="download-template">
                          Download CSV Template
                        </a>
                      </div>
                    </div>

                    {formData.uploadedFiles && formData.uploadedFiles.length > 0 && (
                      <div className="uploaded-files">
                        <h4>Uploaded</h4>
                        {formData.uploadedFiles.map((file, index) => (
                          <div key={index} className="uploaded-file-item-wrapper">
                            <div className="uploaded-file-item">
                              <button
                                type="button"
                                className="remove-file"
                                onClick={() => handleRemoveFile(index)}
                                aria-label="Remove file"
                              >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="10" r="9" fill="#0066CC" />
                                  <path d="M13 7L7 13M7 7L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </button>
                              <div className="file-info">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="#1e528a" strokeWidth="1.752" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                <div className="file-content-wrapper">
                                  <div className="file-text-row">
                                    <span className="file-name">{file.name}</span>
                                    <span style={{ color: 'var(--gray-600)', margin: '0 4px' }}>•</span>
                                    <button
                                      type="button"
                                      onClick={() => handlePreviewFile(file)}
                                      className="file-preview-btn"
                                    >
                                      Preview
                                    </button>
                                    <span className="file-size">
                                      {formatFileSize(file.size)}
                                    </span>
                                  </div>
                                  {file.fileId && uploadProgress[file.fileId] !== undefined && uploadProgress[file.fileId] < 100 && (
                                    <div className="file-upload-progress-container">
                                      <div className="file-upload-progress-bar" style={{ width: `${uploadProgress[file.fileId]}%` }}></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
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

export default Step4;
