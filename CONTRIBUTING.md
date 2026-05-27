# 🤝 Contributing to ZDOS NEXUS

Thank you for your interest in contributing to ZDOS NEXUS v3.0! This document provides guidelines and instructions for contributing.

---

## 📋 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 🎯 How to Contribute

### 1. **Report Bugs**

Found a bug? Please create an issue with:
- Clear title describing the bug
- Step-by-step reproduction instructions
- Expected vs actual behavior
- Screenshots/logs if applicable
- Your environment (OS, Node version, etc.)

### 2. **Suggest Features**

Have an idea? Create a feature request with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Examples or mockups

### 3. **Submit Code**

Ready to code? Follow these steps:

#### Fork & Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/zdos-v3.git
cd zdos-v3

# Add upstream remote
git remote add upstream https://github.com/RZA-pulciz/zdos-v3.git
```

#### Create Branch
```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

#### Make Changes
```bash
# Install dependencies
pnpm install

# Make your changes
# Follow code style guidelines (see below)

# Test your changes
pnpm test

# Format code
pnpm format

# Type check
pnpm check
```

#### Commit & Push
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature" 
# or
git commit -m "fix: resolve bug in module"

# Push to your fork
git push origin feature/your-feature-name
```

#### Create Pull Request
1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template
5. Submit for review

---

## 📝 Commit Message Guidelines

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, etc.)
- **refactor:** Code refactoring
- **perf:** Performance improvements
- **test:** Adding/updating tests
- **chore:** Build, dependencies, etc.

### Examples
```
feat(dashboard): add real-time statistics
fix(wallet): resolve balance calculation error
docs(deployment): update VPS setup guide
test(highcoin): add blockchain tests
```

---

## 💻 Code Style Guidelines

### TypeScript
- Use strict mode (`"strict": true` in tsconfig.json)
- Use descriptive variable names
- Add JSDoc comments for functions
- Prefer `const` over `let`

```typescript
/**
 * Calculates the total balance including staking rewards
 * @param balance - Current balance
 * @param stakingRewards - Accumulated rewards
 * @returns Total balance
 */
function calculateTotalBalance(balance: number, stakingRewards: number): number {
  return balance + stakingRewards;
}
```

### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for props
- Add meaningful prop descriptions

```typescript
interface DashboardProps {
  /** Active nodes count */
  activeNodes: number;
  /** Network uptime percentage */
  uptime: number;
  /** Callback when data refreshes */
  onRefresh?: () => void;
}

export function Dashboard({ activeNodes, uptime, onRefresh }: DashboardProps) {
  // Component logic
}
```

### CSS/Tailwind
- Use Tailwind utilities over custom CSS
- Follow mobile-first approach
- Use custom theme variables for consistency
- Avoid inline styles

```tsx
// ✅ Good
<div className="bg-card border border-accent/30 rounded-lg p-4">
  Content
</div>

// ❌ Avoid
<div style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ffff' }}>
  Content
</div>
```

### File Organization
```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Dashboard.tsx # Feature components
│   └── Header.tsx
├── pages/
│   ├── modules/      # 11 main modules
│   └── Home.tsx
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
└── types/            # TypeScript types
```

---

## 🧪 Testing

### Write Tests
```typescript
import { describe, it, expect } from 'vitest';

describe('calculateTotalBalance', () => {
  it('should return correct total balance', () => {
    const result = calculateTotalBalance(100, 50);
    expect(result).toBe(150);
  });

  it('should handle zero values', () => {
    const result = calculateTotalBalance(0, 0);
    expect(result).toBe(0);
  });
});
```

### Run Tests
```bash
# Run all tests
pnpm test

# Run specific file
pnpm test src/utils.test.ts

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

### Coverage Goals
- Aim for >80% coverage
- Test critical paths
- Test error cases
- Test edge cases

---

## 📖 Documentation

### Update README
If adding a new feature, update relevant documentation:
- `README.md` - Main overview
- `MODULES.md` - Module-specific docs
- `ARCHITECTURE.md` - Technical details
- Code comments - Inline documentation

### JSDoc Comments
```typescript
/**
 * Fetches user data from the API
 * @param userId - The user ID to fetch
 * @returns Promise resolving to user data
 * @throws {Error} If user not found
 * @example
 * const user = await fetchUser('123');
 */
async function fetchUser(userId: string): Promise<User> {
  // Implementation
}
```

---

## 🔍 Code Review Process

### Before Submitting PR
- [ ] Code follows style guidelines
- [ ] Tests pass (`pnpm test`)
- [ ] No console errors/warnings
- [ ] TypeScript strict mode passes (`pnpm check`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Documentation is updated
- [ ] Commit messages are clear

### PR Review
- Maintainers will review your code
- Feedback will be provided
- Make requested changes
- Re-request review after updates
- PR will be merged once approved

---

## 🐛 Bug Fix Workflow

1. Create issue describing the bug
2. Create branch: `git checkout -b fix/bug-description`
3. Write failing test that reproduces bug
4. Fix the bug
5. Verify test passes
6. Submit PR with reference to issue

---

## ✨ Feature Development Workflow

1. Create issue describing the feature
2. Discuss approach with maintainers
3. Create branch: `git checkout -b feature/feature-name`
4. Implement feature with tests
5. Update documentation
6. Submit PR with clear description

---

## 📚 Development Setup

### Prerequisites
```bash
# Node.js 22+
node --version

# pnpm 10+
npm install -g pnpm
pnpm --version
```

### Initial Setup
```bash
# Clone and install
git clone https://github.com/RZA-pulciz/zdos-v3.git
cd zdos-v3
pnpm install

# Start dev server
pnpm dev

# In another terminal, run tests
pnpm test --watch
```

### Useful Commands
```bash
# Type checking
pnpm check

# Format code
pnpm format

# Lint (if configured)
pnpm lint

# Build
pnpm build

# Start production build
NODE_ENV=production node dist/index.js
```

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com)
- [tRPC Documentation](https://trpc.io)

---

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

---

## ❓ Questions?

- **GitHub Issues:** Ask in relevant issue
- **GitHub Discussions:** Start a discussion
- **Pull Requests:** Ask in PR comments

---

## 📋 PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Related Issues
Closes #(issue number)

## Testing
- [ ] Tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

---

<div align="center">

**Thank you for contributing to ZDOS NEXUS! 🚀**

Your contributions help make this project better for everyone.

</div>
