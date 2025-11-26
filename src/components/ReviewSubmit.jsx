import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './Button';
import '../styles/ReviewSubmit.css';

const ReviewSubmit = () => {
  const { formData, previousStep, goToStep, resetForm } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (step) => {
    goToStep(step);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Log the complete form data to console
    console.log('=== FORM SUBMISSION ===');
    console.log('Complete Form Data:', JSON.stringify(formData, null, 2));
    console.log('======================');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted successfully!');
      // Optionally reset form after submission
      // resetForm();
    }, 1500);
  };

  const handleSaveAndExit = () => {
    console.log('Form data saved:', formData);
    alert('Progress saved! You can continue later.');
  };

  return (
    <div className="step-container review-submit">
      <div className="step-header">
        <h2>Review & Submit</h2>
      </div>

      {/* Hospital Information */}
      <div className="review-section">
        <div className="section-header">
          <h3>Hospital Information</h3>
          <button className="edit-btn" onClick={() => handleEdit(1)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="collapsible-section expanded">
            <h4>Basic Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Legal Entity Name</span>
                <span className="value">{formData.legalEntityName || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">DBA Name</span>
                <span className="value">{formData.dbaName || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Primary Contact</span>
                <span className="value">
                  {formData.primaryContact.firstName} {formData.primaryContact.lastName}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{formData.primaryContact.email || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{formData.primaryContact.workPhone || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Title</span>
                <span className="value">{formData.primaryContact.title || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Detail */}
      <div className="review-section">
        <div className="section-header">
          <h3>Facility Detail</h3>
          <button className="edit-btn" onClick={() => handleEdit(2)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="info-item">
            <span className="label">Facility Type</span>
            <span className="value">{formData.facilityType || 'None Selected'}</span>
          </div>
        </div>
      </div>

      {/* Leadership Contacts */}
      <div className="review-section">
        <div className="section-header">
          <h3>Leadership Contacts</h3>
          <button className="edit-btn" onClick={() => handleEdit(3)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="collapsible-section">
            <h4>Chief Executive Officer (CEO)</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Name</span>
                <span className="value">
                  {formData.ceo.firstName} {formData.ceo.lastName}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{formData.ceo.phone || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{formData.ceo.email || '-'}</span>
              </div>
            </div>
          </div>

          <div className="collapsible-section">
            <h4>Director of Quality</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Name</span>
                <span className="value">
                  {formData.directorOfQuality.firstName} {formData.directorOfQuality.lastName}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{formData.directorOfQuality.phone || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{formData.directorOfQuality.email || '-'}</span>
              </div>
            </div>
          </div>

          <div className="collapsible-section">
            <h4>Invoicing Contact</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Name</span>
                <span className="value">
                  {formData.invoicingContact.firstName} {formData.invoicingContact.lastName}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{formData.invoicingContact.phone || '-'}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{formData.invoicingContact.email || '-'}</span>
              </div>
            </div>
          </div>

          <div className="collapsible-section">
            <h4>Billing Address</h4>
            <div className="info-item">
              <span className="value">
                {formData.billingAddress.street}
                <br />
                {formData.billingAddress.city}, {formData.billingAddress.state}{' '}
                {formData.billingAddress.zipCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Site Information */}
      <div className="review-section">
        <div className="section-header">
          <h3>Site Information</h3>
          <button className="edit-btn" onClick={() => handleEdit(4)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="info-item">
            <span className="label">Location Type</span>
            <span className="value">
              {formData.hasMultipleSites === 'single'
                ? 'Single Location'
                : formData.hasMultipleSites === 'multiple'
                ? 'Multiple Locations'
                : 'Not specified'}
            </span>
          </div>
          {formData.hasMultipleSites === 'multiple' && (
            <div className="info-item">
              <span className="label">Uploaded Files</span>
              <span className="value">
                {formData.uploadedFiles.length > 0
                  ? formData.uploadedFiles.map(f => f.name).join(', ')
                  : 'No files uploaded'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Services & Certifications */}
      <div className="review-section">
        <div className="section-header">
          <h3>Services & Certifications</h3>
          <button className="edit-btn" onClick={() => handleEdit(6)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="collapsible-section">
            <h4>Services to Apply</h4>
            <div className="info-item">
              <span className="label">Healthcare Services</span>
              <span className="value">
                {Object.entries(formData.serviceOffering)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim())
                  .join(', ') || 'None selected'}
              </span>
            </div>
          </div>

          <div className="collapsible-section">
            <h4>Standards to Apply</h4>
            <div className="info-item">
              <span className="value">
                {formData.standardsToApply.length > 0
                  ? formData.standardsToApply.join(', ')
                  : 'None selected'}
              </span>
            </div>
          </div>

          {formData.thrombolyticDates.length > 0 && (
            <div className="collapsible-section">
              <h4>Thrombolytic Administrations</h4>
              <div className="info-item">
                <span className="value">
                  {formData.thrombolyticDates.join(', ')}
                </span>
              </div>
            </div>
          )}

          {formData.thrombectomyDates.length > 0 && (
            <div className="collapsible-section">
              <h4>Thrombectomies</h4>
              <div className="info-item">
                <span className="value">
                  {formData.thrombectomyDates.join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ready to Submit */}
      <div className="submit-section">
        <h3>Ready to Submit?</h3>
        <p className="submit-description">
          I certify that the information provided is accurate and complete to the best of my knowledge.
        </p>

        <div className="submit-buttons">
          <Button variant="outline" onClick={handleSaveAndExit}>
            Download PDF
          </Button>
          <Button variant="outline" onClick={handleSaveAndExit}>
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline" onClick={previousStep}>
          Previous
        </Button>
        <div className="right-actions">
          <Button variant="secondary" onClick={handleSaveAndExit}>
            Save & Exit
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
