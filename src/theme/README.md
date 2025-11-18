# Material-UI Theme Configuration

This directory contains the Material-UI theme configuration for the School Management System frontend application.

## Files

- **index.ts**: Main theme configuration file that exports light and dark themes
- **palette.ts**: Color palette definitions for both light and dark modes
- **typography.ts**: Typography configuration with Roboto font family

## Usage

### Basic Usage

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme, getTheme } from '@/theme';

function App() {
  const mode = 'light'; // or 'dark'
  
  return (
    <ThemeProvider theme={getTheme(mode)}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### With Theme Toggle

```typescript
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '@/theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## Theme Configuration

### Color Palette

#### Light Mode
- **Primary**: Blue (#1976d2)
- **Secondary**: Orange (#ff9800)
- **Error**: Red (#f44336)
- **Warning**: Orange (#ff9800)
- **Success**: Green (#4caf50)
- **Info**: Blue (#2196f3)

#### Dark Mode
- **Primary**: Light Blue (#90caf9)
- **Secondary**: Light Orange (#ffb74d)
- **Error**: Red (#f44336)
- **Warning**: Orange (#ffa726)
- **Success**: Light Green (#66bb6a)
- **Info**: Light Blue (#29b6f6)

### Typography

- **Font Family**: Roboto (with fallbacks)
- **Variants**: h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, button, caption, overline

### Spacing

- **Base Unit**: 8px
- Usage: `theme.spacing(1)` = 8px, `theme.spacing(2)` = 16px, etc.

### Breakpoints

- **xs**: 0px (mobile)
- **sm**: 768px (tablet)
- **md**: 1024px (desktop)
- **lg**: 1440px (large desktop)
- **xl**: 1920px (extra large)

### Shape

- **Border Radius**: 4px

## Component Overrides

The theme includes custom styling for:

- **MuiButton**: No text transform, medium font weight
- **MuiCard**: Subtle box shadow
- **MuiAppBar**: Minimal box shadow

## Customization

To customize the theme, edit the respective files:

1. **Colors**: Edit `palette.ts`
2. **Typography**: Edit `typography.ts`
3. **Spacing/Breakpoints**: Edit `index.ts`
4. **Component Overrides**: Edit the `components` section in `index.ts`

## Requirements

This theme configuration satisfies:
- Requirement 13.1: Responsive design with defined breakpoints
- Requirement 13.2: Mobile-optimized layout support
