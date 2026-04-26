# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website project featuring Japanese youth aesthetic (日式青春美学). The site emphasizes minimalism, negative space, micro-interactions, and glassmorphism effects.
同时这个项目还要展现出清新的青春气息

## Planned Tech Stack

- Frontend: Next.js (App Router) + Tailwind CSS + Framer Motion
- State Management: Zustand and Context API
- Content/CMS: Markdown/MDX rendering with syntax highlighting (Shiki)

## Color Palette

- #F9FAFB (Paper White)
- #8E9AAF (Misty Blue)
- #CBC0D3 (Lavender Mist)
- #EFD3D7 (Pink Blush)

## Repository Structure

Content will be organized in:
- `content/pages/` - Main page content in Markdown
- `src/app/` - Next.js app router structure
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and helpers

## Development Guidelines

1. Layout files should use the defined color palette consistently
2. Tailwind configuration should implement the specified colors
3. Micro-interactions should be implemented with Framer Motion
4. Content pages will be authored in Markdown/MDX format
5. Design should emphasize negative space and minimalist aesthetics

## Common Development Tasks

When adding new pages:
1. Create Markdown content in `content/pages/`
2. Implement corresponding React components in `src/app/`
3. Ensure consistent styling with Tailwind classes
4. Add smooth animations/transitions with Framer Motion

When implementing components:
1. Follow the Japanese youth aesthetic principles
2. Use ample white space and clean typography
3. Implement subtle hover effects and transitions
4. Maintain responsive design across device sizes