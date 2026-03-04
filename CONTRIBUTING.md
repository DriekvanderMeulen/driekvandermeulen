# Contributing to Kiban

Guidelines for code quality, development workflow, pull requests, and team practices.

## Code Standards

### TypeScript

- **Strict Mode**: `tsconfig.json` uses `strict: true`
- **No `any` Types**: Avoid `any`; use `unknown` if necessary and narrow with type guards
- **Explicit Returns**: Always specify return types for functions and components
- **Type Imports**: Use `import type` for type-only imports

```typescript
// ✅ Good
import type { User } from '@/types/user'

export function getUserName(user: User): string {
  return user.name
}

// ❌ Avoid
import { User } from '@/types/user'

export function getUserName(user: any) {
  return user.name
}
```

### Component Patterns

**Functional Components Only**
- Use React hooks, no class components
- Prefer composition over inheritance

**Props Interface**
```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Component({ variant, size, disabled, ...props }: ComponentProps) {
  return <div {...props} />
}
```

**Component Forwarding**
- Use `React.forwardRef` for wrapper components
- Always set `displayName`

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
)
Button.displayName = 'Button'
```

### Tailwind CSS

**Class Order**
- Layout: display, position, width, height
- Spacing: margin, padding
- Sizing: width, height, max-width
- Appearance: color, background, border, shadow
- Effects: opacity, transform, transition

```tsx
// ✅ Good
<div className="flex gap-4 px-4 py-2 text-sm text-gray-900 bg-white border rounded-lg shadow-md" />

// ❌ Avoid (random order)
<div className="text-gray-900 px-4 flex gap-4 shadow-md py-2 border rounded-lg bg-white" />
```

**Use `cn()` for Conditional Classes**
```tsx
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class')} />
```

### Code Formatting

- **Prettier**: Auto-formats on save (configured in `prettier.config.js`)
- **Tabs**: 2-space indentation (configured in `prettier.config.js`)
- **Import Order**: Automatically sorted
  - External packages first
  - `@/` imports second
  - Relative imports last
- **Tailwind**: Classes automatically sorted with `prettier-plugin-tailwindcss`

**Run Formatting:**
```bash
bun run format
```

### Linting

**ESLint Configuration**
- Located in `eslint.config.mjs`
- Max warnings: **0** (strict enforcement)
- Ignores: node_modules, .next, build directories

**Check Linting:**
```bash
bun run lint
```

**Auto-fix Issues:**
```bash
bun run lint -- --fix
```

### Type Checking

**Check Type Safety**
```bash
bun run check-types
```

Must pass before committing. Caught in:
- CI/CD pipeline
- Pre-commit hooks (if configured)
- Build process

### Dead Code Detection

**Knip Configuration**
- Automatically runs during build
- Fails build if unused files are found
- Config: `knip.json`

**Generate Report:**
```bash
bun run knip:unused
```

## Development Workflow

### Setting Up Development

1. **Install Dependencies:**
```bash
bun install
```

2. **Environment Setup:**
Copy template and configure:
```bash
cp apps/web/.env.example apps/web/.env.local
cp packages/db/.env.example packages/db/.env.local
```

3. **Database Setup:**
```bash
cd packages/db
bun run migrate  # Apply migrations
```

4. **Start Development:**
```bash
bun dev
```

Opens http://localhost:3000

### Feature Branch Workflow

**Branch Naming:**
- Features: `feat/feature-name`
- Bug fixes: `fix/bug-name`
- Refactoring: `refactor/area-name`
- Documentation: `docs/topic-name`
- Hotfixes: `hotfix/critical-issue`

**Example:**
```bash
git checkout -b feat/zone-interactions
```

**Branch Protection:**
- `main` requires PR review
- All checks must pass before merge
- Commits must follow conventional format

### Commit Messages

**Format (Conventional Commits):**
```
<type>(<scope>): <description>

<optional-body>

<optional-footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no logic change)
- `refactor`: Code reorganization
- `perf`: Performance improvement
- `test`: Test additions/changes
- `chore`: Build, deps, tooling

**Examples:**
```bash
git commit -m "feat(auth): add google oauth sign-in"
git commit -m "fix(zones): resolve collision detection lag"
git commit -m "docs: update animation patterns documentation"
```

**For Nightshift Tasks, Add Trailers:**
```bash
git commit -m "$(cat <<'EOF'
docs: add comprehensive documentation backfill

Nightshift-Task: docs-backfill
Nightshift-Ref: https://github.com/marcus/nightshift
EOF
)"
```

### Atomic Commits

Each commit should be logically independent:

```bash
# ✅ Good: One feature per commit
git commit -m "feat: add zone enter animation"
git commit -m "feat: add zone exit animation"

# ❌ Avoid: Multiple unrelated changes
git commit -m "feat: add animations, update documentation, fix bug in physics"
```

### Before Pushing

```bash
# 1. Check types
bun run check-types

# 2. Run linting
bun run lint

# 3. Format code
bun run format

# 4. Run tests (if applicable)
bun test

# 5. Verify build
bun run build
```

## Pull Requests

### Opening a PR

1. **Push feature branch:**
```bash
git push -u origin feat/my-feature
```

2. **Create PR on GitHub:**
   - Link to related issues: `Closes #123`
   - Describe changes in detail
   - Note any breaking changes
   - Include screenshots for UI changes

### PR Title Format

Use conventional commit format:
```
feat: add zone trigger interactions
fix: resolve animation jank in mobile view
docs: add authentication guide
```

### PR Description Template

```markdown
## Summary
Brief description of changes.

## Changes
- What was changed and why
- Implementation details

## Testing
How to test these changes:
- Step 1
- Step 2
- Step 3

## Breaking Changes
None (or describe any breaking changes)

## Screenshots/Videos
[Include visual changes if applicable]
```

