const chatSteps = {
    start: {
        message: 'Welcome to our support! How can we help you today?',
        options: [
            { text: 'Product Information', nextStep:'productInformation' },
            { text: 'Troubleshooting', nextStep:'Troubleshooting' },
            { text: 'Contact Us', nextStep:'contactUs' },
        ]
    },
    productInformation: {
        message: 'What product information do you need?',
        options: [
            { text: 'Warranty', nextStep:'warrantyInfo' },
            { text: 'Features', nextStep:'featuresInfo' },
            { text: 'Back to main menu', nextStep:'start' },
        ]
    },
    warrantyInfo: {
        message: 'Our products come with a 1-year warranty covering',
        options: [
            { text: 'Back to main menu', nextStep:'start' }
        ]
    },
}

export default chatSteps;