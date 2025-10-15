# 🚀 Universal Onboarding Flow Template

A flexible, customizable React Native onboarding flow template that works with Expo Router. Perfect for quickly implementing user onboarding in any app without touching the underlying code.

## ✨ Features

- **5 Different Step Types**: Single choice, multi-choice, text input, number input, and custom components
- **Easy Configuration**: One simple config file to customize everything
- **Theming Support**: Full theme customization with colors, fonts, and styling
- **Validation**: Built-in validation with custom validation functions
- **Responsive Design**: Works on all screen sizes
- **Emoji Icons**: Simple emoji support for icons (no icon library required)
- **TypeScript**: Fully typed for better development experience

## 🚀 Quick Start

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go app on your phone!

## 🎯 Step Types

### 1. Single Choice
Perfect for selecting one option from multiple choices.
```typescript
{
  id: 'gender',
  title: 'Choose your Gender',
  type: 'single-choice',
  options: [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
  ],
}
```

### 2. Multi Choice
Allow users to select multiple options.
```typescript
{
  id: 'interests',
  title: 'What are your interests?',
  type: 'multi-choice',
  options: [
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'music', label: 'Music', icon: '🎵' },
  ],
}
```

### 3. Text Input
Simple text input with validation.
```typescript
{
  id: 'name',
  title: 'What\'s your name?',
  type: 'text-input',
  placeholder: 'Enter your name...',
  validation: (value) => value.length >= 2 || 'Name too short',
}
```

### 4. Number Input
Numeric input with validation.
```typescript
{
  id: 'age',
  title: 'How old are you?',
  type: 'number-input',
  validation: (value) => value >= 13 || 'Must be at least 13',
}
```

### 5. Custom Component
Use your own React components for complex inputs.
```typescript
{
  id: 'custom',
  title: 'Custom Step',
  type: 'custom',
  component: <YourCustomComponent />,
}
```

## 🎨 Easy Customization

### Just edit `app/onboarding.config.ts`:

```typescript
export const onboardingConfig: OnboardingConfig = {
  steps: [
    {
      id: 'welcome',
      title: 'Welcome!',
      subtitle: 'Let\'s get you set up.',
      type: 'single-choice',
      options: [
        { value: 'new', label: 'I\'m new here', icon: '👋' },
        { value: 'returning', label: 'I\'m returning', icon: '🔄' },
      ],
    },
    // Add more steps...
  ],

  theme: {
    primaryColor: '#FF6B6B',
    backgroundColor: '#1a1a1a',
    cardColor: '#2a2a2a',
    textColor: '#ffffff',
    buttonColor: '#FF6B6B',
    borderRadius: 16,
  },

  onComplete: (data) => {
    console.log('User data:', data);
    // Handle completion (save data, navigate, etc.)
  },
};
```

## 🛠 Example Configurations

The config file includes ready-to-use examples:

- **Fitness App**: Gender, workouts, goals, diet preferences
- **E-commerce App**: Shopping interests, budget preferences
- **App Preferences**: Notifications, theme selection

## 🎨 Theming

Customize the entire look and feel:

```typescript
theme: {
  primaryColor: '#007AFF',     // Selected state, buttons
  backgroundColor: '#1a1a1a',  // Main background
  cardColor: '#2a2a2a',       // Card backgrounds
  textColor: '#ffffff',        // Text color
  buttonColor: '#007AFF',      // Button color
  borderRadius: 16,            // Border radius for cards
}
```

## ✅ Validation

Add custom validation to any step:

```typescript
{
  id: 'email',
  title: 'Enter your email',
  type: 'text-input',
  validation: (value) => {
    if (!value.includes('@')) {
      return 'Please enter a valid email';
    }
    return true; // Valid
  },
}
```

## 📋 To Use This Template

1. **Clone or download** this template
2. **Edit** `app/onboarding.config.ts` with your steps
3. **Customize** the theme colors
4. **Add** your completion logic
5. **Run** `npx expo start`

That's it! No need to touch the underlying components.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - use this in your projects!