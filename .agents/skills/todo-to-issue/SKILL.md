---
name: todo-to-issue
description: Takes a raw todo, gathers context, grills the user, and generates a formal issue ticket. NEVER implements fixes—it only hands off to the issue tracker. Use when user says "todo to issue", "process todo", or wants to convert a raw task/todo into a structured issue.
---

# Todo to Issue

## Core Mandate

**NEVER IMPLEMENT.** This skill is strictly for information gathering and ticket generation. Once the context is clarified and the issue is created, your task is complete. Do not attempt to fix, refactor, or implement any part of the todo.

## Quick Start

1. User points you to a raw todo (e.g., in a `RAW_TODO.md` file or just text in the chat).
2. Follow the 4-step workflow below to process it.

## Workflows

### The 4-Step Todo Conversion Process

Follow these steps sequentially:

1. **Context Gathering Phase**
   - Read the raw todo.
   - Search the project's existing issues, PRDs, and architecture documents.
   - **Identify:** Does this relate to previous issues? Does it contradict any existing plans or decisions? If it's a bug, has it occurred before?
   - Formulate initial hypotheses based on this context.

2. **Grilling Phase**
   - Activate the `grill-me` skill (using `activate_skill`).
   - Present the gathered context to the user (e.g., "I noticed this relates to issue #12, but contradicts our recent archiving refactor.").
   - Relentlessly interview the user to clarify ambiguities in the raw todo. Ask all relevant questions until you reach a shared understanding and all decision branches are resolved.

3. **Generation Phase**
   - Activate the `to-issues` skill (using `activate_skill`).
   - Using the clarified requirements and context, break the plan down into independently-grabbable issues on the project issue tracker.
   - **Constraint:** Do not proceed to implementation after generating the issues.

4. **Cleanup Phase**
   - Once the issue is successfully generated and filed, automatically locate the original raw todo in the codebase.
   - Mark the raw todo as done (e.g., changing `[ ]` to `[x]`, or moving it to a completed section).
   - **Final Action:** Inform the user that the ticket has been created and you are standing by for further instructions. Do NOT start working on the newly created issue.
