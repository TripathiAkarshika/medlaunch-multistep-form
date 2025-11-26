# DNV Healthcare Multi-Step Form

A fully functional multi-step form application built with React and JavaScript for healthcare organization onboarding and certification requests.

## Overview

This project implements a comprehensive 6-step form that guides users through the process of submitting a DNV Healthcare quote request. The form includes validation, state management, responsive design, and a review/submit workflow.

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Language**: JavaScript (ES6+)
- **Styling**: Pure CSS (No third-party frameworks)
- **State Management**: React Context API with useState
- **Linting**: ESLint

## Features

### Multi-Step Navigation
- 6 distinct steps with progress tracking
- Previous/Next navigation
- Save progress functionality
- Direct step navigation from review page

### Form Steps
1. **DNV Quote Request** - Organization and primary contact information
2. **Facility Details** - Facility type selection
3. **Leadership Contacts** - CEO, Director of Quality, Invoicing Contact, and Billing Address
4. **Site Information** - Single/Multiple location selection with CSV upload option
5. **Site Information (Services)** - Primary contact and service offerings selection
6. **Services & Certifications** - Service offerings, standards, and certification dates
7. **Review & Submit** - Complete form review with edit capabilities

### Form Validation
- Required field validation
- Email format validation
- Phone number format validation
- Conditional validation based on user selections
- Real-time error messaging

### State Management
- Centralized form state using React Context
- Persistent data across steps
- Auto-fill functionality for repeated contacts

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly UI elements
- Adaptive layouts

### Accessibility
- Semantic HTML
- Proper label associations
- Keyboard navigation support
- ARIA attributes where needed

## Project Structure

```
medlaunch-multistep-form/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Input.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Step1.jsx
│   │   ├── Step2.jsx
│   │   ├── Step3.jsx
│   │   ├── Step4.jsx
│   │   ├── Step5.jsx
│   │   ├── Step6.jsx
│   │   └── ReviewSubmit.jsx
│   ├── context/
│   │   └── FormContext.jsx
│   ├── styles/
│   │   ├── Button.css
│   │   ├── Checkbox.css
│   │   ├── Common.css
│   │   ├── Input.css
│   │   ├── ProgressBar.css
│   │   ├── Step1.css
│   │   ├── Step2.css
│   │   ├── Step3.css
│   │   ├── Step4.css
│   │   ├── Step5.css
│   │   ├── Step6.css
│   │   └── ReviewSubmit.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── QA_Test_Report.md
```

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd medlaunch-multistep-form
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Approach

### Design Implementation
The application was built following a Figma design specification with careful attention to:
- Color palette matching (Primary Blue: #2C5282)
- Typography consistency
- Spacing and layout accuracy
- Component reusability

### Component Architecture
- **Reusable Components**: Button, Input, Checkbox for consistency
- **Step Components**: Each step is a self-contained component
- **Context Provider**: Centralized state management for form data
- **Progressive Enhancement**: Basic functionality works, enhanced with validation

### State Management Strategy
- React Context API for global form state
- Local component state for UI interactions
- Controlled components for form inputs
- Validation state separate from form data

### Styling Approach
- CSS Variables for theming
- BEM-inspired naming convention
- Mobile-first responsive design
- No CSS preprocessors or frameworks (pure CSS)

## Key Assumptions

1. **Email Verification**: Email verification is simulated (no actual email sent)
2. **File Upload**: File upload stores file references locally (no server upload)
3. **CSV Template**: CSV template download link is a placeholder
4. **Form Submission**: On submit, data is logged to console (no backend integration)
5. **State Persistence**: Form state is lost on page refresh (no localStorage)
6. **Autocomplete**: "Same as Primary Contact" copies data at the time of checkbox selection
7. **Date Validation**: Basic date input validation (no complex date range validation)
8. **Service Selection**: At least one service must be selected or "Other" specified

## Known Issues and Limitations

1. **State Persistence**: Form data is not persisted across page refreshes
2. **File Upload**: Only stores file metadata, doesn't actually upload to a server
3. **Email Verification**: Simulated - doesn't send actual verification emails
4. **Phone Validation**: Basic format check - doesn't validate against real phone databases
5. **Browser Compatibility**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
6. **Date Picker**: Uses native HTML5 date input (varies by browser)
7. **Multi-location Upload**: CSV parsing not implemented - only file selection works

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for form submission
- LocalStorage/SessionStorage for state persistence
- Advanced validation (phone number verification, email verification)
- CSV parsing and validation
- PDF generation for form data
- Multi-language support
- Dark mode
- Form progress save/resume with unique links
- Real-time collaboration

## Contributing

This is a technical assessment project. For questions or clarifications, please contact:
SonaJohn@medlaunch.onmicrosoft.com

## License

This project is for assessment purposes only.

## Acknowledgments

- DNV Healthcare for the design specifications
- React team for the excellent documentation
- Vite for the blazing-fast build tool
