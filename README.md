# 🏦 LendingPro - SME Credit Platform

A modern, AI-powered lending platform for small and medium enterprises (SMEs) built with React, TypeScript, and Vite. Features intelligent onboarding, credit evaluation, and financial analysis.

## ✨ Features

### 🎯 Smart Onboarding Wizard
- Multi-step form with progress tracking
- Real-time validation with Zod schemas
- Auto-save functionality
- Edit mode for updating information

### 📊 Financial Data Management
- **AI-Powered Document Upload**: Upload CSV or PDF files
- Automatic data extraction and parsing
- Support for multiple date formats
- Visual data preview with tables

### 🌍 International Banking Support
- Country-specific bank account validation
- IBAN validation for European countries
- US account number format validation
- Dynamic form fields based on country selection

### 📈 Credit Evaluation
- Automated risk assessment
- Financial metrics calculation
- Credit capacity recommendations
- Interactive charts and visualizations

### 🤖 AI Assistant
- Context-aware financial advice
- Real-time chat interface
- Integration with company data

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Clean, professional interface
- Smooth transitions and animations
- Accessible components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mini-lending-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── api/                    # Mock API and data
│   ├── mockAPI.ts
│   └── mockData.ts
├── features/               # Feature modules
│   ├── onboarding/        # Onboarding wizard
│   │   ├── components/
│   │   └── OnboardingWizard.tsx
│   ├── dashboard/         # Main dashboard
│   ├── credit-evaluation/ # Credit scoring
│   └── ai-assistant/      # AI chat interface
├── shared/                # Shared components & types
│   ├── components/
│   └── types/
├── utils/                 # Utilities
│   ├── validation.schemas.ts
│   ├── fileParser.ts
│   ├── financialCalculations.ts
│   └── formatting.ts
└── App.tsx               # Main app component
```

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Charts**: Recharts
- **File Parsing**: PapaParse
- **Banking Validation**: IBAN

## 📝 Key Features Explained

### Form Validation
All forms use Zod schemas for type-safe validation:
- Tax ID: Alphanumeric with hyphens
- Email: RFC-compliant email validation
- Phone: International format support
- Bank accounts: Country-specific validation

### File Upload & AI Processing
Upload financial documents in CSV or PDF format:
- **CSV**: Instant parsing with flexible column mapping
- **PDF**: AI extraction simulation (ready for AWS Textract/Google Document AI)

### Settings Management
Edit your information anytime:
- Click "⚙️ Settings" to access edit mode
- Navigate directly to summary
- Make changes to any section
- Auto-save on navigation

## 🧪 Sample Data

A sample CSV file is included at `public/sample-financial-data.csv` for testing the file upload feature.

CSV format:
```csv
month,revenue,expenses,cashflow
2024-01,125000,95000,30000
2024-02,132000,98000,34000
```

## 🔒 Validation Rules

### Company Information
- Name: Min 2 characters
- Tax ID: Min 5 characters, alphanumeric + hyphens
- Founded Year: 1800 - current year
- Employee Count: Min 1

### Legal Representative
- Full Name: Min 3 characters
- Email: Valid email format
- Phone: International format
- ID: Min 5 characters, alphanumeric

### Bank Information
- Bank Name: Min 2 characters
- Account Number: Country-specific format
- Average Balance: Positive number

## 🎨 Customization

### Tailwind Configuration
Customize colors, fonts, and spacing in `tailwind.config.js`

### Add New Industries
Update the industries list in `CompanyInfoStep.tsx`

### Add New Countries
Update the countries list in `BankInfoStep.tsx`

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "recharts": "^3.5.0",
  "zod": "^3.x",
  "iban": "^0.x",
  "papaparse": "^5.x"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Real backend API integration
- [ ] AWS Textract for PDF processing
- [ ] Multi-language support
- [ ] Advanced credit scoring models
- [ ] Document management system
- [ ] Email notifications
- [ ] Export reports to PDF

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React + TypeScript + Vite
