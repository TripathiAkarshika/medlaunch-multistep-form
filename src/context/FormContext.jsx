import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: DNV Quote Request
    legalEntityName: '',
    dbaName: '',
    sameAsLegalEntity: false,
    primaryContact: {
      firstName: '',
      lastName: '',
      title: '',
      workPhone: '',
      cellPhone: '',
      email: '',
      emailVerified: false,
    },

    // Step 2: Facility Details
    facilityType: '',

    // Step 3: Leadership Contacts
    ceo: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    directorOfQuality: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    invoicingContact: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },

    // Step 4: Site Information
    hasMultipleSites: null, // null, 'single', or 'multiple'
    uploadMethod: '', // 'csv' or 'manual'
    uploadedFiles: [],

    // Step 5: Site Information - Primary Contact
    siteServices: {
      emergencyDepartment: false,
      neonatalIntensiveCare: false,
      pediatricIntensiveCare: false,
      cardiacCatheterizationLab: false,
      openHeart: false,
      mriImaging: false,
      diagnosticRadioisotope: false,
      lithotripsy: false,
      physicalRehabilitationServices: false,
      physicalTherapy: false,
      occupationalTherapy: false,
      speechLanguageTherapy: false,
      audiology: false,
    },
    otherService: '',

    // Step 6: Services & Certifications
    serviceOffering: {
      emergencyDepartment: false,
      neonatalIntensiveCare: false,
      pediatricIntensiveCare: false,
      cardiacCatheterizationLab: false,
      openHeart: false,
      mriImaging: false,
      diagnosticRadioisotope: false,
      lithotripsy: false,
    },
    otherServiceOffering: '',
    standardsToApply: [],
    strokeCertificationExpiration: '',
    applicationDate: '',
    thrombolyticDates: [],
    thrombectomyDates: [],

    // Review & Submit
    readyToSubmit: false,
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const resetForm = () => {
    setFormData({
      legalEntityName: '',
      dbaName: '',
      sameAsLegalEntity: false,
      primaryContact: {
        firstName: '',
        lastName: '',
        title: '',
        workPhone: '',
        cellPhone: '',
        email: '',
        emailVerified: false,
      },
      facilityType: '',
      ceo: {
        sameAsPrimary: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      directorOfQuality: {
        sameAsPrimary: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      invoicingContact: {
        sameAsPrimary: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      hasMultipleSites: null,
      uploadMethod: '',
      uploadedFiles: [],
      siteServices: {
        emergencyDepartment: false,
        neonatalIntensiveCare: false,
        pediatricIntensiveCare: false,
        cardiacCatheterizationLab: false,
        openHeart: false,
        mriImaging: false,
        diagnosticRadioisotope: false,
        lithotripsy: false,
        physicalRehabilitationServices: false,
        physicalTherapy: false,
        occupationalTherapy: false,
        speechLanguageTherapy: false,
        audiology: false,
      },
      otherService: '',
      serviceOffering: {
        emergencyDepartment: false,
        neonatalIntensiveCare: false,
        pediatricIntensiveCare: false,
        cardiacCatheterizationLab: false,
        openHeart: false,
        mriImaging: false,
        diagnosticRadioisotope: false,
        lithotripsy: false,
      },
      otherServiceOffering: '',
      standardsToApply: [],
      strokeCertificationExpiration: '',
      applicationDate: '',
      thrombolyticDates: [],
      thrombectomyDates: [],
      readyToSubmit: false,
    });
    setCurrentStep(1);
  };

  const value = {
    currentStep,
    formData,
    updateFormData,
    updateNestedFormData,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    setFormData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
