# Developers Guide

The following guidelines define the required standards for creating and managing Creo models, tools, fixtures, and assemblies. They ensure consistency, stability, and clear organization across the entire library, supporting reliable manufacturing, simulation, and reuse. All contributors should follow these instructions as the authoritative reference for building and maintaining CAD content.

- Wherever possible, make assemblies as inseparable assemblies.
- Don’t include spaces in file names; use dashes instead.

- Follow naming conventions:
  - Endmills: EM1000 = 1 inch endmill
  - Barrel lens tools: BLENS1000
  - Descriptive tool names:
    - 1" Endmill
    - 3/4" Ball Endmill
    - 1/8" Drill
    - C Drill
    - 1/2" Bull Nose Mill .03 Radius
    - 25 mm Endmill

- For tools, assign parameters:
  - CUTTER_DIAM
  - FLUTE_LENGTH
  - NUM_OF_TEETH
  - TOOL_MATERIAL
  - TOOL_COMMENT
  - Speeds and feeds using AXIAL_DEPTH and RADIAL_DEPTH when possible

- For solid tools:
  - Create a coordinate system named `tip` at the end of the tool, Z pointing upward into the tool.
  - Create a coordinate system named `shank` at the top of the tool shank, aligned with `tip`.
  - Suppress flute geometry and use family tables to control flute count.
  - For lathe tools, place the `tip` csys at the center of the tool nose radius.
  - Assign proper materials (carbide, high-speed steel, etc.).
  - Use intent edges as much as possible 
  - Create parameters for cutter_diam and length and use rekations to drive geometry. This allows the tool to adjust from editing the tool through cutting tools dialog display. 
  - Do not use subassemblies for solid tools, they wont simulate properly.
  - Do not use multibody, or if you need you cam merge all bodies into one single body.  

- Appearance:
  - Use steel or gold for coated tools.
  - Use appropriate colors for fixtures.
  - Use light black for holders.
  - Always save the display before saving.

- Flexibility and adjustability:
  - For fixtures or components with adjustable openings, add a flexible component parameter or dimension.
  - For imported parts, clean up geometry, reassemble for variability, rename to conventions, and add flexibility if needed.

- Family tables:
  - Use family tables to create solid tool variations within a tool type and maintain naming conventions.

- File and folder standards:
  - Always maintain one version of the model; Git will strip common files such as `.log`, `.pvz`, and `.idx`.
  - For parameter XML tools, avoid including holder diameter or holder length.
  - Separate inch and metric tools into existing folders.
  - If creating new folders, add their paths to `search.pro`.

- Workflow organization:
  - Group tools into machine activity categories: milling, drilling, turning, etc.
  - After making an assembly inseparable, remove unnecessary parts.

- Modeling cautions:
  - Avoid threads in parts whenever possible.
  - Use caution with indexable tools, as many contain disconnected bodies.

- Software versioning:
  - Always use Creo 12 as the base version.