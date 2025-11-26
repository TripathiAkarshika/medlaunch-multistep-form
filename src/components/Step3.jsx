import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';
import '../styles/Step3.css';

const Step3 = () => {
  const { formData, updateFormData, updateNestedFormData, nextStep, previousStep } =
    useFormContext();
  const [errors, setErrors] = useState({});

  const handleCEOChange = (e) => {
    const { name, value } = e.target;
    updateNestedFormData('ceo', name, value);
  };

  const handleDOQChange = (e) => {
    const { name, value } = e.target;
    updateNestedFormData('directorOfQuality', name, value);
  };

  const handleInvoicingChange = (e) => {
    const { name, value } = e.target;
    updateNestedFormData('invoicingContact', name, value);
  };

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    updateNestedFormData('billingAddress', name, value);
  };

  const handleCEOCheckbox = (e) => {
    const { checked } = e.target;
    updateNestedFormData('ceo', 'sameAsPrimary', checked);
    if (checked) {
      updateFormData('ceo', {
        ...formData.ceo,
        firstName: formData.primaryContact.firstName,
        lastName: formData.primaryContact.lastName,
        phone: formData.primaryContact.workPhone,
        email: formData.primaryContact.email,
        sameAsPrimary: true,
      });
    }
  };

  const handleDOQCheckbox = (e) => {
    const { checked } = e.target;
    updateNestedFormData('directorOfQuality', 'sameAsPrimary', checked);
    if (checked) {
      updateFormData('directorOfQuality', {
        ...formData.directorOfQuality,
        firstName: formData.primaryContact.firstName,
        lastName: formData.primaryContact.lastName,
        phone: formData.primaryContact.workPhone,
        email: formData.primaryContact.email,
        sameAsPrimary: true,
      });
    }
  };

  const handleInvoicingCheckbox = (e) => {
    const { checked } = e.target;
    updateNestedFormData('invoicingContact', 'sameAsPrimary', checked);
    if (checked) {
      updateFormData('invoicingContact', {
        ...formData.invoicingContact,
        firstName: formData.primaryContact.firstName,
        lastName: formData.primaryContact.lastName,
        phone: formData.primaryContact.workPhone,
        email: formData.primaryContact.email,
        sameAsPrimary: true,
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};

    // CEO validation
    if (!formData.ceo.sameAsPrimary) {
      if (!formData.ceo.firstName.trim()) {
        newErrors.ceoFirstName = 'CEO First Name is required';
      }
      if (!formData.ceo.lastName.trim()) {
        newErrors.ceoLastName = 'CEO Last Name is required';
      }
      if (!formData.ceo.phone.trim()) {
        newErrors.ceoPhone = 'CEO Phone is required';
      }
      if (!formData.ceo.email.trim()) {
        newErrors.ceoEmail = 'CEO Email is required';
      } else if (!validateEmail(formData.ceo.email)) {
        newErrors.ceoEmail = 'Please enter a valid email address';
      }
    }

    // Invoicing Contact validation
    if (!formData.invoicingContact.sameAsPrimary) {
      if (!formData.invoicingContact.firstName.trim()) {
        newErrors.invoicingFirstName = 'Invoicing Contact First Name is required';
      }
      if (!formData.invoicingContact.lastName.trim()) {
        newErrors.invoicingLastName = 'Invoicing Contact Last Name is required';
      }
      if (!formData.invoicingContact.phone.trim()) {
        newErrors.invoicingPhone = 'Invoicing Contact Phone is required';
      }
      if (!formData.invoicingContact.email.trim()) {
        newErrors.invoicingEmail = 'Invoicing Contact Email is required';
      } else if (!validateEmail(formData.invoicingContact.email)) {
        newErrors.invoicingEmail = 'Please enter a valid email address';
      }
    }

    // Billing Address validation
    if (!formData.billingAddress.street.trim()) {
      newErrors.street = 'Street Address is required';
    }
    if (!formData.billingAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.billingAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
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
        <h2>Leadership Contacts</h2>
      </div>

      <div className="form-section">
        <h3>Contact Information</h3>

        {/* CEO Section */}
        <div className="contact-section">
          <h4>Chief Executive Officer (CEO)</h4>
          <Checkbox
            label="Same as Primary Contact entered in Step 1"
            name="ceoSameAsPrimary"
            checked={formData.ceo.sameAsPrimary}
            onChange={handleCEOCheckbox}
          />

          <div className="form-row">
            <Input
              label="First Name"
              name="firstName"
              value={formData.ceo.firstName}
              onChange={handleCEOChange}
              required
              disabled={formData.ceo.sameAsPrimary}
              error={errors.ceoFirstName}
              className="half-width"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.ceo.lastName}
              onChange={handleCEOChange}
              required
              disabled={formData.ceo.sameAsPrimary}
              error={errors.ceoLastName}
              className="half-width"
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.ceo.phone}
            onChange={handleCEOChange}
            required
            disabled={formData.ceo.sameAsPrimary}
            error={errors.ceoPhone}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.ceo.email}
            onChange={handleCEOChange}
            required
            disabled={formData.ceo.sameAsPrimary}
            error={errors.ceoEmail}
          />
        </div>

        {/* Director of Quality Section */}
        <div className="contact-section">
          <h4>Director of Quality</h4>
          <Checkbox
            label="Same as Primary Contact entered in Step 1"
            name="doqSameAsPrimary"
            checked={formData.directorOfQuality.sameAsPrimary}
            onChange={handleDOQCheckbox}
          />

          <div className="form-row">
            <Input
              label="First Name"
              name="firstName"
              value={formData.directorOfQuality.firstName}
              onChange={handleDOQChange}
              disabled={formData.directorOfQuality.sameAsPrimary}
              className="half-width"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.directorOfQuality.lastName}
              onChange={handleDOQChange}
              disabled={formData.directorOfQuality.sameAsPrimary}
              className="half-width"
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.directorOfQuality.phone}
            onChange={handleDOQChange}
            disabled={formData.directorOfQuality.sameAsPrimary}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.directorOfQuality.email}
            onChange={handleDOQChange}
            disabled={formData.directorOfQuality.sameAsPrimary}
          />
        </div>

        {/* Invoicing Contact Section */}
        <div className="contact-section">
          <h4>Invoicing Contact</h4>
          <Checkbox
            label="Same as Primary Contact entered in Step 1"
            name="invoicingSameAsPrimary"
            checked={formData.invoicingContact.sameAsPrimary}
            onChange={handleInvoicingCheckbox}
          />

          <div className="form-row">
            <Input
              label="First Name"
              name="firstName"
              value={formData.invoicingContact.firstName}
              onChange={handleInvoicingChange}
              required
              disabled={formData.invoicingContact.sameAsPrimary}
              error={errors.invoicingFirstName}
              className="half-width"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.invoicingContact.lastName}
              onChange={handleInvoicingChange}
              required
              disabled={formData.invoicingContact.sameAsPrimary}
              error={errors.invoicingLastName}
              className="half-width"
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.invoicingContact.phone}
            onChange={handleInvoicingChange}
            required
            disabled={formData.invoicingContact.sameAsPrimary}
            error={errors.invoicingPhone}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.invoicingContact.email}
            onChange={handleInvoicingChange}
            required
            disabled={formData.invoicingContact.sameAsPrimary}
            error={errors.invoicingEmail}
          />
        </div>

        {/* Billing Address Section */}
        <div className="contact-section">
          <h4>Billing Address</h4>

          <Input
            label="Street Address"
            name="street"
            value={formData.billingAddress.street}
            onChange={handleBillingAddressChange}
            required
            error={errors.street}
          />

          <div className="form-row">
            <Input
              label="City"
              name="city"
              value={formData.billingAddress.city}
              onChange={handleBillingAddressChange}
              required
              error={errors.city}
              className="third-width"
            />
            <div className="third-width">
              <label className="input-label">
                State <span className="required">*</span>
              </label>
              <select
                name="state"
                value={formData.billingAddress.state}
                onChange={handleBillingAddressChange}
                className="select-field"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                {/* Add more states as needed */}
              </select>
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
            <Input
              label="ZIP Code"
              name="zipCode"
              value={formData.billingAddress.zipCode}
              onChange={handleBillingAddressChange}
              required
              error={errors.zipCode}
              className="third-width"
            />
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

export default Step3;