### Code Review Checklist

**Reviewers Check For:**
- [ ] Code follows style guidelines
- [ ] Types are correct (no `any`)
- [ ] No dead code
- [ ] Tests pass (if applicable)
- [ ] Documentation is updated
- [ ] No console errors/warnings
- [ ] Commit messages are clear
- [ ] No sensitive data in code

**Author Checklist:**
- [ ] All tests pass: `bun test`
- [ ] Type checking passes: `bun run check-types`
- [ ] Linting passes: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] PR linked to issue
- [ ] Documentation updated
- [ ] Screenshots/videos for UI changes

### Merge Requirements

- [ ] PR reviewed and approved
- [ ] All status checks pass
- [ ] Commits are clean and atomic
- [ ] Branch is up-to-date with main

**Merge Procedure:**
```bash
# Squash merge for small features
gh pr merge --squash

# Regular merge for larger changes
gh pr merge
```

## Git Worktrees

Use worktrees for isolated feature development:

```bash
# Create worktree for feature
git worktree add .worktrees/feat-my-feature

# Work in the worktree
cd .worktrees/feat-my-feature
git checkout -b feat/my-feature

# Make changes, commit, push

# Cleanup
cd ../..
git worktree remove .worktrees/feat-my-feature
```

Worktrees prevent switching branches and losing state.

## Database Changes

### Schema Modifications

1. **Edit `packages/db/src/schema.ts`**
2. **Generate migration:**
```bash
cd packages/db
bun run generate
```
3. **Review generated SQL in `migrations/`**
4. **Run migration:**
```bash
bun run migrate
```
5. **Commit schema and migration together**

### Migration Strategy

- **Development**: Use `bun run push` for quick iteration
- **Commits**: Always create migrations for reproducibility
- **Production**: Only use explicit migrations, never push directly
- **Rollback**: Test down migration before deploying

## Testing Conventions

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react'
import { Component } from './component'

describe('Component', () => {
  it('renders with text prop', () => {
    render(<Component text="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = jest.fn()
    render(<Component onClick={onClick} />)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

### File Naming
- Test file colocated with component: `component.test.tsx`
- Or in `tests/` folder: `tests/component.test.tsx`

## Documentation

### When to Document

- New components or hooks
- Complex algorithms or logic
- Breaking changes
- API modifications

### JSDoc Style

```typescript
/**
 * Short description of function.
 *
 * Longer explanation if needed, can span multiple lines.
 * Include context about why this exists.
 *
 * @param inputParam - Description of parameter
 * @returns Description of return value
 * @throws Error - Description of error cases
 *
 * @example
 * const result = myFunction('example')
 * console.log(result)  // Output: ...
 *
 * @see relatedFunction - Link to related code
 */
export function myFunction(inputParam: string): string {
  // implementation
}
```

### Markdown Documentation

Store in `docs/` or package READMEs:
- `ARCHITECTURE.md` - System design
- `DEVELOPMENT.md` - Local setup
- `CONTRIBUTING.md` - This file
- `packages/ui/COMPONENTS.md` - Component catalog
- `docs/plans/` - Technical decisions

## Performance Guidelines

### Web Performance

- Use Next.js Image optimization
- Code split large components
- Lazy load off-screen content
- Monitor bundle size

### Animation Performance

- Animate only `transform`, `opacity`, `filter`
- Avoid animating `width`, `height`, `position`
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`

### Database Performance

- Add indexes to frequently queried columns
- Use `findFirst` instead of `findMany` for single results
- Batch operations when possible
- Cache query results appropriately

## Security Practices

### User Input Validation

- Always validate at system boundaries
- Sanitize before rendering HTML
- Use TypeScript for compile-time safety

### Secrets Management

- Never commit `.env` files
- Use `.env.example` templates
- Rotate secrets regularly
- Check for leaked secrets in CI/CD

### Data Protection

- Don't expose sensitive data in error messages
- Hash passwords (handled by Better Auth)
- Use HTTPS in production
- Implement rate limiting on APIs

## Getting Help

### Resources

- **Architecture**: See `ARCHITECTURE.md`
- **Setup**: See `DEVELOPMENT.md`
- **Components**: See `packages/ui/COMPONENTS.md`
- **Database**: See `packages/db/README.md`
- **Animations**: See `apps/web/ANIMATIONS.md`
- **Three.js**: See `apps/web/THREE.md`

### Questions?

- Ask in GitHub issues or discussions
- Check existing documentation first
- Search past PRs for similar problems
- Ask in team chat or meetings

## Code Review Standards

### As a Reviewer

1. **Run locally** - Test the changes yourself
2. **Read the code** - Understand the implementation
3. **Check guidelines** - Ensure standards are followed
4. **Be constructive** - Suggest improvements, don't criticize
5. **Approve when ready** - Or request changes with explanations

### As an Author

1. **Respond to feedback** - Address all comments
2. **Ask clarifying questions** - If feedback is unclear
3. **Don't take it personally** - Reviews improve code quality
4. **Resolve conversations** - Once addressed, mark resolved
5. **Re-request review** - After making changes

## Deployment

### Staging Deployment

Merges to `main` automatically deploy to staging.

### Production Deployment

Tagged releases deploy to production:
```bash
git tag v1.2.3
git push origin v1.2.3
```

See `docs/DEPLOYMENT.md` for detailed process.

## Questions or Suggestions?

Open an issue or discussion on GitHub for:
- Questions about guidelines
- Suggestions for improvements
- Process changes
- Tool updates

Thank you for contributing! 🎉
