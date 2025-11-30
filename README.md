# Creo 12 Cutting Tool Library

This repository contains cutting tool definitions for Creo Parametric 12. All tools are stored as XML files using the standard PRO_NC_CUTTING_TOOL_SETUP format. The library includes solid tools and parameter driven tools.

# Creo Version

- Creo Parametric 12  
- Tested with version 12.4.x  
- XML files follow the Creo manufacturing tool definition format

# Tool Types Included

## Flat Endmills (EM Series)

Standard inch sizes:
EM062  
EM125  
EM250  
EM375  
EM500  
EM625  
EM750  
EM1000

Each file contains cutter diameter, flute length, overall length, tool material, and the standard Creo NC tool parameters.

## Ball Endmills (BEM Series)

Ball endmills in matching sizes:
BEM062  
BEM125  
BEM250  
BEM375  
BEM500  
BEM625  
BEM750  
BEM1000

Each file defines diameter, flute length, overall length, and Creo NC parameters.

## Drills

Includes fractional drills, number drills, letter drills, and tap drills.  
Each file contains diameter, overall length, point angle, and tap drill information where needed.

## Reamers

Fractional reamers up to 1/2 inch.  
Includes nominal reamers, undersized reamers, and oversized reamers.  
Files include decimal size, flute length, and overall length.

## Countersinks

Includes 82 degree and 90 degree countersinks.  
Each file includes cutting diameter, angle, shank size, and overall length.

# Solid Tools

Solid tools use Creo part geometry.  
These tools support simulation, collision detection, and tool visualization.  
XML files reference the matching .prt tool model when required.

# Parameter Driven Tools

Parameter driven tools contain all tool information in the XML file.  
No solid geometry is required.  

Common parameters include:
CUTTER_DIAM  
FLUTE_LENGTH  
LENGTH  
POINT_ANGLE  
TOOL_MATERIAL  
SPINDLE_SENSE  
HOLDER_DIA  
HOLDER_LEN

# Folder Structure

tools/inch/endmills  
tools/inch/ball_endmills  
tools/inch/drills  
tools/metric/reamers  
tools/metric/countersinks

# Usage

- Copy the files into a Creo library folder.  
- Set an environment variable "nc_tools_path" to where you stored these files.  
- Add a config option to point to the search.pro located in the library:  
    - search_path_file C:\PTC\Local Cad\nc\search.pro  
- Load tools through Manufacturing mode or individual NC sequences.  
- Creo will read parameter driven tools automatically.  
- Solid tools will load with their referenced geometry.

# Compatibility

- Compatible with Creo 12 and up  
- Uses only standard NC parameters  
- Tested in both milling and turning sequences
