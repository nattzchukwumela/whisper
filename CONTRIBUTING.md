# Contributing to Whisper 🕊️

Thank you for your interest in contributing to Whisper! We welcome contributions from everyone and are grateful for every pull request or issue submitted.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Database Changes](#database-changes)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

---

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **PostgreSQL** (v13 or higher)
- **Git**

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/whisper.git
   cd whisper
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/nattzchukwumela/whisper.git
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   NODE_ENV=development
   ```

5. **Set up the database**
   ```bash
   # Run migrations
   pnpx prisma migrate dev

   # Generate Prisma client
   pnpx prisma generate

   # (Optional) Seed the database
   pnpx prisma db seed
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

---

## 🛠️ How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- ⚡ **Performance optimizations**
- 🧪 **Tests**
- 🔧 **Tooling and infrastructure**

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for major changes to discuss the approach
3. **Look for "good first issue"** labels if you're new to the project

---

## 🔄 Pull Request Process

### 1. Create a Feature Branch

```bash
# Ensure you're on the master branch and it's up to date
git checkout master
git pull upstream master

# Create a new branch for your feature
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clear, concise commit messages
- Keep commits focused and atomic
- Test your changes locally

### 3. Commit Guidelines

Follow conventional commit format:

```bash
git commit -m "feat: add message reactions feature"
git commit -m "fix: resolve authentication token refresh issue"
git commit -m "docs: update API documentation"
git commit -m "style: improve dashboard responsive design"
```

**Commit Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: UI/styling changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 4. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

### 5. Pull Request Requirements

Your PR should include:

- [ ] **Clear title** describing the change
- [ ] **Detailed description** of what was changed and why
- [ ] **Screenshots** for UI changes
- [ ] **Tests** for new functionality
- [ ] **Updated documentation** if needed
- [ ] **No breaking changes** (or clearly marked if unavoidable)

### 6. Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] I have tested these changes locally
- [ ] I have added tests for new functionality
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots here for UI changes.

## Additional Notes
Any additional information or context.
```

---

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

1. **Clear title** summarizing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (OS, browser, Node.js version)
6. **Screenshots or error messages**

### Feature Requests

For feature requests, please include:

1. **Clear description** of the proposed feature
2. **Use case** and motivation
3. **Mockups or examples** if applicable
4. **Acceptance criteria**

---

## 📝 Coding Standards

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Write **self-documenting code** with clear variable names

### File Organization

- Place components in `src/app/component/`
- Keep API routes in `src/app/api/`
- Use descriptive file and folder names
- Group related functionality together

### Best Practices

- **Single Responsibility**: Each function/component should have one clear purpose
- **Error Handling**: Always handle errors gracefully
- **Security**: Never commit sensitive information
- **Performance**: Consider performance implications of changes

---

## 🗄️ Database Changes

### Schema Modifications

1. **Create migration**:
   ```bash
   pnpx prisma migrate dev --name describe_your_changes
   ```

2. **Update seed data** if necessary
3. **Test migration** thoroughly
4. **Include migration** in your pull request

### Migration Guidelines

- Use descriptive migration names
- Test migrations on a copy of production data
- Consider backwards compatibility
- Document breaking changes

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write tests for all new functionality
- Include both unit and integration tests
- Test error conditions and edge cases
- Keep tests simple and focused

---

## 📚 Documentation

### Documentation Standards

- Update relevant documentation for any changes
- Use clear, concise language
- Include code examples where helpful
- Keep documentation up to date

### Types of Documentation

- **README.md**: Project overview and setup
- **API Documentation**: Endpoint documentation
- **Component Documentation**: Usage examples
- **Database Schema**: Table and relationship documentation

---

## 💬 Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Request Reviews**: For code-related discussions

### Communication Guidelines

- Be respectful and constructive
- Provide context for your questions
- Search existing issues before creating new ones
- Use clear, descriptive titles

---

## 🎉 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub releases** for major features

---

## 📞 Contact

- **Project Maintainer**: [@nattzchukwumela](https://github.com/nattzchukwumela)
- **Issues**: [GitHub Issues](https://github.com/nattzchukwumela/whisper/issues)

---

Thank you for contributing to Whisper! Your efforts help make anonymous communication safer and more accessible for everyone. 🚀
