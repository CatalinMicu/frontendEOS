# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# code-style
- Keep code simple and barebones without unnecessary features like loading states, spinners, or complex UI indicators; prioritize basic working functionality. Confidence: 0.85

# ui-patterns
- For search/filter forms: use checkboxes to allow combining multiple filters simultaneously, not a single-select dropdown that limits to one criterion at a time. Confidence: 0.60

# communication
- When explaining a program, go piece by piece at the code level showing how components connect, rather than broad architectural overviews. Confidence: 0.90

# project-convention
- Do not modify pom.xml or other build configuration files without explicit user permission; only touch files the user explicitly asks to change. Confidence: 0.70

# workflow
- Avoid using PowerShell inline string manipulation for editing Java source files on Windows; use write_file to create the file content and then copy to the target location. PowerShell regex replacements corrupt special characters and newlines. Confidence: 0.75

