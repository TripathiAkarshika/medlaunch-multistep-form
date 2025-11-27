import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';
import '../styles/Step1.css';

const Step1 = () => {
  const { formData, updateFormData, updateNestedFormData, nextStep } =
    useFormContext();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updateFormData(name, checked);
    if (checked && name === 'sameAsLegalEntity') {
      updateFormData('dbaName', formData.legalEntityName);
    }
  };

  const handlePrimaryContactChange = (e) => {
    const { name, value } = e.target;
    updateNestedFormData('primaryContact', name, value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const handleSendVerificationEmail = () => {
    if (validateEmail(formData.primaryContact.email)) {
      updateNestedFormData('primaryContact', 'emailVerified', true);
    } else {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.legalEntityName.trim()) {
      newErrors.legalEntityName = 'Legal Entity Name is required';
    }

    if (!formData.dbaName.trim()) {
      newErrors.dbaName = 'DBA Name is required';
    }

    if (!formData.primaryContact.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.primaryContact.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.primaryContact.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.primaryContact.workPhone.trim()) {
      newErrors.workPhone = 'Work Phone is required';
    } else if (!validatePhone(formData.primaryContact.workPhone)) {
      newErrors.workPhone = 'Please enter a valid phone number';
    }

    if (!formData.primaryContact.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.primaryContact.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <>
      <div className="form-content">
        <div className="step-container">
          <div className="form-section">
            <h3>Identify Healthcare Organization</h3>

            <Input
              label="Legal Entity Name"
              name="legalEntityName"
              value={formData.legalEntityName}
              onChange={handleChange}
              required
              error={errors.legalEntityName}
            />

            <Input
              label="Doing Business As (d/b/a) Name"
              name="dbaName"
              value={formData.dbaName}
              onChange={handleChange}
              required
              error={errors.dbaName}
              disabled={formData.sameAsLegalEntity}
            />

            <Checkbox
              label="Same as Legal Entity Name"
              name="sameAsLegalEntity"
              checked={formData.sameAsLegalEntity}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="form-section">
            <h3>Primary Contact Information</h3>
            <p className="section-description">
              Primary contact receives all DNV Healthcare official communications
            </p>

            <div className="form-row">
              <Input
                label="First Name"
                name="firstName"
                value={formData.primaryContact.firstName}
                onChange={handlePrimaryContactChange}
                required
                error={errors.firstName}
                className="half-width"
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.primaryContact.lastName}
                onChange={handlePrimaryContactChange}
                required
                error={errors.lastName}
                className="half-width"
              />
            </div>

            <Input
              label="Title"
              name="title"
              value={formData.primaryContact.title}
              onChange={handlePrimaryContactChange}
              required
              error={errors.title}
            />

            <div className="form-row">
              <Input
                label="Work Phone"
                name="workPhone"
                type="tel"
                value={formData.primaryContact.workPhone}
                onChange={handlePrimaryContactChange}
                required
                error={errors.workPhone}
                className="half-width"
              />
              <Input
                label="Cell Phone"
                name="cellPhone"
                type="tel"
                value={formData.primaryContact.cellPhone}
                onChange={handlePrimaryContactChange}
                className="half-width"
              />
            </div>

            <div className="email-verification">
              <div className="email-label-row">
                <label htmlFor="email" className="input-label">
                  Email <span className="required">*</span>
                </label>
                {formData.primaryContact.emailVerified && (
                  <button className="reload-button" onClick={() => updateNestedFormData('primaryContact', 'emailVerified', false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#514f4fff" width="800px" height="800px" viewBox="0 0 24 24"><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z" /></svg>
                  </button>
                )}
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.primaryContact.email}
                onChange={handlePrimaryContactChange}
                required
                autoComplete="off"
                className={`input-field ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <div className="verification-row">
                <Button
                  variant="secondary"
                  onClick={handleSendVerificationEmail}
                  className="verify-button"
                >
                  Send Verification Email
                </Button>
                {formData.primaryContact.emailVerified && (
                  <span className="verification-status not-verified">Not verified</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline-blue" onClick={() => alert('Exiting form')}>
          Exit
        </Button>
        <div className="right-actions">
          <Button variant="primary" onClick={() => alert('Saving form')}>
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

export default Step1;
