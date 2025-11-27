import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './Button';
import '../styles/Step6.css';

const Step6 = () => {
  const { formData, previousStep, goToStep, resetForm } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBasicInfoExpanded, setIsBasicInfoExpanded] = useState(true);
  const [isFacilityDetailExpanded, setIsFacilityDetailExpanded] = useState(true);
  const [isLeadershipExpanded, setIsLeadershipExpanded] = useState(true);
  const [isSiteInfoExpanded, setIsSiteInfoExpanded] = useState(true);
  const [isServicesExpanded, setIsServicesExpanded] = useState(true);
  const [isCertified, setIsCertified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEdit = (step) => {
    goToStep(step);
  };

  const toggleBasicInfo = () => {
    setIsBasicInfoExpanded(!isBasicInfoExpanded);
  };

  const toggleFacilityDetail = () => {
    setIsFacilityDetailExpanded(!isFacilityDetailExpanded);
  };

  const toggleLeadership = () => {
    setIsLeadershipExpanded(!isLeadershipExpanded);
  };

  const toggleSiteInfo = () => {
    setIsSiteInfoExpanded(!isSiteInfoExpanded);
  };

  const toggleServices = () => {
    setIsServicesExpanded(!isServicesExpanded);
  };

  const handleSubmit = () => {
    if (!isCertified) {
      alert('Please certify that the information is accurate before submitting.');
      return;
    }
    
    setIsSubmitting(true);

    // Log the complete form data to console
    console.log('=== FORM SUBMISSION ===');
    console.log('Complete Form Data:', JSON.stringify(formData, null, 2));
    console.log('======================');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleDownloadPDF = () => {
    // Create comprehensive PDF content with all form data
    const pdfContent = `
APPLICATION FORM SUMMARY
========================

BASIC INFORMATION
-----------------
Legal Entity Name: ${formData.legalEntityName || 'N/A'}
d/b/a Name: ${formData.dbaName || 'N/A'}

Primary Contact:
Name: ${formData.primaryContact?.firstName || ''} ${formData.primaryContact?.lastName || ''}
Title: ${formData.primaryContact?.title || 'N/A'}
Work Phone: ${formData.primaryContact?.workPhone || 'N/A'}
Cell Phone: ${formData.primaryContact?.cellPhone || 'N/A'}
Email: ${formData.primaryContact?.email || 'N/A'}
Email Verified: ${formData.primaryContact?.emailVerified ? 'Not Verified' : 'Verified'}
Address: ${formData.billingAddress?.street || ''}, ${formData.billingAddress?.city || ''}, ${formData.billingAddress?.state || ''} ${formData.billingAddress?.zipCode || ''}

FACILITY DETAIL
---------------
Facility Type: ${formData.facilityType || 'N/A'}

LEADERSHIP CONTACTS
-------------------
CEO:
Name: ${formData.ceo?.firstName || ''} ${formData.ceo?.lastName || ''}
Phone: ${formData.ceo?.phone || 'N/A'}
Email: ${formData.ceo?.email || 'N/A'}

Director of Quality:
Name: ${formData.directorOfQuality?.firstName || ''} ${formData.directorOfQuality?.lastName || ''}
Phone: ${formData.directorOfQuality?.phone || 'N/A'}
Email: ${formData.directorOfQuality?.email || 'N/A'}

Invoicing Contact:
Name: ${formData.invoicingContact?.firstName || ''} ${formData.invoicingContact?.lastName || ''}
Title: ${formData.primaryContact?.title || 'N/A'}
Phone: ${formData.invoicingContact?.phone || 'N/A'}
Email: ${formData.invoicingContact?.email || 'N/A'}
Billing Address: ${formData.billingAddress?.street || ''}, ${formData.billingAddress?.city || ''}, ${formData.billingAddress?.state || ''} ${formData.billingAddress?.zipCode || ''}

SITE INFORMATION
----------------
Site Configuration: ${formData.hasMultipleSites === 'multiple' ? `Multiple Locations (${formData.uploadedFiles?.length || 0} sites)` : 'Single Location'}
Input Method: ${formData.hasMultipleSites === 'multiple' ? 'File Upload' : 'N/A'}

SERVICES & CERTIFICATIONS
-------------------------
Services Provided: ${formData.siteServices ? Object.entries(formData.siteServices).filter(([_, v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').trim()).join(', ') : 'None'}
Standards to Apply: ${formData.standardsToApply?.join(', ') || 'None'}
Date of Application: 05/25/2021
Expiration Date of Current Stroke Certification: 05/15/2025
${formData.thrombolyticDates?.length > 0 ? `\nThrombolytic Dates: ${formData.thrombolyticDates.join(', ')}` : ''}
${formData.thrombectomyDates?.length > 0 ? `\nThrombectomy Dates: ${formData.thrombectomyDates.join(', ')}` : ''}
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'application-form.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Section', 'Field', 'Value'],
      // Basic Information
      ['Basic Information', 'Legal Entity Name', formData.legalEntityName || ''],
      ['Basic Information', 'd/b/a Name', formData.dbaName || ''],
      ['Basic Information', 'Primary Contact Name', `${formData.primaryContact?.firstName || ''} ${formData.primaryContact?.lastName || ''}`],
      ['Basic Information', 'Primary Contact Title', formData.primaryContact?.title || ''],
      ['Basic Information', 'Primary Contact Work Phone', formData.primaryContact?.workPhone || ''],
      ['Basic Information', 'Primary Contact Cell Phone', formData.primaryContact?.cellPhone || ''],
      ['Basic Information', 'Primary Contact Email', formData.primaryContact?.email || ''],
      ['Basic Information', 'Email Verified', formData.primaryContact?.emailVerified ? 'Not Verified' : 'Verified'],
      // Facility Detail
      ['Facility Detail', 'Facility Type', formData.facilityType || ''],
      // Leadership
      ['Leadership', 'CEO Name', `${formData.ceo?.firstName || ''} ${formData.ceo?.lastName || ''}`],
      ['Leadership', 'CEO Phone', formData.ceo?.phone || ''],
      ['Leadership', 'CEO Email', formData.ceo?.email || ''],
      ['Leadership', 'Director of Quality Name', `${formData.directorOfQuality?.firstName || ''} ${formData.directorOfQuality?.lastName || ''}`],
      ['Leadership', 'Director of Quality Phone', formData.directorOfQuality?.phone || ''],
      ['Leadership', 'Director of Quality Email', formData.directorOfQuality?.email || ''],
      ['Leadership', 'Invoicing Contact Name', `${formData.invoicingContact?.firstName || ''} ${formData.invoicingContact?.lastName || ''}`],
      ['Leadership', 'Invoicing Contact Phone', formData.invoicingContact?.phone || ''],
      ['Leadership', 'Invoicing Contact Email', formData.invoicingContact?.email || ''],
      // Site Information
      ['Site Information', 'Site Configuration', formData.hasMultipleSites === 'multiple' ? `Multiple Locations (${formData.uploadedFiles?.length || 0} sites)` : 'Single Location'],
      ['Site Information', 'Input Method', formData.hasMultipleSites === 'multiple' ? 'File Upload' : 'N/A'],
      // Services
      ['Services', 'Services Provided', formData.siteServices ? Object.entries(formData.siteServices).filter(([_, v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').trim()).join('; ') : 'None'],
      ['Services', 'Standards to Apply', formData.standardsToApply?.join('; ') || 'None'],
      ['Services', 'Thrombolytic Dates', formData.thrombolyticDates?.join('; ') || 'None'],
      ['Services', 'Thrombectomy Dates', formData.thrombectomyDates?.join('; ') || 'None']
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'application-form.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAndExit = () => {
    console.log('Form data saved:', formData);
    alert('Progress saved! You can continue later.');
  };

  return (
    <>
      <div className="form-content">
        <div className="step-container">
          <div className="form-section step6-white-container">
            <h3 className="section-header">Hospital Information</h3>
            {/* Hospital Information */}
            <div className="collapsible-section-with-header">
              <div className="collapsible-blue-header" onClick={toggleBasicInfo} style={{cursor: 'pointer'}}>
                <div className="header-with-icon">
                  <svg className={`collapse-icon ${!isBasicInfoExpanded ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="header-title">Basic Information</span>
                </div>
                <button className="edit-btn-white" onClick={(e) => { e.stopPropagation(); handleEdit(1); }}>
                  Edit
                </button>
              </div>
              {isBasicInfoExpanded && (
                <div className="collapsible-content">
                <div className="info-row">
                  <span className="label">Legal Entity Name</span>
                  <span className="value">{formData.legalEntityName || 'Sample Hospital Corporation'}</span>
                </div>
                <div className="info-row">
                  <span className="label">d/b/a Name</span>
                  <span className="value">{formData.dbaName || 'Sample Hospital'}</span>
                </div>
                <div className="info-row primary-contact-section">
                  <span className="label">Primary Contact</span>
                  <div className="primary-contact-details">
                    <div className="contact-name">
                      {formData.primaryContact.firstName || 'John'} {formData.primaryContact.lastName || 'Doe'}
                    </div>
                    <div className="contact-title">
                      {formData.primaryContact.title || 'Chief Executive Officer'}
                    </div>
                    <div className="contact-info">
                      Work: {formData.primaryContact.workPhone || 'None'} | Cell: {formData.primaryContact.cellPhone || 'None'}
                    </div>
                    <div className="contact-email">
                      Email: {formData.primaryContact.email || 'None'}
                      {formData.primaryContact.emailVerified ? (
                        <span className="not-verified-badge">Not Verified</span>
                      ) : null}
                    </div>
                    <div className="contact-address">
                      Address: {formData.billingAddress.street ?
                        `${formData.billingAddress.street}, ${formData.billingAddress.city}, ${formData.billingAddress.state} ${formData.billingAddress.zipCode}`
                        : 'None'}
                    </div>
                  </div>
                </div>
                <div className="info-row" style={{ borderBottom: 'none' }}>
                </div>
              </div>
              )}
            </div>

            {/* Facility Detail */}
            <div className="collapsible-section-with-header">
              <div className="collapsible-blue-header" onClick={toggleFacilityDetail} style={{cursor: 'pointer'}}>
                <div className="header-with-icon">
                  <svg className={`collapse-icon ${!isFacilityDetailExpanded ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="header-title">Facility Detail</span>
                </div>
                <button className="edit-btn-white" onClick={(e) => { e.stopPropagation(); handleEdit(2); }}>
                  Edit
                </button>
              </div>
              {isFacilityDetailExpanded && (
                <div className="collapsible-content">
                  <div className="info-row">
                    <span className="label">Facility Type</span>
                    <span className="value">{formData.facilityType || 'None Selected'}</span>
                  </div>
                  <div className="info-row" style={{ borderBottom: 'none' }}>
                  </div>
                </div>
              )}
            </div>

            {/* Leadership Contacts */}
            <div className="collapsible-section-with-header">
              <div className="collapsible-blue-header" onClick={toggleLeadership} style={{cursor: 'pointer'}}>
                <div className="header-with-icon">
                  <svg className={`collapse-icon ${!isLeadershipExpanded ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="header-title">Leadership Contacts</span>
                </div>
                <button className="edit-btn-white" onClick={(e) => { e.stopPropagation(); handleEdit(3); }}>
                  Edit
                </button>
              </div>
              {isLeadershipExpanded && (
                <div className="collapsible-content">
                  <div className="info-row">
                    <span className="label">CEO</span>
                    <div className="contact-box">
                      <div className="contact-name">
                        {formData.ceo.firstName} {formData.ceo.lastName}
                      </div>
                      <div className="contact-info">
                        Phone: {formData.ceo.phone || '(555) 123-4567'}
                      </div>
                      <div className="contact-info">
                        Email: {formData.ceo.email || 'john.doe@hospital.com'}
                      </div>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="label">Director of Quality</span>
                    <div className="contact-box">
                      <div className="contact-name">
                        {formData.directorOfQuality.firstName} {formData.directorOfQuality.lastName}
                      </div>
                      <div className="contact-info">
                        Phone: {formData.directorOfQuality.phone || '(555) 234-5678'}
                      </div>
                      <div className="contact-info">
                        Email: {formData.directorOfQuality.email || 'jane.smith@hospital.com'}
                      </div>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="label">Invoicing Contact</span>
                    <div className="contact-box">
                      <div className="contact-name">
                        {formData.invoicingContact.firstName} {formData.invoicingContact.lastName}
                      </div>
                      <div className="contact-title">
                        Title: {formData.primaryContact.title || 'Director of Finance'}
                      </div>
                      <div className="contact-info">
                        Phone: {formData.invoicingContact.phone || '(555) 456-7890'}
                      </div>
                      <div className="contact-info">
                        Email: {formData.invoicingContact.email || 'robert.brown@hospital.com'}
                      </div>
                      <div className="contact-info">
                        Billing Address: {formData.billingAddress.street ? 
                          `${formData.billingAddress.street}, ${formData.billingAddress.city}, ${formData.billingAddress.state} ${formData.billingAddress.zipCode}` 
                          : '456 Financial Plaza, Suite 200, Medical City, ST 12345'}
                      </div>
                    </div>
                  </div>
                  <div className="info-row" style={{ borderBottom: 'none' }}>
                  </div>
                </div>
              )}
            </div>

            {/* Site Information */}
            <div className="collapsible-section-with-header">
              <div className="collapsible-blue-header" onClick={toggleSiteInfo} style={{cursor: 'pointer'}}>
                <div className="header-with-icon">
                  <svg className={`collapse-icon ${!isSiteInfoExpanded ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="header-title">Site Information</span>
                </div>
                <button className="edit-btn-white" onClick={(e) => { e.stopPropagation(); handleEdit(4); }}>
                  Edit
                </button>
              </div>
              {isSiteInfoExpanded && (
                <div className="collapsible-content">
                  <div className="info-row">
                    <span className="label">Site Configuration</span>
                    <span className="value">
                      {formData.hasMultipleSites === 'multiple' 
                        ? `Multiple Locations (${formData.uploadedFiles.length} sites)` 
                        : 'Single Location'}
                    </span>
                  </div>
                  
                  {formData.hasMultipleSites === 'multiple' && (
                    <>
                      <div className="info-row">
                        <span className="label">Input Method</span>
                        <span className="value">File Upload</span>
                      </div>

                      {formData.uploadedFiles.length > 0 && formData.uploadedFiles.map((file, index) => (
                        <div key={index} className="info-row site-location-row">
                          <span className="label">Practice Location {index + 1}</span>
                          <div className="contact-box">
                            <div className="location-address">
                              456 Medical Plaza, Suite 100 Healthcare City, ST 12346
                            </div>
                            <div className="location-details">
                              FTEs: 45 | Shifts: 2 | Miles to Main: 5
                            </div>
                            <div className="location-details">
                              Days Open: M, T, W, TH, F
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <div className="info-row" style={{ borderBottom: 'none' }}>
                  </div>
                </div>
              )}
            </div>

            {/* Services & Certifications */}
            <div className="collapsible-section-with-header">
              <div className="collapsible-blue-header" onClick={toggleServices} style={{cursor: 'pointer'}}>
                <div className="header-with-icon">
                  <svg className={`collapse-icon ${!isServicesExpanded ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="header-title">Services & Certifications</span>
                </div>
                <button className="edit-btn-white" onClick={(e) => { e.stopPropagation(); handleEdit(5); }}>
                  Edit
                </button>
              </div>
              {isServicesExpanded && (
                <div className="collapsible-content">
                  <div className="info-row services-row">
                    <span className="label">Services Provided</span>
                    <div className="service-tags">
                      {formData.siteServices && Object.entries(formData.siteServices)
                        .filter(([_, value]) => value)
                        .map(([key, _], index) => (
                          <span key={index} className="service-tag">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="info-row services-row">
                    <span className="label">Standards to Apply</span>
                    <div className="service-tags">
                      {formData.standardsToApply && formData.standardsToApply.length > 0 ? (
                        formData.standardsToApply.map((standard, index) => (
                          <span key={index} className="service-tag">
                            {standard}
                          </span>
                        ))
                      ) : (
                        <span className="value">None selected</span>
                      )}
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="label">Date of Application</span>
                    <span className="value">05/25/2021</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Expiration Date of Current Stroke Certification</span>
                    <span className="value">05/15/2025</span>
                  </div>

                  {formData.thrombolyticDates && formData.thrombolyticDates.length > 0 && (
                    <div className="info-row dates-row">
                      <span className="label">Dates of last twenty-five thrombolytic administrations</span>
                      <span className="value">
                        {formData.thrombolyticDates.join(', ')}
                      </span>
                    </div>
                  )}

                  {formData.thrombolyticDates && formData.thrombolyticDates.length > 0 && (
                    <div className="info-row dates-row">
                      <span className="label">Dates of last fifteen thrombectomies</span>
                      <span className="value">
                        {formData.thrombolyticDates.join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="info-row" style={{ borderBottom: 'none' }}>
                  </div>
                </div>
              )}
            </div>

            {/* Ready to Submit */}
            <div className="submit-section">
              <h3>Ready to Submit?</h3>
              
              <div className="certification-checkbox">
                <input 
                  type="checkbox" 
                  id="certify"
                  checked={isCertified}
                  onChange={(e) => setIsCertified(e.target.checked)}
                />
                <label htmlFor="certify">
                  I certify that all information provided is accurate and complete to the best of my knowledge
                </label>
              </div>

              <p className="submit-description">
                By submitting this form, you agree to our terms and conditions. DNV will review your application and contact you within 2-3 business days.
              </p>

              <div className="submit-buttons">
                <button className="download-btn" onClick={handleDownloadPDF}>
                  Download as PDF
                </button>
                <button className="download-btn" onClick={handleExportCSV}>
                  Export to CSV
                </button>
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
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="#10B981" stroke="#10B981" strokeWidth="4"/>
                <path d="M16 30L26 40L44 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Form Submitted!</h2>
            <p>Your application has been successfully submitted.</p>
            <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Step6;
