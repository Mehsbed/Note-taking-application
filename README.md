# Notes Application - RAMYOZ Assessment

A modern, full-stack note-taking application built with Next.js, MongoDB, and Tailwind CSS. This project demonstrates proficiency in React development, server-side rendering, database integration, and creating beautiful, user-friendly interfaces.

**Author:** Mehank  
**Assessment For:** Ramyoz - React Native Developer Position

## 🌟 Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, and Delete notes seamlessly
- **Real-time Updates**: Instant UI updates using Next.js Server Actions
- **Persistent Storage**: MongoDB integration for reliable data persistence
- **Responsive Design**: Works beautifully on desktop and mobile devices

### User Experience
- **Two-Column Layout**: Clean sidebar (30%) for note navigation and main editor (70%) for content
- **Smart Note Preview**: See note title, content preview, and human-readable timestamps in the sidebar
- **Auto-focus**: Title input automatically focuses when creating a new note
- **Keyboard Shortcuts**: Save notes quickly with `Ctrl/Cmd + S`
- **Elegant Notifications**: Toast notifications using Sonner for user feedback
- **Loading States**: Visual feedback during save operations with spinner animations

### Design & Theming
- **Dual Theme System**: 
  - **Light Mode (Golden Sun)**: Warm, inviting color palette with creamy backgrounds and amber accents
  - **Dark Mode (Deep Amethyst)**: Rich purple tones for comfortable nighttime use
- **Smooth Transitions**: 0.3s ease-in-out animations throughout the interface
- **Glassmorphism Effects**: Subtle backdrop blur on sidebar for depth
- **Rounded Corners**: Modern `rounded-2xl` styling for a soft, approachable feel

### Advanced Interactions
- **Hover Effects**: Delete button appears on note hover in sidebar
- **Selected State**: Active note highlighted with glowing border
- **Smart Timestamps**: Human-readable relative time ("5 mins ago", "2 hours ago")
- **Content Preview**: Intelligent text truncation for clean sidebar display

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Deployment Ready**: Configured for Vercel or similar platforms

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas account** (or local MongoDB instance)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mehsbed/Note-taking-application.git
cd Note-taking-application
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

The application uses MongoDB Atlas. The connection string is configured in `lib/mongodb.ts`. 

If you need to use a different database, update the `MONGODB_URI` constant in that file.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Note-taking-application/
├── app/
│   ├── actions/
│   │   └── notes.ts          # Server Actions for CRUD operations
│   ├── globals.css           # Global styles and theme variables
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Main dashboard page
├── components/
│   ├── NotesSidebar.tsx      # Sidebar component with note list
│   ├── NoteEditor.tsx        # Main editor component
│   └── ThemeToggle.tsx       # Theme switcher component
├── contexts/
│   └── ThemeContext.tsx      # Theme context provider
├── lib/
│   ├── mongodb.ts            # MongoDB connection utility
│   └── utils.ts              # Helper functions (timestamps, previews)
├── models/
│   └── Note.ts               # Mongoose schema for notes
└── package.json
```

## 🎨 Design Philosophy

This application was built with a focus on:

1. **User-Centric Design**: Every interaction is designed to feel natural and intuitive
2. **Performance**: Server Actions provide instant feedback without page refreshes
3. **Code Quality**: Clean, maintainable TypeScript code following best practices
4. **Accessibility**: Semantic HTML and proper ARIA labels
5. **Responsiveness**: Works seamlessly across different screen sizes

## 💾 Database Schema

Each note in the database follows this schema:

```typescript
{
  title: string (required, trimmed)
  content: string (required)
  createdAt: Date (auto-generated)
}
```

## 🔧 Key Implementation Details

### Server Actions
All database mutations use Next.js Server Actions, which provide:
- Type-safe server-side operations
- Automatic revalidation for instant UI updates
- Simplified error handling
- No API route boilerplate needed

### Connection Management
The MongoDB connection uses a global cache to prevent connection exhaustion in serverless environments, following Next.js best practices.

### Theme System
CSS custom properties enable seamless theme switching with smooth transitions. Theme preference is persisted in localStorage.

## 🎯 Features Showcase

### Creating a Note
1. Click "New Note" in the sidebar
2. Title input auto-focuses for quick typing
3. Enter your note content
4. Click "Save" or press `Ctrl/Cmd + S`
5. Toast notification confirms the save

### Editing a Note
1. Click any note in the sidebar to open it in the editor
2. Make your changes
3. Save automatically updates the note
4. Changes are immediately visible in the sidebar

### Deleting a Note
1. Hover over a note in the sidebar
2. Click the trash icon that appears
3. Confirm the deletion
4. Note is removed with a confirmation toast

## 🚀 Deployment

This application is ready to deploy on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting platform

Ensure your MongoDB connection string is accessible in your deployment environment.

## 📝 Notes

- The application uses MongoDB Atlas for cloud database hosting
- All sensitive configuration is kept in the codebase as per requirements
- The codebase follows TypeScript strict mode for type safety
- ESLint is configured for code quality

## 👨‍💻 Developer

**Mehank**  
Prepared as part of the assessment for Ramyoz - React Native Developer position.

This project demonstrates:
- Proficiency in React and Next.js
- Understanding of modern web development patterns
- Ability to create polished, production-ready applications
- Attention to user experience and design details

## 📄 License

This project is created for assessment purposes.

## 🤝 Contributing

This is an assessment project. For questions or feedback, please reach out through the repository.

---

Built with ❤️ using Next.js, MongoDB, and Tailwind CSS
