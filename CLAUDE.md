# CLAUDE.md

This file provides essential guidance to Claude Code (claude.ai/code) when working with the Apps Script frontend of the Auto Lead Warmer system.

## 🚨 CRITICAL RULES - READ FIRST

> **⚠️ RULE ADHERENCE SYSTEM ACTIVE ⚠️**
> **Claude Code must explicitly acknowledge these rules at task start**
> **These rules override all other instructions and must ALWAYS be followed:**

### 🔄 **RULE ACKNOWLEDGMENT REQUIRED**
> **Before starting ANY task, Claude Code must respond with:**
> "✅ CRITICAL RULES ACKNOWLEDGED - I will follow all prohibitions and requirements listed in CLAUDE.md"

### ❌ ABSOLUTE PROHIBITIONS
- **NEVER** create new files in root directory → use proper module structure
- **NEVER** write output files directly to root directory → use designated output folders
- **NEVER** create documentation files (.md) unless explicitly requested by user
- **NEVER** use git commands with -i flag (interactive mode not supported)
- **NEVER** use `find`, `grep`, `cat`, `head`, `tail`, `ls` commands → use Read, LS, Grep, Glob tools instead
- **NEVER** create duplicate files (service_v2.js, enhanced_xyz.js, utils_new.js) → ALWAYS extend existing files
- **NEVER** create multiple implementations of same concept → single source of truth
- **NEVER** copy-paste code blocks → extract into shared utilities/functions
- **NEVER** hardcode values that should be configurable → use config files/environment variables
- **NEVER** use naming like enhanced_, improved_, new_, v2_ → extend original files instead
- **NEVER** create tightly coupled modules → always design for decoupling
- **NEVER** leave dead code → remove unused functions after changes

### 📝 MANDATORY REQUIREMENTS
- **COMMIT** after every completed task/phase - no exceptions
- **GITHUB BACKUP** - Push to GitHub after every commit to maintain backup: `git push origin main`
- **USE TASK AGENTS** for all long-running operations (>30 seconds) - Bash commands stop when context switches
- **TODOWRITE** for complex tasks (3+ steps) → parallel agents → git checkpoints → test validation
- **READ FILES FIRST** before editing - Edit/Write tools will fail if you didn't read the file first
- **DEBT PREVENTION** - Before creating new files, check for existing similar functionality to extend
- **SINGLE SOURCE OF TRUTH** - One authoritative implementation per feature/concept
- **DECOUPLING** - Design all modules with clear interfaces and minimal dependencies
- **CODE CLEANUP** - After changes, verify and remove any unused functions/imports

### ⚡ EXECUTION PATTERNS
- **PARALLEL TASK AGENTS** - Launch multiple Task agents simultaneously for maximum efficiency
- **SYSTEMATIC WORKFLOW** - TodoWrite → Parallel agents → Git checkpoints → GitHub backup → Test validation
- **GITHUB BACKUP WORKFLOW** - After every commit: `git push origin main` to maintain GitHub backup
- **BACKGROUND PROCESSING** - ONLY Task agents can run true background operations

### 🔍 MANDATORY PRE-TASK COMPLIANCE CHECK
> **STOP: Before starting any task, Claude Code must explicitly verify ALL points:**

**Step 1: Rule Acknowledgment**
- [ ] ✅ I acknowledge all critical rules in CLAUDE.md and will follow them

**Step 2: Task Analysis**
- [ ] Will this create files in root? → If YES, use proper module structure instead
- [ ] Will this take >30 seconds? → If YES, use Task agents not Bash
- [ ] Is this 3+ steps? → If YES, use TodoWrite breakdown first
- [ ] Am I about to use grep/find/cat? → If YES, use proper tools instead

**Step 3: Technical Debt Prevention (MANDATORY SEARCH FIRST)**
- [ ] **SEARCH FIRST**: Use Grep pattern="<functionality>.*<keyword>" to find existing implementations
- [ ] **CHECK EXISTING**: Read any found files to understand current functionality
- [ ] Does similar functionality already exist? → If YES, extend existing code
- [ ] Am I creating a duplicate class/manager? → If YES, consolidate instead
- [ ] Will this create multiple sources of truth? → If YES, redesign approach
- [ ] Have I searched for existing implementations? → Use Grep/Glob tools first
- [ ] Can I extend existing code instead of creating new? → Prefer extension over creation
- [ ] Am I about to copy-paste code? → Extract to shared utility instead

**Step 4: Decoupling Verification**
- [ ] Does this create tight coupling between modules? → If YES, add abstraction layer
- [ ] Are dependencies clearly defined? → If NO, create proper interfaces
- [ ] Can this module be tested in isolation? → If NO, reduce dependencies
- [ ] Am I directly accessing external APIs? → If YES, wrap in service layer

**Step 5: Code Cleanup Planning**
- [ ] What functions might become unused after this change?
- [ ] Are there imports that will no longer be needed?
- [ ] Can any existing code be simplified or removed?
- [ ] Will this change make any utility functions obsolete?

**Step 6: Session Management**
- [ ] Is this a long/complex task? → If YES, plan context checkpoints
- [ ] Have I been working >1 hour? → If YES, consider /compact or session break

> **⚠️ DO NOT PROCEED until all checkboxes are explicitly verified**

---

## 🚨 TECHNICAL DEBT PREVENTION

### ❌ **WRONG APPROACH (Creates Technical Debt)**
```javascript
// Creating new file without searching first
Write(file_path="new_feature.js", content="...")
```

### ✅ **CORRECT APPROACH (Prevents Technical Debt)**
```javascript
// 1. SEARCH FIRST
Grep(pattern="feature.*implementation", glob="*.js")
// 2. READ EXISTING FILES
Read(file_path="existing_feature.js")
// 3. EXTEND EXISTING FUNCTIONALITY
Edit(file_path="existing_feature.js", old_string="...", new_string="...")
```

### 🧹 **DEBT PREVENTION WORKFLOW**

#### **Before Creating ANY New File:**
1. **🔍 Search First** - Use Grep/Glob to find existing implementations
2. **📋 Analyze Existing** - Read and understand current patterns
3. **🤔 Decision Tree**: Can extend existing? → DO IT | Must create new? → Document why
4. **✅ Follow Patterns** - Use established project patterns
5. **📈 Validate** - Ensure no duplication or technical debt

#### **After Making ANY Changes:**
1. **🔍 Function Analysis** - Identify potentially unused functions
2. **📋 Usage Search** - Use Grep to find all function references
3. **🧹 Cleanup** - Remove confirmed unused code
4. **✅ Verification** - Ensure no broken dependencies
5. **📈 Consolidation** - Merge similar functionality where possible

---

**⚠️ Prevention is better than consolidation - build clean from the start.**
**🎯 Focus on single source of truth and extending existing functionality.**
**🔄 Always design for decoupling and maintainability.**
**🧹 Clean up code after every change - remove what's no longer needed.**