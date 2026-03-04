# Contributing to Kiban

Guide for contributing to the Kiban codebase. Includes code standards, development workflow, PR process, and branching strategy.

## Code Standards

### TypeScript & Type Safety

- Use TypeScript for all new code (no `any` types without justification)
- Strict mode enabled in `tsconfig.json`
- Export types alongside implementations:

```typescript
// ❌ Don't do this
export const MyComponent = (props: any) => { ... }

// ✅ Do this
interface MyComponentProps {
  title: string
  onClick: () => void
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => { ... }
export type { MyComponentProps }
```

### Component Structure

Components follow consistent patterns:

```typescript
import * as React from 'react'
import { cn } from '@/lib/utils'

/** Clear JSDoc for public components */
export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prop documentation */
  variant?: 'default' | 'secondary'
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('base-styles', {
        'variant-styles': variant === 'default',
      }, className)}
      {...props}
    />
  )
)
MyComponent.displayName = 'MyComponent'

export { MyComponent }
```

### Naming Conventions

- **Files**: kebab-case for components and utilities
  - `my-component.tsx`, `use-my-hook.ts`, `content-parser.ts`
- **Types**: PascalCase
  - `MyComponentProps`, `ZoneMetadata`, `AuthSession`
- **Constants**: UPPER_SNAKE_CASE
  - `DEFAULT_TIMEOUT`, `MAX_RETRIES`
- **Functions**: camelCase
  - `getUserById()`, `handleZoneEnter()`

### Imports

- Organized in this order: React, third-party, @/, relative
- Auto-sorted by Prettier (don't manually order)

```typescript
import * as React from 'react'

import { Button } from '@/components/button'
import { cn } from '@/lib/utils'

import { useTheme } from './theme-context'
```

### Comments & Documentation

- Use JSDoc for public APIs:

```typescript
/**
 * Does something important.
 *
 * Detailed description here. Explain the why, not just the what.
 *
 * @param input - What this parameter does
 * @returns What the return value represents
 * @throws What errors might be thrown
 *
 * @example
 * ```ts
 * const result = myFunction('example')
 * ```
 */
export function myFunction(input: string): string {
  // Implementation
}
```

- Use inline comments sparingly, only for non-obvious logic
- Avoid commenting obvious code

```typescript
// ❌ Obvious comment
const count = 0 // Initialize count to 0

// ✅ Helpful comment explaining why
// Start at 0 because user hasn't seen welcome yet
const viewCount = 0
```

## Code Quality

### Linting

Run before committing:

```bash
bun run lint
```

- Zero warnings enforced
- Fix automatically: `bun run lint -- --fix`

### Type Checking

Verify types before committing:

```bash
bun run check-types
```

All code must type-check successfully.

### Formatting

Code is auto-formatted during build:

```bash
# Manual format
bun run format

# Check format
bun run format -- --check
```

- Tabs (width: 2)
- Imports auto-sorted
- Tailwind classes sorted

### Dead Code Detection

Knip runs during build:

```bash
# Check for unused exports/files
bun run knip
```

Remove unused code before committing.

## Development Workflow

### Setting Up

1. Clone repository
2. Install dependencies: `bun install`
3. Follow DEVELOPMENT.md for environment setup
4. Run `bun dev` to start development server

### Making Changes

1. Create feature branch: `git checkout -b feature/short-description`
2. Make focused changes
3. Run checks:
   ```bash
   bun run check-types
   bun run lint
   bun run format
   bun run knip
   ```
4. Commit with clear message
5. Push and open PR

### Commit Messages

Write clear, concise commit messages:

```
fix: resolve zone interaction race condition

The useZoneInteraction hook was not properly waiting for zones.json
to load before attempting to find the default zone. Added proper
loading state to prevent undefined errors.

Fixes #123
```

**Format**: `type: short description`

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, etc.)
- `refactor` - Code reorganization
- `perf` - Performance improvement
- `test` - Test additions/modifications
- `chore` - Build, dependencies, tooling

## PR Process

### Opening a PR

1. **Branch**: Feature branch off `main`
2. **Description**: Include:
   - What problem does this solve?
   - How does the implementation work?
   - Screenshots if UI changes
   - Testing steps
3. **Checks**: All CI checks must pass

### PR Template

```markdown
## Description
What problem does this solve?

## Changes
- List of changes
- With details

## Testing
Steps to verify the changes work:
1. Start dev server
2. Navigate to...
3. Verify...

## Screenshots
(If applicable)
```

### Code Review

Reviewers will check:
- Code quality and standards
- Type safety
- Test coverage
- Performance implications
- Documentation completeness

**Responding to feedback**:
- Address all comments
- Don't resolve comments yourself (reviewer does)
- Reply with context if unsure about suggestion
- Commit new changes with descriptive message

### Merging

1. All checks pass
2. At least one approval
3. No merge conflicts
4. Use "Squash and merge" for feature branches

## Branching Strategy

### Branch Naming

```
feature/short-description      # New features
fix/short-description          # Bug fixes
docs/short-description         # Documentation
refactor/short-description     # Code reorganization
```

### Branch Protection

- `main` branch requires PR review and passing checks
- Feature branches are ephemeral (deleted after merge)

### Working with Git Worktrees

For feature isolation:

```bash
# Create worktree
git worktree add .worktrees/my-feature feature/my-feature

# Work in .worktrees/my-feature/

# Remove worktree
git worktree remove .worktrees/my-feature
```

Worktrees are ignored by git and allow parallel work.

## Testing

### Unit Tests

Using Jest (configure as needed):

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<MyComponent onClick={onClick} />)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

### E2E Tests

Using Playwright (recommended):

```typescript
import { test, expect } from '@playwright/test'

test('can navigate through zones', async ({ page }) => {
  await page.goto('/office')
  await page.waitForSelector('[data-zone-id="entrance"]')
  await page.click('[data-zone-id="entrance"]')
  await expect(page).toHaveTitle(/Welcome/)
})
```

### Test Coverage

- Aim for meaningful tests, not coverage percentage
- Test user interactions, not implementation details
- Mock external dependencies

## Documentation

### When to Document

- New public APIs
- Complex algorithms
- Design decisions
- Configuration changes
- Breaking changes

### Documentation Files

- **ARCHITECTURE.md** - System design
- **DEVELOPMENT.md** - Setup and workflow
- **CONTRIBUTING.md** - This file
- **README.md** - Project overview
- **Package-specific README.md** - Usage guides

### Doc Standards

- Clear, concise language
- Code examples for complex concepts
- Links to related docs
- Keep updated with code changes

## Reporting Issues

### Bug Reports

Include:
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, browser, Node version)
- Screenshots/videos if visual

### Feature Requests

Include:
- What problem does this solve?
- Proposed solution
- Alternatives considered
- Why it's important

## Getting Help

- **Codebase questions**: Check CLAUDE.md and ARCHITECTURE.md
- **Build issues**: Review recent commits, run `bun install`
- **Style questions**: Refer to code standards above
- **Design decisions**: Check design plans in `docs/plans/`

## Review Checklist

Before submitting PR, verify:

- [ ] TypeScript types are correct
- [ ] No ESLint warnings
- [ ] Code formatted with Prettier
- [ ] No unused code (Knip passes)
- [ ] JSDoc for public APIs
- [ ] No hardcoded values
- [ ] Environment variables documented
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Commit messages are clear

## Related Documentation

- **DEVELOPMENT.md** - Development setup
- **ARCHITECTURE.md** - System design
- **CLAUDE.md** - AI assistant guidelines
