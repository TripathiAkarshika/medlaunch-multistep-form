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
      alert('Verification email sent!');
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
    <div className="step-container">
      <div className="step-header">
        <h2>New DNV Quote Request</h2>
      </div>

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
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.primaryContact.email}
            onChange={handlePrimaryContactChange}
            required
            error={errors.email}
          />
          <Button
            variant="secondary"
            onClick={handleSendVerificationEmail}
            className="verify-button"
          >
            Send Verification Email
          </Button>
          {formData.primaryContact.emailVerified && (
            <span className="verification-status">Not verified</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline" onClick={() => alert('Exiting form')}>
          Exit
        </Button>
        <div className="right-actions">
          <Button variant="secondary" onClick={() => alert('Saving form')}>
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

export default Step1;
